import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav className="w-full border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/"
                className="text-2xl font-bold text-green-600">
                    Save More
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/buyer"
                    className="text-sm font-medium hover:text-green-600">
                        Browse Deals
                    </Link>
                    <Link to="/login"
                    className="text-sm font-medium hover:text-green-600">
                        Login
                    </Link>
                    <Link to="/signup"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                        Sign Up
                    </Link>
                    <Link to="/seller"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                        Sell Stock
                    </Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;