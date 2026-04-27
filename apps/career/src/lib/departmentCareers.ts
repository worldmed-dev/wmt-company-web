import { supabase } from './supabase';
import { toSlug } from '@wmt/shared';

type DepartmentCareerRow = {
  id?: unknown;
  name?: unknown;
  [key: string]: unknown;
};

export type DepartmentCareer = {
  id: string;
  name: string;
  image_url: string | null;
  head_name: string | null;
  role_name: string | null;
  head_image: string | null;
  testimonial_en: string | null;
  testimonial_th: string | null;
  hwd_en: string | null;
  hwd_th: string | null;
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
        image_url: asText(row.image_url) ?? null,
        head_name: asText(row.head_name) ?? null,
        role_name: asText(row.role_name) ?? null,
        head_image: asText(row.head_image) ?? null,
        testimonial_en: asText(row.testimonial_en) ?? null,
        testimonial_th: asText(row.testimonial_th) ?? null,
        hwd_en: asText(row.hwd_en) ?? null,
        hwd_th: asText(row.hwd_th) ?? null,
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

export async function getDepartmentBySlug(slug: string): Promise<DepartmentCareer | null> {
  const departments = await getDepartmentCareers();
  return departments.find((d) => toSlug(d.name) === slug) ?? null;
}
