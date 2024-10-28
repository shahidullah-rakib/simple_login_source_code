'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { ProductModal } from '@/views/products/productModal/productModal';
import { BackToHome } from '@/components/backToHome/backToHome';
import { ProductList } from '@/views/products/productList/productList';
import { PaginationControls } from '@/views/products/paginationControls/paginationControls';
import { usePagination } from '@/hooks/usePagination';
import { PRODUCTS_DATA } from '@/data/productsData';

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({
    items: PRODUCTS_DATA,
    itemsPerPage: 5,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  useEffect(() => {
    // Open modal if productId is in the URL on initial load
    if (productId) {
      const product = PRODUCTS_DATA.find((p) => p.id === productId);
      if (product) setSelectedProduct(product);
    }
  }, [productId]);

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      // Add product ID to the URL without refreshing the page
      router.push(`/products?productId=${product.id}`);
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    // Remove product ID from the URL
    router.push('/products');
  }, [router]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
