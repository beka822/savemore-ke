import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function LoginPage(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-center">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Login to continue
                    </p>
                    <form className="mt-8 space-y-5">
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
                                Password
                            </label>
                            <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <button
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium">
                            Login
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?
                    <Link to="/signup"
                    className="text-green-600 font-medium cursor-pointer ml-1">
                        Sign Up
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;