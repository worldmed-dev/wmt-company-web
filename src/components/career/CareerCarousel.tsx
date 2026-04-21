import CareerCarouselClient from '@/components/career/CareerCarouselClient';
import { getEmployerBrandingCards } from '@/lib/employerBranding';

export default async function CareerCarousel() {
  const cards = await getEmployerBrandingCards();
  const row1 = cards.slice(0, 10);
  const row2 = cards.slice(10, 20);

  return <CareerCarouselClient row1={row1} row2={row2} />;
}
