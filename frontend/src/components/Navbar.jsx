import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, axios } = useAppContext()

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null)
                navigate('/')
                setIsMenuOpen(false) // Close menu on logout
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('nav')) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMenuOpen])

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink 
                        to='/' 
                        className="flex-shrink-0"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img className="h-8 w-auto" src={assets.logo} alt="Logo" />
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => 
                                `text-gray-700 hover:text-primary transition-colors ${isActive ? 'font-medium text-primary' : ''}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to='/products' 
                            className={({ isActive }) => 
                                `text-gray-700 hover:text-primary transition-colors ${isActive ? 'font-medium text-primary' : ''}`
                            }
                        >
                            All Products
                        </NavLink>
                        <NavLink 
                            to='/contact' 
                            className={({ isActive }) => 
                                `text-gray-700 hover:text-primary transition-colors ${isActive ? 'font-medium text-primary' : ''}`
                            }
                        >
                            Contact
                        </NavLink>

                        {/* Search Bar - Desktop */}
                        <div className="hidden lg:flex items-center w-64 border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                            <input 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                type="text" 
                                placeholder="Search products" 
                                value={searchQuery}
                            />
                            <img src={assets.search_icon} alt="Search" className="w-4 h-4 ml-2 text-gray-400" />
                        </div>

                        {/* Cart Icon */}
                        <div 
                            onClick={() => navigate('/cart')} 
                            className="relative cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img src={assets.cart_icon} alt="Cart" className="w-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </div>

                        {/* User Profile / Login */}
                        {!user ? (
                            <button 
                                onClick={() => setShowUserLogin(true)} 
                                className="px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm font-medium transition-colors"
                            >
                                Login
                            </button>
                        ) : (
                            <div className="relative group">
                                <button className="flex items-center focus:outline-none">
                                    <img src={assets.profile_icon} className="w-8 h-8 rounded-full" alt="Profile" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                                    <NavLink 
                                        to="my-orders" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Orders
                                    </NavLink>
                                    <button 
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-4">
                        <div 
                            onClick={() => navigate('/cart')} 
                            className="relative cursor-pointer"
                        >
                            <img src={assets.cart_icon} alt="Cart" className="w-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                            aria-expanded="false"
                        >
                            <img 
                                src={isMenuOpen ? assets.menu_icon : assets.menu_icon} 
                                alt={isMenuOpen ? "Close menu" : "Menu"} 
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
                <div className="px-4 pt-2 pb-4 space-y-2">
                    {/* Search Bar - Mobile */}
                    <div className="flex items-center w-full border border-gray-300 rounded-full px-4 py-2 mb-2">
                        <input 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                            type="text" 
                            placeholder="Search products" 
                            value={searchQuery}
                        />
                        <img src={assets.search_icon} alt="Search" className="w-4 h-4 ml-2 text-gray-400" />
                    </div>

                    <NavLink 
                        to='/' 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to='/products' 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        All Products
                    </NavLink>
                    {user && (
                        <NavLink 
                            to='my-orders' 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Orders
                        </NavLink>
                    )}
                    <NavLink 
                        to='/contact' 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </NavLink>

                    <div className="pt-2 border-t border-gray-200">
                        {!user ? (
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    setShowUserLogin(true)
                                }}
                                className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dull"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    logout()
                                    setIsMenuOpen(false)
                                }}
                                className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dull"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}