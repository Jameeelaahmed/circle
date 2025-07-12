import { motion } from "framer-motion"
import { Link, useLocation } from "react-router"

function Header() {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: 'events' },
        { name: 'Payments', path: 'payments' },
        { name: 'About Us', path: 'about' }
    ];

    return (
        <div className="w-full bg-black/80 backdrop-blur-sm border-b border-white/10 z-50 fixed top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-shrink-0 flex items-center"
                        >
                            <Link to="/" className="flex items-center">
                                <div className="bg-gradient-to-r from-purple-600 to-blue-500 w-8 h-8 rounded-lg"></div>
                                <span className="ml-3 text-xl font-bold text-white">Circle</span>
                            </Link>
                        </motion.div>
                        <div className="hidden md:block ml-10">
                            <div className="flex space-x-4">
                                {navItems.map((item, index) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={item.path}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                    ? 'text-white bg-purple-600/20 border border-purple-500/30'
                                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                component={motion.a}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Mail className="h-5 w-5" />
                        </Button>
                        <div className="ml-3 relative">
                            <div className="flex items-center">
                                <button className="flex text-sm rounded-full focus:outline-none">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                    >
                                        <User className="h-5 w-5 text-white" />
                                    </motion.div>
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
