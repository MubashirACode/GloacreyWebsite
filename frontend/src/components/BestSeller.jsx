import React from 'react';
import { ProductCard } from './ProductCard';
import { useAppContext } from '../context/AppContext';

export const BestSeller = () => {
  const { products } = useAppContext();

  // Filter and take top 5 in-stock products
  const bestSellers = products.filter((product) => product.inStock).slice(0, 5);

  return (
    <div className="mt-16 px-4">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
