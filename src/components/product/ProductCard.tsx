type Props = {
  name: string;
  category: string;
  imageUrl?: string;
};

export default function ProductCard({ name, category, imageUrl }: Props) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full aspect-square bg-[#F5F7FA] rounded-3xl mb-4 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="px-1">
        <h4 className="text-base font-bold text-[#15233E] mb-1">{name}</h4>
        <p className="text-sm text-gray-400 font-medium">{category}</p>
      </div>
    </div>
  );
}
