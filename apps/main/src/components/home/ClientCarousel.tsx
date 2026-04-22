import { supabase } from '@/lib/supabase';
import { BrandLogoCarousel } from '@wmt/ui';

export default async function ClientCarousel() {
  const { data, error } = await supabase
    .from('brands')
    .select('id, logo_url')
    .order('id', { ascending: true });

  if (error || !data) return null;

  const row1 = data.filter((b) => b.id >= 1 && b.id <= 13);
  const row2 = data.filter((b) => b.id >= 14 && b.id <= 27);

  return <BrandLogoCarousel row1={row1} row2={row2} />;
}
