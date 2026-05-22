import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function SignupPage(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-center">
                        Create Account
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Join the marketplace
                    </p>
                    <form className="mt-8 space-y-5">
                        <div>
                            <label className="block mb-2 font-medium">
                                Full Name
                            </label>
                            <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Phone Number
                            </label>
                            <input
                            type="tel"
                            placeholder="07XXXXXXXX"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Account Type
                            </label>
                            <select className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Buyer</option>
                                <option>Seller</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>
                            <input
                            type="password"
                            placeholder="Create password"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <button
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium">
                            Create Account
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?
                        <Link to="/login"
                        className="text-green-600 font-medium cursor-pointer ml-1">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default SignupPage;