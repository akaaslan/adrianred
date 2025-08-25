// Utility function to create URL-friendly slugs
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Generate product URL with proper format
export const generateProductUrl = (
  gender?: string,
  categoryName?: string,
  categoryId?: string,
  productName?: string,
  productId?: number
): string => {
  if (!gender || !categoryName || !categoryId || !productName || !productId) {
    // Fallback URL if some data is missing
    return `/product/${productId}`;
  }

  const productSlug = createSlug(productName);
  return `/shop/${gender}/${categoryName}/${categoryId}/${productSlug}/${productId}`;
};
