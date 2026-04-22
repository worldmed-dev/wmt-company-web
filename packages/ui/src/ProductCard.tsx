type ProductCardProps = {
  name: string;
  subCategory: string;
  imageUrl?: string;
};

export function ProductCard({ name, subCategory, imageUrl }: ProductCardProps) {
  return (
    <div className="group cursor-pointer rounded-[32px] border border-[#15233E]/8 bg-white p-4 shadow-[0_18px_40px_rgba(21,35,62,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-square w-full overflow-hidden rounded-[24px] bg-[#F5F7FA]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="px-1 pt-4">
        <h4 className="mb-1 text-base font-bold text-[#15233E]">{name}</h4>
        <p className="text-sm font-medium text-gray-400">{subCategory}</p>
      </div>
    </div>
  );
}
