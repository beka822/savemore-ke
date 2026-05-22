import Navbar from "../components/Navbar";
function LandingPage(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/*HERO SECTION*/}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold leading-tight">
                        Save Money on Everyday Essentials
                    </h1>
                    <p className="text-gray-600 mt-6 text-lg">
                        Discover discounted products near you.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100">
                            Sell Clearance Stock
                        </button>
                    </div>
                </div>
            </section>
            {/*HOW IT WORKS*/}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-10">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-semibold text-xl mb-2">
                            Upload
                        </h3>
                        <p className="text-gray-600">
                            Sellers upload discounted products.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-semibold text-xl mb-2">
                            Discover
                        </h3>
                        <p className="text-gray-600">
                            Buyers browse nearby discounted essentials.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-semibold text-xl mb-2">
                            Reserve
                        </h3>
                        <p className="text-gray-600">
                            Reserve products before they sell out.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-semibold text-xl mb-2">
                            Pick Up
                        </h3>
                        <p className="text-gray-600">
                            collect products from nearby sellers.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default LandingPage;