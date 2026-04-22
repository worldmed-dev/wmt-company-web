import { supabase } from './supabase';
import { toSlug, type CategoryWithSubs } from '@wmt/shared';

export async function getProductCategories(): Promise<CategoryWithSubs[]> {
  const { data, error } = await supabase
    .from('major_categories')
    .select('*, sub_categories(*)');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as CategoryWithSubs[];
}

export async function getCategoryById(id: number): Promise<CategoryWithSubs | null> {
  const { data, error } = await supabase
    .from('major_categories')
    .select('*, sub_categories(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data as CategoryWithSubs;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithSubs | null> {
  const all = await getProductCategories();
  return all.find((cat) => toSlug(cat.name_en) === slug) ?? null;
}
