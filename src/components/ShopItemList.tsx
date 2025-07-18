import React, { useState } from "react";
import shopItems from "./ShopItemData";
import ShopItemCard from "./ShopItemCard";



export default function ShopItemList() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('popularity');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);


// Sorting logic
const products = React.useMemo(() => {
  const arr = [...shopItems];
  if (sort === 'low') {
    arr.sort((a, b) => parseFloat(a.salePrice.slice(1)) - parseFloat(b.salePrice.slice(1)));
  } else if (sort === 'high') {
    arr.sort((a, b) => parseFloat(b.salePrice.slice(1)) - parseFloat(a.salePrice.slice(1)));
  }
  return arr;
}, [sort]);

// Pagination logic
const totalPages = Math.ceil(products.length / itemsPerPage);
const paginated = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

// Reset page if itemsPerPage changes
React.useEffect(() => { setPage(1); }, [itemsPerPage]);

  return (
    <div className="bg-white w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8 flex flex-col items-center">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="text-gray-600 text-sm">Showing {products.length} results</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">View:</span>
          <button
            className={`w-8 h-8 flex items-center justify-center border rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} mr-1`}
            title="Grid view"
            onClick={() => setView('grid')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button
            className={`w-8 h-8 flex items-center justify-center border rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            title="List view"
            onClick={() => setView('list')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="7"/><rect x="3" y="14" width="18" height="7"/></svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 text-sm text-gray-600"
            aria-label="Sort products"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
          <select
            className="border rounded px-2 py-1 text-sm text-gray-600"
            aria-label="Items per page"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
          >
            <option value={8}>8 / page</option>
            <option value={12}>12 / page</option>
            <option value={16}>16 / page</option>
            <option value={24}>24 / page</option>
          </select>
          <button
            className={`px-4 py-1 rounded text-sm font-semibold ${filter ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            onClick={() => setFilter(f => !f)}
            title="Filter"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Product grid/list */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paginated.map((product) => (
            <ShopItemCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((product) => (
            <ShopItemCard key={product.id} product={product} view="list" />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded border bg-gray-100 text-gray-500"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >First</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-500 text-white font-bold' : 'bg-gray-100 text-gray-500'}`}
            onClick={() => setPage(i + 1)}
          >{i + 1}</button>
        ))}
        <button
          className="px-3 py-1 rounded border bg-gray-100 text-gray-500"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >Next</button>
      </div>
    </div>
  );
}