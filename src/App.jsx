import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BuyerHomePage from "./pages/BuyerHomePage";
import SellerDashboard from "./pages/SellerDashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDasboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
function App(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/buyer" element={<BuyerHomePage />} />
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/admin" 
      element={
      <AdminRoute>
        <AdminDasboard />
      </AdminRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
export default App;