import { supabase } from './supabase';
import type { CategoryWithSubs } from '@wmt/shared';

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
