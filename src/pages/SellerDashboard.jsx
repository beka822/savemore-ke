import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function SellerDashboard(){
    const [productName,setProductName]=useState("");
    const [quantity,setQuantity]=useState("");
    const [originalPrice,setOriginalPrice]=useState("");
    const [discountedPrice,setDiscountedPrice]=useState("");
    const [expiryDate,setExpiryDate]=useState("");
    const [image,setImage]=useState(null);
    const [showUpload,setShowUpload]=useState(false);
    const [listings,setListings]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        fetchListings();
    },[]);
    const fetchListings=async ()=>{
        const{
            data:{user},
        }=await supabase.auth.getUser();
        if (!user) return;
        const {data,error}=await supabase
        .from("listings")
        .select("*")
        .eg("seller_id",user.id)
        .order("created_at",{
            ascending: false,
        });
        if (error){
            console.log(error);
            return;
        }
        setListings(data);
    };
    const getDaysLeft=(date)=>{
        const today=new Date();
        const expiry=new Date(date);
        const diffTime=expiry-today;
        return Math.ceil(
            diffTime/(1000 * 60 * 60 * 24)
        );
    };
    const handleUpload=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const{
                data:{user},
            }=await supabase.auth.getUser();
            if (!user){
                alert("Please login");
                return;
            }
            let imageUrl="";
            if (image){
                const fileName=`${Date.now()}-${image.name}`;
                const {error:uploadError}=await supabase.storage
                .from("product-images")
                .upload(fileName,image);
                if(uploadError){
                    console.log(uploadError);
                    alert("Image upload failed");
                    return;
                }
                const{data:publicUrlData}=supabase.storage
                .from("product-images")
                .getPublicUrl(fileName);
                imageUrl=publicUrlData.publicUrl;
            }
            const{error}=await supabase
            .from("listings")
            .insert([
                {
                    seller_id:user.id,
                    product_name:productName,
                    quantity:Number(quantity),
                    original_price:Number(originalPrice),
                    discounted_price:Number(discountedPrice),
                    expiry_date:expiryDate,
                    image_url:imageUrl,
                    status:"active",
                },
            ]);
            if(error){
                console.log(error);
                alert("Failed to upload");
                return;
            }
            alert("Listing uploaded");
            setProductName("");
            setQuantity("");
            setOriginalPrice("");
            setDiscountedPrice("");
            setExpiryDate("");
            setImage(null);
            fetchListings();
        } catch (err){
            console.log(err);
        } finally{
            setLoading(false);
        }
    };
    const deleteListing=async(id)=>{
        const confirmed=window.confirm("Delete this listing?");
        if(!confirmed) return;
        const {error}=await supabase
        .from("listings")
        .delete()
        .eq("id",id);
        if(error){
            console.log(error);
            return;
        }
        fetchListings();
    };
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
                    <button 
                    onClick={()=>setShowUpload(!showUpload)}
                    className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700">
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
                {showUpload &&(
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-10">
                    <h2 className="text-2xl font-bold mb-6">
                        Upload Clearance Item
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e)=>setProductName(e.target.value)}
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="date"
                        placeholder="Expiry Date"
                        value={expiryDate}
                        onChange={(e)=>setExpiryDate(e.target.value)}
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="number"
                        placeholder="Original Price"
                        value={originalPrice}
                        onChange={(e)=>setOriginalPrice(e.target.value)}
                        className="border rounded-xl px-4 py-3" />
                        <input 
                        type="number"
                        placeholder="Discounted Price"
                        value={discountedPrice}
                        onChange={(e)=>setDiscountedPrice(e.target.value)}
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        className="border rounded-xl px-4 py-3" />
                        <input
                        type="file"
                        onChange={(e)=>setImage(e.target.files[0])} 
                        className="border rounded-xl px-2 py-2 bg-green-600 hover:bg-green-700" />
                    </div>
                    <button
                    onClick={handleUpload}
                    disabled={loading}
                     className="bg-green-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-green-700">
                        {loading
                        ? "Uploading..."
                    : "Publish Listing"}
                    </button>
                </div>
                )}
                {/*RENDER SELLER LISTINGS*/}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">
                        My Listings
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {listings.map((item)=>{
                            const daysLeft=getDaysLeft(item.expiry_date);
                            return(
                                <div
                                key={item.id}
                                className="bg-white rounded-xl shadow overflow-hidden">
                                    <img
                                    src={item.image_url}
                                    alt={item.product_name}
                                    className="w-full h-48 object-cover"/>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold">
                                            {item.product_name}
                                        </h3>
                                        <p>
                                            Qty:{item.quantity}
                                        </p>
                                        <p className="line-through text-gray-400">
                                            KES {item.original_price}
                                        </p>
                                        <p className="text-green-600 font-bold">
                                            KES {item.discounted_price}
                                        </p>
                                        <p
                                        className={`font-semibold mt-2 ${daysLeft <= 1 ? "text-red-600" : daysLeft<=3 ? "text-orange-500" : "text-green-600"}`}>
                                            {daysLeft>0
                                            ? `${daysLeft} days left`
                                        : "Expired"}
                                        </p>
                                        <div className="flex gap-3 mt-4">
                                            <Link to={`/seller/edit/${item.id}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded">
                                                Edit
                                            </Link>
                                            <button
                                            onClick={()=>deleteListing(item.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SellerDashboard;