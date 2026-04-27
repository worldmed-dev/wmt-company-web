import { getJobs } from '@/lib/jobs';
import { getDepartmentCareers } from '@/lib/departmentCareers';
import JobsClient from '@/components/jobs/JobsClient';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import DepartmentCategoryBar from '@/components/layout/DepartmentCategoryBar';

export default async function JobsPage() {
  const [jobs, departments] = await Promise.all([getJobs(), getDepartmentCareers()]);
  const departmentNames = departments.map((d) => d.name);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <DepartmentCategoryBar
        name="Career"
        navItems={[
          { label: 'Job Search', href: '#job-search' },
          { label: 'Saved Jobs', href: '#saved-jobs' },
          { label: 'Application', href: '#application' },
        ]}
      />

      {/* Search section */}
      <section className="page-x py-16 bg-white border-b border-[#112246]/8">
        <div className="mx-auto max-w-7xl">
          <JobSearchBar />
        </div>
      </section>

      {/* Filter + Jobs section */}
      <section className="page-x py-12">
        <div className="mx-auto max-w-7xl">
          <JobsClient jobs={jobs} departmentNames={departmentNames} />
        </div>
      </section>
    </div>
  );
}
