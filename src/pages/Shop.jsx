import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products, categories } from '../data/mockData';
import '../styles/pages.css';

// Import Modest category example images
import img1 from '../assests/Modest/Black and White Cut Abaya .jpeg';
import img2 from '../assests/Modest/Black Umbrella Abaya .jpeg';
import img3 from '../assests/Modest/Blue Open Cut Abaya .jpeg';
import img4 from '../assests/Modest/Modest Navy Frok Abaya .jpeg';
import img5 from '../assests/Modest/Modest Open Cut Abaya.jpeg';
import img6 from '../assests/Modest/Pink Floral Abaya .jpeg';

const modestExamples = [
  { id: 1, name: 'Black and White Cut Abaya', img: img1 },
  { id: 2, name: 'Black Umbrella Abaya', img: img2 },
  { id: 3, name: 'Blue Open Cut Abaya', img: img3 },
  { id: 4, name: 'Modest Navy Frok Abaya', img: img4 },
  { id: 5, name: 'Modest Open Cut Abaya', img: img5 },
  { id: 6, name: 'Pink Floral Abaya', img: img6 },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filtered, setFiltered]     = useState(products.filter(p => p.isActive));
  const [search, setSearch]         = useState(searchParams.get('search') || '');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') ? Number(searchParams.get('category')) : null);
  const [priceMin, setPriceMin]     = useState('');
  const [priceMax, setPriceMax]     = useState('');
  const [sortBy, setSortBy]         = useState('default');
  const [viewGrid, setViewGrid]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let result = products.filter(p => p.isActive);
    if (search)      result = result.filter(p => p.productName.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (selectedCat) {
      const selectedCategory = categories.find(c => c.categoryID === selectedCat);
      if (selectedCategory && !selectedCategory.parentCategoryID) {
        // It's a top-level category, include products from this and all child categories
        const childCategories = categories.filter(c => c.parentCategoryID === selectedCat).map(c => c.categoryID);
        const allCategoryIds = [selectedCat, ...childCategories];
        result = result.filter(p => allCategoryIds.includes(p.categoryID));
      } else {
        // It's a subcategory or direct match
        result = result.filter(p => p.categoryID === selectedCat);
      }
    }
    if (priceMin)    result = result.filter(p => p.basePrice >= Number(priceMin));
    if (priceMax)    result = result.filter(p => p.basePrice <= Number(priceMax));
    if (sortBy === 'price-asc')  result = [...result].sort((a,b) => a.basePrice - b.basePrice);
    if (sortBy === 'price-desc') result = [...result].sort((a,b) => b.basePrice - a.basePrice);
    if (sortBy === 'rating')     result = [...result].sort((a,b) => b.rating - a.rating);
    if (sortBy === 'newest')     result = [...result].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(result);
  }, [search, selectedCat, priceMin, priceMax, sortBy]);

  const topCategories = categories.filter(c => !c.parentCategoryID);
  const clearFilters = () => { setSearch(''); setSelectedCat(null); setPriceMin(''); setPriceMax(''); setSortBy('default'); };

  const Sidebar = () => (
    <aside className="shop-sidebar">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <h3 style={{ fontSize:15 }}>Filters</h3>
        <button onClick={clearFilters} style={{ fontSize:12, color:'var(--pink)', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Clear All</button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Category</div>
        <div className="filter-option" onClick={() => setSelectedCat(null)} style={{ cursor:'pointer' }}>
          <input type="radio" readOnly checked={!selectedCat} /> <label>All Categories</label>
        </div>
        {topCategories.map(cat => (
          <div key={cat.categoryID} className="filter-option" onClick={() => setSelectedCat(cat.categoryID)} style={{ cursor:'pointer' }}>
            <input type="radio" readOnly checked={selectedCat === cat.categoryID} />
            <label>{cat.icon} {cat.categoryName}</label>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Price Range (Rs.)</div>
        <div className="price-range">
          <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
          <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Rating</div>
        {[5,4,3].map(r => (
          <div key={r} className="filter-option">
            <input type="checkbox" id={`r${r}`} />
            <label htmlFor={`r${r}`}>{'★'.repeat(r)}{'☆'.repeat(5-r)} & up</label>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Availability</div>
        <div className="filter-option"><input type="checkbox" id="instock" /><label htmlFor="instock">In Stock</label></div>
        <div className="filter-option"><input type="checkbox" id="sale" /><label htmlFor="sale">On Sale</label></div>
      </div>
    </aside>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Shop Collection</h1>
          <p>Discover our latest fashion arrivals</p>
          <div className="breadcrumb"><a href="/">Home</a> / <span>Shop</span></div>
        </div>
      </div>

      <div className="container section">
        {/* Search bar */}
        <div className="shop-search">
          <input
            className="form-control"
            placeholder="Search products by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => {}}>Search</button>
          <button className="btn btn-ghost" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display:'none' }}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="shop-layout">
          <Sidebar />

          {/* Main */}
          <div>
            <div className="shop-toolbar">
              <span className="results">{selectedCat === 1 ? `${modestExamples.length} Modest examples` : `${filtered.length} products found${selectedCat ? ` in ${topCategories.find(c=>c.categoryID===selectedCat)?.categoryName}` : ''}${search ? ` for "${search}"` : ''}`}</span>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <select className="form-control" style={{ width:'auto', padding:'8px 14px' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="view-toggle">
                  <button className={`view-btn ${viewGrid ? 'active' : ''}`} onClick={() => setViewGrid(true)}><Grid size={14} /></button>
                  <button className={`view-btn ${!viewGrid ? 'active' : ''}`} onClick={() => setViewGrid(false)}><List size={14} /></button>
                </div>
              </div>
            </div>

            {selectedCat === 1 ? (
              // Display Modest examples instead of products
              <div className="products-grid">
                {modestExamples.map(example => (
                  <div key={example.id} style={{ cursor: 'pointer' }}>
                    <div style={{ background: '#F1E9E9', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', height: '250px' }}>
                      <img src={example.img} alt={example.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ textAlign: 'center', fontWeight: '600', color: 'var(--text-dark)' }}>{example.name}</div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filtered.map(p => <ProductCard key={p.productID} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
