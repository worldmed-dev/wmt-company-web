'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import type { Job } from '@/lib/jobs';
import JobFilterCard from './JobFilterCard';

const JOB_TYPE_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const LOCATION_OPTIONS = ['Bangkok', 'Remote', 'Hybrid'];

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-[#112246]/10 bg-white overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#f4f7fb] transition-colors text-left"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#112246]/40">
            {job.department}{job.location ? ` · ${job.location}` : ''}
          </p>
          <h3 className="mt-1 text-base font-bold text-[#112246]">{job.title}</h3>
          {job.type && (
            <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-widest text-[#112246]/40 border border-[#112246]/15 rounded-full px-3 py-0.5">
              {job.type}
            </span>
          )}
        </div>
        <div className="ml-4 shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#112246]/15 text-[#112246]/50">
          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[#112246]/8">
          <div className="pt-5 text-sm leading-7 text-[#112246]/70 space-y-4">
            <div>
              <p className="font-bold text-[#112246] mb-2">About the Role</p>
              <p>{job.description ?? 'Job description coming soon.'}</p>
            </div>
            {job.responsibilities && (
              <div>
                <p className="font-bold text-[#112246] mb-2">Responsibilities</p>
                <p>{job.responsibilities}</p>
              </div>
            )}
            {job.requirements && (
              <div>
                <p className="font-bold text-[#112246] mb-2">Requirements</p>
                <p>{job.requirements}</p>
              </div>
            )}
          </div>
          <button className="mt-6 rounded-full bg-ci-primary-deep px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-ci-primary-deep/80 transition-colors">
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function JobsClient({ jobs, departmentNames }: { jobs: Job[]; departmentNames: string[] }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Use unique departments from actual job data
  const jobDepartments = [...new Set(jobs.map((j) => j.department).filter(Boolean))];
  const departments = departmentNames.length > 0 ? departmentNames : jobDepartments;

  const filterSections = [
    { label: 'Area of Interest', key: 'department', options: departments },
    { label: 'Job Type', key: 'type', options: JOB_TYPE_OPTIONS },
  ];

  const toggleFilter = (key: string, value: string) => {
    setSelected((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const clearFilters = () => setSelected({});

  const filtered = jobs.filter((job) => {
    for (const [key, values] of Object.entries(selected)) {
      if (values.length === 0) continue;
      if (!values.includes((job as Record<string, string>)[key])) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">

      {/* Sidebar filter — desktop sticky */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-[56px]">
        <JobFilterCard sections={filterSections} selected={selected} onToggle={toggleFilter} onClear={clearFilters} />
      </aside>

      {/* Main */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#112246]/50">
            {filtered.length} {filtered.length === 1 ? 'position' : 'positions'} found
          </p>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${mobileFilterOpen ? 'bg-[#112246] border-[#112246] text-white' : 'bg-white border-[#112246]/20 text-[#112246]'}`}
          >
            <FunnelIcon className="w-4 h-4" />
            Filter
          </button>
        </div>

        {mobileFilterOpen && (
          <div className="lg:hidden mb-6">
            <JobFilterCard sections={filterSections} selected={selected} onToggle={toggleFilter} onClear={clearFilters} />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-[#112246]/15 bg-white px-6 py-12 text-center">
              <p className="text-base font-semibold text-[#112246]/50">No positions found</p>
              <p className="mt-2 text-sm text-[#112246]/30">Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
}
