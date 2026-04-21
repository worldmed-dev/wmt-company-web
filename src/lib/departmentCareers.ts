import { supabase } from './supabase';

type DepartmentCareerRow = {
  id?: unknown;
  name?: unknown;
  [key: string]: unknown;
};

export type DepartmentCareer = {
  id: string;
  name: string;
};

function asText(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function mapDepartmentRows(rows: DepartmentCareerRow[]) {
  return rows
    .map((row, index) => {
      const name = asText(row.name);

      if (!name) {
        return null;
      }

      return {
        id:
          asText(row.id) ??
          (typeof row.id === 'number' ? String(row.id) : `department-${index}-${name}`),
        name,
      };
    })
    .filter((department): department is DepartmentCareer => department !== null);
}

export async function getDepartmentCareers(): Promise<DepartmentCareer[]> {
  const { data, error } = await supabase
    .from('department_careers')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching department careers:', error);
    return [];
  }

  return mapDepartmentRows((data ?? []) as DepartmentCareerRow[]);
}
