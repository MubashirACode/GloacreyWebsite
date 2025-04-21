import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext';


export const Categories = () => {
    const { navigate , currency} = useAppContext();

    const handleClick = (path) => {
        if (navigate && path) {
            navigate(`/products/${path.toLowerCase()}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-medium">Categories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.path}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick(category.path)}
                        onKeyDown={(e) => e.key === 'Enter' && handleClick(category.path)}
                        className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        style={{ backgroundColor: category.bgColor || '#f3f4f6' }}
                    >
                        <img
                            src={category.image}
                            alt={category.text || 'Category'}
                            className="group-hover:scale-110 transition-transform max-w-28"
                            loading="lazy"
                        />
                        <p className="text-sm font-medium mt-2 text-center">
                            {category.text || 'Unnamed'}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
