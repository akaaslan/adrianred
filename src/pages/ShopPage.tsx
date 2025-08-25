// /* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/thunkActions";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import type { RootState } from "../store";
import ShopItemList from "../components/ShopItemList";
import { Link, useParams, useHistory } from "react-router-dom";

interface ShopPageParams {
  gender?: string;
  categoryName?: string;
  categoryId?: string;
}

export default function ShopPage() {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const history = useHistory();
    const { gender, categoryName, categoryId } = useParams<ShopPageParams>();
    const { total, categories } = useSelector((state: RootState) => state.product);
    
    // Local state for filter, sort, and pagination
    const [filterText, setFilterText] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    // Handle category filter navigation
    const handleCategoryClick = (category: { id: number; title: string; gender: string }) => {
        history.push(`/shop/${category.gender}/${category.title}/${category.id}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [categoryId, filterText, sortOption, itemsPerPage]);

    // Fetch products when any parameter changes
    useEffect(() => {
        interface FetchProductsParams {
            category?: string;
            sort?: string;
            filter?: string;
            limit?: number;
            offset?: number;
        }
        
        const params: FetchProductsParams = {
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage
        };
        
        if (categoryId) {
            params.category = categoryId;
        }
        
        if (filterText.trim()) {
            params.filter = filterText.trim();
        }
        
        if (sortOption) {
            params.sort = sortOption;
        }
        
        dispatch(fetchProducts(params));
    }, [dispatch, categoryId, filterText, sortOption, currentPage, itemsPerPage]);

    const handleFilterChange = (value: string) => {
        setFilterText(value);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
    };

    // Calculate pagination info
    const totalPages = Math.ceil(total / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, total);

    const pageTitle = categoryName ? `${categoryName} - ${gender}` : 'Shop';
    const breadcrumbText = categoryName ? `${gender} > ${categoryName}` : 'Shop';

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row py-6 sm:py-10 px-4 sm:px-[12vw] pt-20 sm:pt-24 items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
                <h1 className="text-xl sm:text-2xl font-bold capitalize">{pageTitle}</h1>
                <div className="flex items-center ml-auto">
                    <Link to="/" className="text-sm sm:text-lg text-black mr-1 hover:underline">Home</Link>
                    <span className="text-sm sm:text-lg text-gray-400">&gt;</span>
                    <span className="text-sm sm:text-lg ml-1 hover:underline text-gray-400 capitalize truncate max-w-[150px] sm:max-w-none">{breadcrumbText}</span>
                </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-[12vw] mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label htmlFor="filter-input" className="text-sm font-semibold text-gray-700">Filter:</label>
                    <input
                        id="filter-input"
                        type="text"
                        placeholder="Search products..."
                        value={filterText}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label htmlFor="sort-select" className="text-sm font-semibold text-gray-700">Sort:</label>
                    <select
                        id="sort-select"
                        value={sortOption}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                        <option value="">Default</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                        <option value="rating:asc">Rating: Low to High</option>
                        <option value="rating:desc">Rating: High to Low</option>
                    </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label htmlFor="items-per-page" className="text-sm font-semibold text-gray-700">Items:</label>
                    <select
                        id="items-per-page"
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                </div>
            </div>

            {/* Pagination Info */}
            {total > 0 && (
                <div className="px-4 sm:px-[12vw] mb-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                        Showing {startItem}-{endItem} of {total} products 
                        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                </div>
            )}

            {/* Pagination Controls - Top */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 sm:gap-2 px-4 sm:px-[12vw] mb-6 overflow-x-auto">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        First
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Previous
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-2 sm:px-3 py-2 rounded border text-xs sm:text-sm ${
                                    currentPage === pageNum 
                                        ? 'bg-blue-500 text-white font-bold' 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Last
                    </button>
                </div>
            )}

            <div className="flex flex-col sm:flex-row w-full max-w-[90vw] sm:max-w-[85vw] ml-[5vw] sm:ml-[6vw] md:ml-[7vw] gap-3 sm:gap-4 py-4">
                {categories.slice(0, 5).map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className="relative group w-full sm:min-w-[180px] h-40 sm:h-full rounded-lg shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer"
                      style={{ 
                        aspectRatio: '1/1', 
                        backgroundImage: category.img ? `url(${category.img})` : `url(https://picsum.photos/id/${1025 + index}/400/400)`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300" />
                      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-2">
                        <span className="text-white text-lg sm:text-xl md:text-3xl font-bold tracking-wide drop-shadow-lg uppercase">{category.title}</span>
                        <span className="text-white text-sm sm:text-base md:text-lg font-semibold mt-1 sm:mt-2 drop-shadow">{category.gender}</span>
                      </div>
                    </button>
                ))}
            </div>
            <ShopItemList 
              gender={gender}
              categoryName={categoryName}
              categoryId={categoryId}
            />

            {/* Pagination Controls - Bottom */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 sm:gap-2 px-4 sm:px-[12vw] mt-8 mb-8 overflow-x-auto">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        First
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Previous
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-2 sm:px-3 py-2 rounded border text-xs sm:text-sm ${
                                    currentPage === pageNum 
                                        ? 'bg-blue-500 text-white font-bold' 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-2 rounded border bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    )
}