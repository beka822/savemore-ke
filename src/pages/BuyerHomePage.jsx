import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
function BuyerHomePage(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/*HEADER*/}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Nearby Deals
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Find discounted essentials within 1km.
                        </p>
                    </div>
                    {/*SEARCH*/}
                    <input
                    type="text"
                    placeholder="Search products..."
                    className="border bg-white px-4 py-3 rounded-xl w-full md:w-80" />
                </div>
                {/*FILTERS*/}
                <div className="flex gap-3 overflow-x-auto py-6">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full">
                        All
                    </button>
                    <button className="bg-white border px-4 py-2 rounded-full">
                        Milk
                    </button>
                    <button className="bg-white border px-4 py-2 rounded-full">
                        Bread
                    </button>
                    <button className="bg-white border px-4 py-2 rounded-full">
                        Beverages
                    </button>
                </div>
                {/*PRODUCT GRID*/}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
}
export default BuyerHomePage;