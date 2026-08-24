type ProductColorsProps = {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
};

const ProductColors = ({
  colors,
  selectedColor,
  onSelect,
}: ProductColorsProps) => {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm text-gray-500">Color</p>

      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className={`h-[30px] w-[30px] rounded-full border-2 border-gray-200 cursor-pointer ${
              selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""
            }`}
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
