import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ProductCard } from '../components/ProductCard'

export const AllProducts = () => {
  const { products = [], searchQuery } = useAppContext()
  const [filterProducts, setFilterProducts] = useState([])

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilterProducts(products)
    }
  }, [products, searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
      <div className="flex flex-col items-end w-max">
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {filterProducts.filter(product => product.inStock).length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {filterProducts
            .filter(product => product.inStock)
            .map(product => (
              <ProductCard key={product.id || product.name} product={product} />
            ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500">No products found.</p>
      )}
    </div>
  )
}
