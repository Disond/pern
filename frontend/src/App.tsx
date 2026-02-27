import { Routes, Route } from "react-router";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserProfile } from "./components/UserProfile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/prodcut/:id" element={<ProductPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/edit/:id" element={<EditProductPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<div>Home</div>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
