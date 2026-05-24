import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
function BuyerHomePage(){
    const [listings,setListings]=useState([]);
    const [filteredListings,setFilteredListings]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetchListings();
    },[]);
    const fetchListings=async()=>{
        setLoading(true);
        const {data,error}=await supabase
        .from("listings")
        .select("*")
        .eq("status","active")
        .order("created_at",{
            ascending:false,
        });
        if(error){
            console.log(error);
            return;
        }
        setListings(data);
        setFilteredListings(data);
        setLoading(false);
    };
    const getDaysLeft=(date)=>{
        const today=new Date();
        const expiry=new Date(date);
        const diffTime=expiry - today;
        return Math.ceil(
            diffTime/(1000 * 60 * 60 * 24)
        );
    };
    const getDiscountPercent=(
        original,
        discounted
    )=>{
        return Math.round(
            ((original-discounted)/original)*100
        );
    };
    const handleSearch=(e)=>{
        const value = e.target.value;
        setSearchTerm(value);
        const filtered=listings.filter((item)=>
        item.product_name
    .toLowerCase()
.includes(value.toLowerCase()));
    };
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
                    value={searchTerm}
                    onChange={handleSearch}
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
                    {filteredListings.map((item)=>{
                        const daysLeft=getDaysLeft(item.expiry_date);
                        const discount=getDiscountPercent(item.original_price,item.discounted_price);
                        return(
                            <div
                            key={item.id}
                            className="bg-white rounded-xl shadow overflow-hidden">
                                <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-full h-52 object-cover"/>
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold">
                                            {item.product_name}
                                        </h2>
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                                            {discount}% OFF
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="line-through text-gray-400">
                                        KES {item.original_price}
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        KES {item.discounted_price}
                                    </p>
                                    <p className={`mt-3 font-semibold ${
                                        daysLeft <= 1
                                        ? "text-red-600"
                                        : daysLeft <= 3
                                        ? "text-orange-500"
                                        : "text-green-600"
                                    }`}>
                                        {daysLeft > 0
                                        ? `${daysLeft} days left`
                                    : "Expired"}
                                    </p>
                                    <button className="mt-4 bg-green-600 text-white px-4 py-3 rounded-xl w-full">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {filteredListings.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold">
                            No products found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Try another search term
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default BuyerHomePage;