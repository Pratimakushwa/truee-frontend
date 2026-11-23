

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useServerTheme } from "./hooks/useServerTheme";

import Login from "./pages/Admin/Login";
import SetupPassword from "./pages/Admin/SetPassword";
import CompanyRegistration from "./pages/Admin/CompanyRegistration";
import CustomerRegister from "./pages/CustomerRegister";

import Header from "./pages/Home/Header1";
import Footer from "./pages/Home/Footer";
import ScrollToTop from "./components/ScrollTop";

import Home from "./pages/Home/Home";
import ShopHome from "./pages/Shop/ShopHome";
import NewCollection from "./pages/Shop/NewCollection";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BrandsSection from "./components/Brands";
import Wishlist from "./pages/Wishlist";

import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUS from "./pages/ContactUS";
import ShippingPolicy from "./pages/ShippingPolicy";
import Blog from "./pages/Blog";

import OrderSuccess from "./pages/orderSuccess";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrderDetails from "./components/OrderDetails";

import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminDashboard from "./pages/Admin/SuperAdminDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminManagement from "./pages/Admin/AdminManagement";
import CompanyProfileEdit from "./pages/Admin/CompanyProfileEdit";
import Analytics from "./pages/Admin/Analytics";
import ManageBlogs from "./pages/Admin/ManageBlogs";

import AdminLayout from "./layouts/AdminLayout";
import CouponManager from "./pages/Admin/CouponManager";
import AdminReviews from "./pages/Admin/AdminReviews";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminThemeManager from "./pages/Admin/AdminThemeManager";
import AdminProfile from "./pages/Admin/AdminProfile";
import RewardSettings from "./pages/Admin/RewardSettings";
import RewardAnalytics from "./pages/Admin/RewardAnalytics";
import ManagePolicies from "./pages/Admin/ManagePolicies";
import NewsletterSubscribers from "./pages/Admin/NewsletterSubscribers";
import SeoContentEditor from "./pages/Admin/SeoContentEditor";
const customerRoles = [
  "customer",
  "user",
  "admin",
  "super-admin",
];

const DIRECT_BLOG_PATH =
  "/blog/ai-gurukl-ai-learning-student-dashboard";

const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-[var(--theme-bg-light)] text-[var(--theme-text-main)] transition-colors duration-500">
    <Header />

    <main className="min-h-[calc(100vh-200px)]">
      {children}
    </main>

    <Footer />
  </div>
);

function App() {
  useServerTheme();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--theme-bg-light)] text-[var(--theme-text-main)] transition-colors duration-700 ease-in-out">
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* Auth and registration */}
            <Route
              path="/company/register"
              element={<CompanyRegistration />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<CustomerRegister />}
            />

            {/* Shop and discovery */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<NewCollection />} />
            <Route path="/products" element={<ShopHome />} />
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />

            <Route
              path="/brands"
              element={
                <PublicLayout>
                  <BrandsSection />
                </PublicLayout>
              }
            />

            {/* Information pages */}
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutUs />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PublicLayout>
                  <PrivacyPolicy />
                </PublicLayout>
              }
            />
            <Route
              path="/terms"
              element={
                <PublicLayout>
                  <Terms />
                </PublicLayout>
              }
            />
            <Route
              path="/refund-policy"
              element={
                <PublicLayout>
                  <RefundPolicy />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactUS />
                </PublicLayout>
              }
            />
            <Route
              path="/ShippingPolicy"
              element={
                <PublicLayout>
                  <ShippingPolicy />
                </PublicLayout>
              }
            />

            {/* Direct blog article */}
            <Route
              path="/blog"
              element={
                <Navigate to={DIRECT_BLOG_PATH} replace />
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <PublicLayout>
                  <Blog />
                </PublicLayout>
              }
            />

            {/* Cart and checkout */}
            <Route
              path="/cart"
              element={
                <PublicLayout>
                  <Cart standalone />
                </PublicLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <PublicLayout>
                  <Checkout />
                </PublicLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PublicLayout>
                  <Wishlist />
                </PublicLayout>
              }
            />

            {/* Customer protected pages */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={customerRoles}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/order/:id"
              element={
                <ProtectedRoute roles={customerRoles}>
                  <PublicLayout>
                    <OrderDetails />
                  </PublicLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={customerRoles}>
                  <PublicLayout>
                    <div className="p-10">My Orders</div>
                  </PublicLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute roles={customerRoles}>
                  <PublicLayout>
                    <OrderSuccess />
                  </PublicLayout>
                </ProtectedRoute>
              }
            />

            {/* Password setup */}
            <Route
              path="/update-password"
              element={
                <ProtectedRoute roles={["super-admin", "admin"]}>
                  <SetupPassword />
                </ProtectedRoute>
              }
            />

            {/* Super Admin */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute roles={["super-admin"]}>
                  <SuperAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={<SuperAdminDashboard />}
              />
              <Route
                path="manage-admins"
                element={<AdminManagement />}
              />
              <Route
                path="company-profile"
                element={<CompanyProfileEdit />}
              />
              <Route
  path="seo-content"
  element={<SeoContentEditor />}
/>
              <Route
                path="analytics"
                element={<Analytics />}
              />
              <Route
                path="blogs"
                element={<ManageBlogs />}
              />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route
                path="dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="coupons"
                element={<CouponManager />}
              />
              <Route
                path="profile"
                element={<AdminProfile />}
              />
              <Route
                path="products"
                element={<AdminProducts />}
              />
              <Route
                path="orders"
                element={<AdminOrders />}
              />
              <Route
                path="users"
                element={<AdminUsers />}
              />
              <Route
                path="theme"
                element={<AdminThemeManager />}
              />
              <Route
                path="rewards"
                element={<RewardAnalytics />}
              />
              <Route
                path="rewards/settings"
                element={<RewardSettings />}
              />
              <Route
                path="reviews"
                element={<AdminReviews />}
              />
              <Route
                path="legal-policies"
                element={<ManagePolicies />}
              />
              <Route
                path="Legal & Policies"
                element={<ManagePolicies />}
              />
              <Route
                path="newsletter"
                element={<NewsletterSubscribers />}
              />
            </Route>

            {/* Unauthorized */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg-dark)]">
                  <p className="font-serif text-xl text-[var(--theme-primary)] tracking-widest uppercase">
                    Access Denied
                  </p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;