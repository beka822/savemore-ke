import { Navigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
export default function AdminRoute({
    children,
}){
    const [loading,setLoading]=useState(true);
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(()=>{
        checkAdmin();
    },[]);
    const checkAdmin=async()=>{
        const{
            data:{user},
        }=await supabase.auth.getUser();
        if(!user){
            setLoading(false);
            return;
        }
        const {data}=await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();
        if (data?.role==="admin"){
            setIsAdmin(true);
        }
        setLoading(false);
    };
    if(loading){
        return <p>Loading...</p>;
    }
    if(!isAdmin){
        return <Navigate to="/" />;
    }
    return children;
}