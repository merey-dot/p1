import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Products from "./Products";

interface HomeProps {
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

const Home = ({ favorites, toggleFavorite }: HomeProps) => {
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role === "ADMIN") navigate("/admin");
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Header onSelectCategory={setSelectedCategoryId} />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
                <h1 className="font-serif text-5xl text-[#1C1510] mb-4">
                    Мебель, которая остаётся
                </h1>

                <p className="text-[#8C7E6A] max-w-md mb-6">
                    Натуральное дерево, скандинавский стиль и качественная сборка.
                </p>

                {/* <button
                    onClick={() => setSelectedCategoryId(null)}
                    className="bg-[#8B5E3C] text-white px-6 py-3 rounded hover:bg-[#1C1510] transition"
                >
                    Смотреть каталог
                </button> */}
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <h2 className="font-serif text-3xl text-[#1C1510] mb-6">Каталог</h2>

                <Products
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    categoryId={selectedCategoryId}
                />
            </section>
        </div>
    );
};

export default Home;
