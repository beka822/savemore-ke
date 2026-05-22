function ProductCard(){
    return(
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150"
            alt="product"
            className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-lg">
                    Brookside Milk 1L
                </h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-400 line-through">
                        KES 80
                    </span>
                    <span className="text-green-600 font-bold">
                        KES 50
                    </span>
                </div>
                <p className="text-orange-500 text-sm mt-2">
                    Expires in 2 days
                </p>
                <p className="text-gray-500 text-sm mt-1">
                    0.8km away
                </p>
                <button className="w-full bg-green-600 text-white py-3 rounded-xl mt-4 hover:bg-green-700">
                    Reserve
                </button>
            </div>
        </div>
    );
}
export default ProductCard;