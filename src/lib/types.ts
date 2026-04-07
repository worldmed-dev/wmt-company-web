export type MajorCategory = {
  id: number;
  name_en: string;
  name_th: string;
};

export type SubCategory = {
  id: number;
  name_en: string;
  name_th: string;
  major_category_id: number;
};

export type CategoryWithSubs = MajorCategory & {
  sub_categories: SubCategory[];
};
