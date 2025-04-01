export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    onClear,
}: {
    categories: string[];
    selectedCategory?: string;
    onSelectCategory: (category: string) => void;
    onClear: () => void;
}) {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
        <button
            onClick={onClear}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
            !selectedCategory
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            Todos
        </button>
        {categories.map((category) => (
            <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            >
            {category}
            </button>
        ))}
        </div>
    );
}