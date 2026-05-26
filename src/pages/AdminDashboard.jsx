import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
export default function AdminDasboard(){
    const [totalListings,setTotalListings]=useState(0);
    const [totalReservations,setTotalReservations]=useState(0);
    const [listings,setListings]=useState([]);
    const [reservations,setReservations]=useState([]);
    const [topProducts,setTopProducts]=useState([]);
    const [topLocations,setTopLocations]=useState([]);
    const [wasteRecovered,setWasteRecovered]=useState(0);
    useEffect(()=>{
        fetchAnalytics();
    },[]);
    const fetchAnalytics=async()=>{
        const{
            data:listingsData,
                }=await supabase
                .from("listings")
                .select("*");
                const{
                    data:reservationsData,
                }=await supabase
                .from("reservations")
                .select("*");
                setListings(listingsData || []);
                setReservations(reservationsData || []);
                setTotalListings(listingsData?.length || 0);
                setTotalReservations(reservationsData?.length || 0);
                calculateTopProducts(reservationsData || [], listingsData || []);
                calculateTopLocations(listingsData || []);
                calculateWasteRecovered(reservationsData || [],listingsData || []);
    };
    const calculateTopProducts=(
        reservationsData,listingsData
    )=>{
        const counts={};
        reservationsData.forEach((item)=>{
            counts[item.listing_id]=(counts[item.listing_id] || 0) + 1;
        });
        const sorted=Object.entries(counts)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,5);
        const mapped=sorted.map(
            ([listingId,count])=>{
                const listing=listingsData.find(
                    (l)=>l.id===listingId
                );
                return{
                    product:listing?.product_name,
                    reservations:count,
                };
            }
        );
        setTopProducts(mapped);
    };
    const calculateTopLocations=(
        listingsData
    )=>{
        const counts={};
        listingsData.forEach((item)=>{
            counts[item.location_name]=(counts[item.location_name] || 0) + 1;
        });
        const sorted=Object.entries(counts)
        .sort((a,b)=> b[1]-a[1])
        .slice(0,5);
        setTopLocations(sorted);
    };
    const calculateWasteRecovered=(
        reservationsData,listingsData
    )=>{
        let total=0;
        reservationsData.forEach((reservation)=>{
            const listing=listingsData.find(
                (l)=>l.id===reservation.listing_id
            );
            if(listing){
                total += listing.discounted_price * reservation.quantity;
            }
        });
        setWasteRecovered(total);
    };
    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-8">
                    Admin Dashboard
                </h1>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        Total Listings
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        {total}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        Total Reservations
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        {totalReservations}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">
                        Waste Recovered
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        KES {wasteRecovered}
                    </p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow mb-10">
                <h2 className="text-2xl font-bold mb-6">
                    Most Reserved Products
                </h2>
                <div className="space-y-4">
                    {topProducts.map((item,index)=>(
                        <div
                        key={index}
                        className="flex justify-between">
                            <p>{item.product}</p>
                            <p className="font-bold">
                                {item.reservations}
                                {""}reservations
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6">
                    Fastest-Selling Locations
                </h2>
                <div className="space-y-4">
                    {top.map(
                        ([location,count],index)=>(
                            <div
                            key={index}
                            className="flex justify-between">
                                <p>{location}</p>
                                <p className="font-bold">
                                    {count} listings
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}