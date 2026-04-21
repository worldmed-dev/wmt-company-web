type Props = {
  name: string;
  subCategory: string;
  imageUrl?: string;
};

export default function ProductCard({ name, subCategory, imageUrl }: Props) {
  return (
    <div className="group cursor-pointer rounded-[32px] border border-[#15233E]/8 bg-white p-4 shadow-[0_18px_40px_rgba(21,35,62,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full aspect-square bg-[#F5F7FA] rounded-[24px] overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="px-1 pt-4">
        <h4 className="text-base font-bold text-[#15233E] mb-1">{name}</h4>
        <p className="text-sm text-gray-400 font-medium">{subCategory}</p>
      </div>
    </div>
  );
}
