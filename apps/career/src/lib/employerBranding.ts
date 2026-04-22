import { supabase } from './supabase';

const EMPLOYER_BRANDING_IDS = Array.from({ length: 20 }, (_, index) => index + 1);

type EmployerBrandingRow = {
  id: number;
  [key: string]: unknown;
};

const PLACEHOLDER_QUOTE = '"A place where I can grow, contribute, and do meaningful work every day."';

export type EmployerBrandingCard = {
  id: number;
  imageUrl: string | null;
  alt: string;
  name: string;
  role: string;
  quote: string;
  color: string;
};

function firstString(row: EmployerBrandingRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return null;
}

function fallbackCards(): EmployerBrandingCard[] {
  return EMPLOYER_BRANDING_IDS.map((id) => ({
    id,
    imageUrl: null,
    alt: `Employer branding ${id}`,
    name: `Team Member ${id}`,
    role: 'World Med Trading',
    quote: PLACEHOLDER_QUOTE,
    color: 'Blue',
  }));
}

export async function getEmployerBrandingCards(): Promise<EmployerBrandingCard[]> {
  const { data, error } = await supabase
    .from('employer_branding')
    .select('*')
    .gte('id', 1)
    .lte('id', 20)
    .order('id', { ascending: true });

  if (error || !data) {
    console.error('Error fetching employer branding cards:', error);
    return fallbackCards();
  }

  const rowsById = new Map<number, EmployerBrandingRow>(
    data
      .filter((row): row is EmployerBrandingRow => typeof row.id === 'number')
      .map((row) => [row.id, row])
  );

  return EMPLOYER_BRANDING_IDS.map((id) => {
    const row = rowsById.get(id);

    if (!row) {
      return {
        id,
        imageUrl: null,
        alt: `Employer branding ${id}`,
        name: `Team Member ${id}`,
        role: 'World Med Trading',
        quote: PLACEHOLDER_QUOTE,
        color: 'Blue',
      };
    }

    const imageUrl = firstString(row, [
      'image_url',
      'photo_url',
      'cover_image_url',
      'cover_url',
      'thumbnail_url',
      'logo_url',
      'url',
      'src',
    ]);

    const alt =
      firstString(row, ['alt_text', 'alt', 'title', 'name', 'caption']) ??
      `Employer branding ${id}`;
    const name =
      firstString(row, ['name', 'full_name', 'employee_name', 'person_name', 'staff_name']) ??
      `Team Member ${id}`;
    const role =
      firstString(row, ['role', 'job_title', 'position', 'designation', 'department', 'team']) ??
      'World Med Trading';
    const color = firstString(row, ['color']) ?? 'Blue';
    const quote = firstString(row, ['testimonial_en', 'testimonial_th']) ?? PLACEHOLDER_QUOTE;

    return {
      id,
      imageUrl,
      alt,
      name,
      role,
      quote,
      color,
    };
  });
}
