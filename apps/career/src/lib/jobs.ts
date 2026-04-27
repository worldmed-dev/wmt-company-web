import { supabase } from './supabase';

export type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
};

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Senior Sales Executive', department: 'Commercial & Growth', type: 'Full-time', location: 'Bangkok' },
  { id: '2', title: 'Clinical Application Specialist', department: 'Clinical & Quality', type: 'Full-time', location: 'Bangkok' },
  { id: '3', title: 'Product Manager', department: 'Product & Digital', type: 'Full-time', location: 'Bangkok' },
  { id: '4', title: 'Marketing Coordinator', department: 'Commercial & Growth', type: 'Full-time', location: 'Bangkok' },
  { id: '5', title: 'HR Business Partner', department: 'People & Culture', type: 'Full-time', location: 'Bangkok' },
  { id: '6', title: 'Supply Chain Analyst', department: 'Operations & Supply', type: 'Full-time', location: 'Bangkok' },
  { id: '7', title: 'Finance Manager', department: 'Finance & Planning', type: 'Full-time', location: 'Bangkok' },
  { id: '8', title: 'UX Designer', department: 'Product & Digital', type: 'Full-time', location: 'Bangkok' },
];

export async function getJobs(): Promise<Job[]> {
  return MOCK_JOBS;
}
