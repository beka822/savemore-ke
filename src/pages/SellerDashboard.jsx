import Navbar from "../components/Navbar";
function SellerDashboard(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Seller Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your clearance stock listings.
                        </p>
                    </div>
                    <button className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700">
                        Add Listing
                    </button>
                </div>
                {/*STATS*/}
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <p className="text-gray-500">
                            Active Listings
                        </p>
                        <h2 className="text-4xl font-bold mt-2">
                            12
                        </h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <p className="text-gray-500">
                            Reserved Items
                        </p>
                        <h2 className="text-4xl font-bold mt-2">
                            8
                        </h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <p className="text-gray-500">
                            Expired Listings
                        </p>
                        <h2 className="text-4xl font-bold mt-2">
                            3
                        </h2>
                    </div>
                </div>
                {/*UPLOAD FORM*/}
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-10">
                    <h2 className="text-2xl font-bold mb-6">
                        Upload Clearance Item
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                        type="text"
                        placeholder="Product Name"
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="date"
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="number"
                        placeholder="Original Price"
                        className="border rounded-xl px-4 py-3" />
                        <input 
                        type="number"
                        placeholder="Discounted Price"
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="number"
                        placeholder="Quantity"
                        className="border rounded-xl px-4 py-3" />
                    </div>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-green-700">
                        Publish Listing
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SellerDashboard;