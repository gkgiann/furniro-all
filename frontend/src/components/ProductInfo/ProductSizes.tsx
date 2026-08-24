type ProductSizesProps = {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
};

const ProductSizes = ({ sizes, selectedSize, onSelect }: ProductSizesProps) => {
  return (
    <div className="mt-8">
      <p className="mb-3 text-sm text-gray-500">Size</p>

      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`flex h-[30px] min-w-[30px] p-2 items-center justify-center rounded-md text-sm cursor-pointer ${
              selectedSize === size
                ? "bg-over-secundary text-white"
                : "bg-[#F9F1E7]"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;
