import { supabase } from './supabase';

type LeadershipTeamRow = {
  id?: unknown;
  name?: unknown;
  full_name?: unknown;
  role?: unknown;
  job_title?: unknown;
  position?: unknown;
  image_url?: unknown;
  photo_url?: unknown;
  avatar_url?: unknown;
  [key: string]: unknown;
};

export type LeadershipTeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
};

function asText(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function firstText(row: LeadershipTeamRow, keys: string[]) {
  for (const key of keys) {
    const value = asText(row[key]);

    if (value) {
      return value;
    }
  }

  return null;
}

function mapLeadershipRows(
  rows: LeadershipTeamRow[],
  tableName: string
): LeadershipTeamMember[] {
  return rows
    .map((row, index) => {
      const name = firstText(row, ['name', 'full_name']);
      const role = firstText(row, ['role', 'job_title', 'position']);
      const imageUrl = firstText(row, ['image_url', 'photo_url', 'avatar_url']);

      if (!name && !role && !imageUrl) {
        return null;
      }

      return {
        id:
          asText(row.id) ??
          (typeof row.id === 'number' ? String(row.id) : `${tableName}-${index}-${name ?? 'member'}`),
        name: name ?? 'World Med Leader',
        role: role ?? 'Leadership Team',
        imageUrl,
      };
    })
    .filter((member): member is LeadershipTeamMember => member !== null);
}

export async function getLeadershipTeamMembers(): Promise<LeadershipTeamMember[]> {
  const tableNames = ['Leadership_team', 'leadership_team'];
  let lastError: unknown = null;

  for (const tableName of tableNames) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      lastError = error;
      continue;
    }

    return mapLeadershipRows((data ?? []) as LeadershipTeamRow[], tableName);
  }

  if (lastError) {
    console.error('Error fetching leadership team:', lastError);
  }

  return [];
}
