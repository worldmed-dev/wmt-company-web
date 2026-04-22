'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import type { LeadershipTeamMember } from '@/lib/leadershipTeam';

type LeadershipScrollerProps = {
  items: LeadershipTeamMember[];
};

const AUTO_SCROLL_DELAY_MS = 3200;
const CARD_SNAP_INSET_PX = 14;
const SNAP_ANIMATION_DURATION_MS = 780;
const NEWTON_ITERATIONS = 8;
const NEWTON_MIN_SLOPE = 0.001;
const SUBDIVISION_PRECISION = 0.0000001;
const SUBDIVISION_MAX_ITERATIONS = 10;
const SPLINE_TABLE_SIZE = 11;
const SAMPLE_STEP_SIZE = 1 / (SPLINE_TABLE_SIZE - 1);

function calcBezier(t: number, a1: number, a2: number) {
  const c = 3 * a1;
  const b = 3 * (a2 - a1) - c;
  const a = 1 - c - b;

  return ((a * t + b) * t + c) * t;
}

function getSlope(t: number, a1: number, a2: number) {
  const c = 3 * a1;
  const b = 3 * (a2 - a1) - c;
  const a = 1 - c - b;

  return 3 * a * t * t + 2 * b * t + c;
}

function binarySubdivide(x: number, a: number, b: number, mX1: number, mX2: number) {
  let currentX = 0;
  let currentT = 0;
  let start = a;
  let end = b;
  let iteration = 0;

  while (iteration < SUBDIVISION_MAX_ITERATIONS) {
    currentT = start + (end - start) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;

    if (Math.abs(currentX) <= SUBDIVISION_PRECISION) {
      return currentT;
    }

    if (currentX > 0) {
      end = currentT;
    } else {
      start = currentT;
    }

    iteration += 1;
  }

  return currentT;
}

function newtonRaphsonIterate(x: number, guessT: number, mX1: number, mX2: number) {
  let currentT = guessT;

  for (let iteration = 0; iteration < NEWTON_ITERATIONS; iteration += 1) {
    const currentSlope = getSlope(currentT, mX1, mX2);

    if (currentSlope === 0) {
      return currentT;
    }

    const currentX = calcBezier(currentT, mX1, mX2) - x;
    currentT -= currentX / currentSlope;
  }

  return currentT;
}

function createBezierEasing(mX1: number, mY1: number, mX2: number, mY2: number) {
  if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
    throw new Error('Bezier x values must be in [0, 1] range.');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return (x: number) => x;
  }

  const sampleValues = new Float32Array(SPLINE_TABLE_SIZE);

  for (let index = 0; index < SPLINE_TABLE_SIZE; index += 1) {
    sampleValues[index] = calcBezier(index * SAMPLE_STEP_SIZE, mX1, mX2);
  }

  function getTForX(x: number) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = SPLINE_TABLE_SIZE - 1;

    while (currentSample !== lastSample && sampleValues[currentSample] <= x) {
      intervalStart += SAMPLE_STEP_SIZE;
      currentSample += 1;
    }

    currentSample -= 1;

    const denominator = sampleValues[currentSample + 1] - sampleValues[currentSample];
    const distance =
      denominator === 0 ? 0 : (x - sampleValues[currentSample]) / denominator;
    const guessForT = intervalStart + distance * SAMPLE_STEP_SIZE;
    const initialSlope = getSlope(guessForT, mX1, mX2);

    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(x, guessForT, mX1, mX2);
    }

    if (initialSlope === 0) {
      return guessForT;
    }

    return binarySubdivide(x, intervalStart, intervalStart + SAMPLE_STEP_SIZE, mX1, mX2);
  }

  return (x: number) => {
    if (x <= 0) {
      return 0;
    }

    if (x >= 1) {
      return 1;
    }

    return calcBezier(getTForX(x), mY1, mY2);
  };
}

const SNAP_SCROLL_EASING = createBezierEasing(0.22, 1, 0.36, 1);

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function splitNameLines(name: string) {
  const parts = name.split(' ').filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstLine: name,
      secondLine: null,
    };
  }

  return {
    firstLine: parts.slice(0, -1).join(' '),
    secondLine: parts[parts.length - 1],
  };
}

function splitRoleLines(role: string) {
  const parts = role.split(' ').filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstLine: role,
      secondLine: null,
    };
  }

  let bestIndex = 1;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let index = 1; index < parts.length; index += 1) {
    const firstLine = parts.slice(0, index).join(' ');
    const secondLine = parts.slice(index).join(' ');
    const score = Math.abs(firstLine.length - secondLine.length);

    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return {
    firstLine: parts.slice(0, bestIndex).join(' '),
    secondLine: parts.slice(bestIndex).join(' '),
  };
}

function normalizeLoopScroll(
  viewport: HTMLDivElement | null,
  mainStartOffset: number,
  loopSpan: number
) {
  if (!viewport || loopSpan <= 0) {
    return;
  }

  while (viewport.scrollLeft < mainStartOffset - CARD_SNAP_INSET_PX) {
    viewport.scrollLeft += loopSpan;
  }

  while (viewport.scrollLeft >= mainStartOffset + loopSpan - CARD_SNAP_INSET_PX) {
    viewport.scrollLeft -= loopSpan;
  }
}

function getCardAnchorScrollLeft(
  viewport: HTMLDivElement | null,
  card: HTMLElement | null
) {
  if (!viewport || !card) {
    return 0;
  }

  const viewportRect = viewport.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  return viewport.scrollLeft + (cardRect.left - viewportRect.left) - CARD_SNAP_INSET_PX;
}

function getNearestRenderedIndex(
  viewport: HTMLDivElement | null,
  cards: Array<HTMLElement | null>
) {
  if (!viewport || cards.length === 0) {
    return -1;
  }

  let nearestIndex = -1;
  let nearestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    if (!card) {
      return;
    }

    const distance = Math.abs(getCardAnchorScrollLeft(viewport, card) - viewport.scrollLeft);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function LeadershipCard({
  member,
  isActive,
  isPreview,
  isDragging,
}: {
  member: LeadershipTeamMember;
  isActive: boolean;
  isPreview: boolean;
  isDragging: boolean;
}) {
  const { firstLine, secondLine } = splitNameLines(member.name);
  const { firstLine: roleFirstLine, secondLine: roleSecondLine } = splitRoleLines(member.role);

  return (
    <article
      className={`group relative shrink-0 overflow-hidden rounded-[2rem] border border-black/5 bg-gray-100 transition-all duration-500 hover:opacity-100 ${
        isDragging ? 'opacity-100' : isActive ? 'opacity-100' : isPreview ? 'opacity-95' : 'opacity-90'
      }`}
      style={{
        width: 'min(68vw, 18.75rem)',
        aspectRatio: '3 / 4',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {member.imageUrl ? (
        // Use a plain img here to match the carousel cards and support any image source returned by Supabase.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.imageUrl}
          alt={member.name}
          className="pointer-events-none h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#e7edf8] via-white to-[#eef3fb] px-6 text-center text-4xl font-bold tracking-[0.14em] text-[#112246]/28">
          {getInitials(member.name)}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#112246] via-[#112246]/42 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="relative min-h-[4.75rem] md:min-h-[5.25rem]">
          <p className="absolute inset-x-0 bottom-0 flex flex-col justify-end text-balance text-left text-base leading-tight font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 md:text-lg group-hover:-translate-y-2 group-hover:opacity-0">
            <span className="block">{roleFirstLine}</span>
            {roleSecondLine ? <span className="block">{roleSecondLine}</span> : null}
          </p>
          <p className="absolute inset-x-0 bottom-0 flex flex-col justify-end text-balance text-left text-base leading-tight font-semibold uppercase text-white opacity-0 translate-y-2 transition-all duration-300 md:text-lg group-hover:translate-y-0 group-hover:opacity-100">
            <span className="block">{firstLine}</span>
            {secondLine ? <span className="block">{secondLine}</span> : null}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function LeadershipScroller({ items }: LeadershipScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const middleSetRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const dragStateRef = useRef({
    dragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });
  const mainStartOffsetRef = useRef(0);
  const loopSpanRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isAutoAnimatingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const scrollSettleTimeoutRef = useRef<number | null>(null);
  const progressFrameRef = useRef<number | null>(null);
  const snapAnimationFrameRef = useRef<number | null>(null);
  const lastProgressTimestampRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const [activeRenderedIndex, setActiveRenderedIndex] = useState(items.length);
  const [previewRenderedIndex, setPreviewRenderedIndex] = useState<number | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const tripledItems = [...items, ...items, ...items];

  function setProgressValue(value: number) {
    progressRef.current = value;
    setProgress(value);
  }

  function resetProgress() {
    setProgressValue(0);
    lastProgressTimestampRef.current = null;
  }

  function syncActiveCard() {
    const viewport = viewportRef.current;

    normalizeLoopScroll(viewport, mainStartOffsetRef.current, loopSpanRef.current);

    const nearestIndex = getNearestRenderedIndex(viewport, cardRefs.current);

    if (nearestIndex >= 0) {
      setActiveRenderedIndex(nearestIndex);
    }
  }

  function cancelSnapAnimation() {
    if (snapAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(snapAnimationFrameRef.current);
      snapAnimationFrameRef.current = null;
    }

    isAutoAnimatingRef.current = false;
  }

  function scrollToRenderedIndex(index: number, options?: { preview?: boolean }) {
    const viewport = viewportRef.current;
    const targetCard = cardRefs.current[index];

    if (!viewport || !targetCard) {
      return;
    }

    if (options?.preview) {
      setPreviewRenderedIndex(index);
    }

    cancelSnapAnimation();

    const startLeft = viewport.scrollLeft;
    const targetLeft = Math.max(getCardAnchorScrollLeft(viewport, targetCard), 0);
    const travelDistance = targetLeft - startLeft;

    if (Math.abs(travelDistance) < 1) {
      viewport.scrollLeft = targetLeft;
      isAutoAnimatingRef.current = false;
      return;
    }

    isAutoAnimatingRef.current = true;
    let animationStart: number | null = null;

    const animate = (timestamp: number) => {
      if (dragStateRef.current.dragging) {
        cancelSnapAnimation();
        return;
      }

      if (animationStart === null) {
        animationStart = timestamp;
      }

      const elapsed = timestamp - animationStart;
      const progressValue = Math.min(elapsed / SNAP_ANIMATION_DURATION_MS, 1);
      const easedProgress = SNAP_SCROLL_EASING(progressValue);

      viewport.scrollLeft = startLeft + travelDistance * easedProgress;

      if (progressValue < 1) {
        snapAnimationFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      viewport.scrollLeft = targetLeft;
      snapAnimationFrameRef.current = null;
      isAutoAnimatingRef.current = false;
    };

    snapAnimationFrameRef.current = window.requestAnimationFrame(animate);
  }

  const autoAdvance = useEffectEvent(() => {
    if (dragStateRef.current.dragging || isAutoAnimatingRef.current) {
      return;
    }

    const nextIndex =
      activeRenderedIndex + 1 < tripledItems.length ? activeRenderedIndex + 1 : items.length;

    scrollToRenderedIndex(nextIndex, { preview: true });
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const middleSet = middleSetRef.current;

    if (!viewport || !middleSet) {
      return;
    }

    const syncMeasurements = () => {
      const mainStartCard = cardRefs.current[items.length];
      const nextStartCard = cardRefs.current[items.length * 2];

      if (mainStartCard && nextStartCard) {
        mainStartOffsetRef.current = getCardAnchorScrollLeft(viewport, mainStartCard);
        loopSpanRef.current =
          getCardAnchorScrollLeft(viewport, nextStartCard) - mainStartOffsetRef.current;

        if (loopSpanRef.current <= 0) {
          return;
        }

        if (!hasInitializedRef.current) {
          viewport.scrollLeft = Math.max(mainStartOffsetRef.current, 0);
          hasInitializedRef.current = true;
        } else {
          normalizeLoopScroll(viewport, mainStartOffsetRef.current, loopSpanRef.current);
        }

        syncActiveCard();
      }
    };

    syncMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      syncMeasurements();
    });

    resizeObserver.observe(middleSet);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      cancelSnapAnimation();

      if (scrollSettleTimeoutRef.current !== null) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
    };
  }, [items.length, tripledItems.length]);

  useEffect(() => {
    if (items.length <= 1 || isAutoScrollPaused) {
      return;
    }

    const tick = (timestamp: number) => {
      if (
        isAutoScrollPaused ||
        dragStateRef.current.dragging ||
        isAutoAnimatingRef.current
      ) {
        lastProgressTimestampRef.current = null;
        progressFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      if (lastProgressTimestampRef.current === null) {
        lastProgressTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastProgressTimestampRef.current;
      lastProgressTimestampRef.current = timestamp;

      const nextProgress = Math.min(progressRef.current + delta / AUTO_SCROLL_DELAY_MS, 1);
      setProgressValue(nextProgress);

      if (nextProgress >= 1) {
        lastProgressTimestampRef.current = null;
        autoAdvance();
      }

      progressFrameRef.current = window.requestAnimationFrame(tick);
    };

    progressFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (progressFrameRef.current !== null) {
        window.cancelAnimationFrame(progressFrameRef.current);
        progressFrameRef.current = null;
      }
    };
  }, [activeRenderedIndex, isAutoScrollPaused, items.length]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    setIsAutoScrollPaused(true);
    cancelSnapAnimation();
    setPreviewRenderedIndex(null);
    setIsDragging(true);

    dragStateRef.current = {
      dragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };

    viewport.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport || !dragStateRef.current.dragging) {
      return;
    }

    event.preventDefault();

    const distance = event.clientX - dragStateRef.current.startX;
    viewport.scrollLeft = dragStateRef.current.scrollLeft - distance;
    normalizeLoopScroll(viewport, mainStartOffsetRef.current, loopSpanRef.current);
  }

  function endDrag(pointerId?: number) {
    const viewport = viewportRef.current;

    if (!viewport || !dragStateRef.current.dragging) {
      return;
    }

    dragStateRef.current.dragging = false;
    setIsDragging(false);

    if (typeof pointerId === 'number' && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    syncActiveCard();
    setIsAutoScrollPaused(false);
  }

  return (
    <div className="mt-14">
      <div
        ref={viewportRef}
        className="overflow-x-auto select-none cursor-grab active:cursor-grabbing touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => {
          isHoveringRef.current = true;
          setIsAutoScrollPaused(true);
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;

          if (!dragStateRef.current.dragging) {
            setIsAutoScrollPaused(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => endDrag(event.pointerId)}
        onPointerCancel={(event) => endDrag(event.pointerId)}
        onScroll={() => {
          if (!isAutoAnimatingRef.current) {
            setIsAutoScrollPaused(true);
          }

          if (scrollSettleTimeoutRef.current !== null) {
            window.clearTimeout(scrollSettleTimeoutRef.current);
          }

          scrollSettleTimeoutRef.current = window.setTimeout(() => {
            isAutoAnimatingRef.current = false;
            syncActiveCard();
            resetProgress();
            setPreviewRenderedIndex(null);

            if (!isHoveringRef.current && !dragStateRef.current.dragging) {
              setIsAutoScrollPaused(false);
            }
          }, 140);
        }}
      >
        <div className="flex w-max items-stretch gap-5 px-1">
          <div className="flex items-stretch gap-5 pr-5">
            {items.map((member, index) => (
              <div
                key={`leadership-clone-start-${member.id}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
              >
                <LeadershipCard
                  member={member}
                  isActive={activeRenderedIndex === index}
                  isPreview={previewRenderedIndex === index}
                  isDragging={isDragging}
                />
              </div>
            ))}
          </div>
          <div ref={middleSetRef} className="flex items-stretch gap-5 pr-5">
            {items.map((member, index) => (
              <div
                key={`leadership-main-${member.id}`}
                ref={(node) => {
                  cardRefs.current[items.length + index] = node;
                }}
              >
                <LeadershipCard
                  member={member}
                  isActive={activeRenderedIndex === items.length + index}
                  isPreview={previewRenderedIndex === items.length + index}
                  isDragging={isDragging}
                />
              </div>
            ))}
          </div>
          <div className="flex items-stretch gap-5">
            {items.map((member, index) => (
              <div
                key={`leadership-clone-end-${member.id}`}
                ref={(node) => {
                  cardRefs.current[items.length * 2 + index] = node;
                }}
              >
                <LeadershipCard
                  member={member}
                  isActive={activeRenderedIndex === items.length * 2 + index}
                  isPreview={previewRenderedIndex === items.length * 2 + index}
                  isDragging={isDragging}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-start pl-1">
        {isDragging ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#112246]/46">
            Drag to explore
          </p>
        ) : (
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#112246]/10 sm:w-28">
            <div
              className="h-full w-full origin-left rounded-full bg-[#112246] transition-transform duration-100 ease-linear transform-gpu will-change-transform"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
