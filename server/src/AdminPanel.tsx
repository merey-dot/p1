import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsManager from "./ProductsManager";
import UsersManager from "./UsersManager";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<"products" | "users">("products");

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8] p-6">
            <div className="max-w-6xl mx-auto bg-white border border-[#D9CEBC] rounded p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#1C1510]">Админ панель</h1>

                    <button
                        onClick={logout}
                        className="border border-[#8B5E3C] text-[#8B5E3C] px-4 py-2 rounded hover:bg-[#8B5E3C] hover:text-white transition"
                    >
                        Выйти
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setTab("products")}
                        className={`px-4 py-2 rounded transition ${tab === "products"
                                ? "bg-[#8B5E3C] text-white"
                                : "bg-[#F5F0E8] text-[#1C1510]"
                            }`}
                    >
                        Товары
                    </button>

                    <button
                        onClick={() => setTab("users")}
                        className={`px-4 py-2 rounded transition ${tab === "users"
                                ? "bg-[#8B5E3C] text-white"
                                : "bg-[#F5F0E8] text-[#1C1510]"
                            }`}
                    >
                        Пользователи
                    </button>
                </div>

                {/* Content */}
                {tab === "products" ? <ProductsManager /> : <UsersManager />}
            </div>
        </div>
    );
};

export default AdminPanel;