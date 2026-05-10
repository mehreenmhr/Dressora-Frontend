export default function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-icon">{category.icon}</div>
      <div className="category-name">{category.categoryName}</div>
    </div>
  );
}
