import Navbar from "../components/Navbar";
import {useEffect,useState} from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
function LandingPage(){
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(()=>{
        checkAdminStatus();
    },[]);
    const checkAdminStatus=async()=>{
        const{
            data:{user},
        }=await supabase.auth.getUser();
        if(!user) return;
        const {data,error}=await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();
        if(error){
            console.log(error);
            return;
        }
        if(data.role==="admin"){
            setIsAdmin(true);
        }
    };
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
                        {
                            isAdmin && (
                                <Link to="/admin"
                                className="bg-black text-white px-6 py-3 rounded-xl">
                                    Admin Dashboard
                                </Link>
                            )
                        };
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