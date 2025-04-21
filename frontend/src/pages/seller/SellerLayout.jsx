import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';

import toast from 'react-hot-toast';

export const SellerLayout = () => {
    const { axios , navigate } = useAppContext();

    const logout = async () => {
        
        try {
            

            const {data} = await axios.get('/api/seller/logout');

            if (data.success) {

                toast.success(data.message)
                navigate('/')
                
            }else{
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(data.message)
            
        }
    };

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-primary py-3 bg-white shadow-sm">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-28 md:w-36" />
                </Link>
                <div className="flex items-center gap-5 text-gray-600">
                    <p>Hi! Admin</p>
                    <button
                        onClick={logout}
                        className="border border-gray-300 hover:bg-gray-100 rounded-full text-sm px-4 py-1 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Sidebar + Content Layout */}
            <div className="flex">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/seller'}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 transition-all duration-200
                                 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100 text-gray-700"}`
                            }
                        >
                            <img src={item.icon} alt={item.name} className="w-7 h-7" />
                            <p className="md:block hidden">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
