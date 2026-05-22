import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    category: string;
}

interface HeaderProps {
    onSelectCategory: (id: number | null) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isLogged = Boolean(localStorage.getItem("accessToken"));
    const catalogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://p1-abih.onrender.com/api/category/get");
                const data: Category[] = await res.json();
                setCategories(data);
            } catch (err) {
                console.log("Ошибка загрузки категорий:", err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
                setCatalogOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategorySelect = (id: number | null) => {
        onSelectCategory(id);
        setCatalogOpen(false);
        setMobileOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-[#F5F0E8] border-b border-[#D9CEBC]">
            <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <span className="font-serif text-xl font-semibold tracking-[0.18em] text-[#1C1510]">
                        MADERA
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-4">

                    {/* Catalog */}
                    <div className="relative" ref={catalogRef}>
                        <button
                            onClick={() => setCatalogOpen((p) => !p)}
                            className="text-sm px-4 py-2 rounded hover:bg-[#8B5E3C]/10 transition"
                        >
                            Каталог
                        </button>

                        {catalogOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#D9CEBC] rounded shadow-lg overflow-hidden">
                                <button
                                    onClick={() => handleCategorySelect(null)}
                                    className="block w-full text-left px-4 py-3 text-sm hover:bg-[#F5F0E8]"
                                >
                                    Все товары
                                </button>

                                {categories.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleCategorySelect(item.id)}
                                        className="block w-full text-left px-4 py-3 text-sm hover:bg-[#F5F0E8]"
                                    >
                                        {item.category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate("/favorites")}
                        className="text-sm px-4 py-2 rounded hover:bg-[#8B5E3C]/10 transition"
                    >
                        Избранное
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="text-sm px-4 py-2 rounded hover:bg-[#8B5E3C]/10 transition"
                    >
                        Корзина
                    </button>
                </nav>

                {/* Right Button */}
                <div className="hidden md:block">
                    {isLogged ? (
                        <button
                            onClick={() => navigate("/profile")}
                            className="bg-[#8B5E3C] text-white px-5 py-2 rounded hover:bg-[#1C1510] transition"
                        >
                            Профиль
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="border border-[#8B5E3C] text-[#8B5E3C] px-5 py-2 rounded hover:bg-[#8B5E3C] hover:text-white transition"
                        >
                            Войти
                        </button>
                    )}
                </div>

                {/* Burger */}
                <button
                    className="md:hidden text-sm px-3 py-2 border rounded"
                    onClick={() => setMobileOpen((p) => !p)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden px-6 py-4 bg-[#FDFAF4] border-t border-[#D9CEBC] flex flex-col gap-2">
                    <button
                        onClick={() => setCatalogOpen((p) => !p)}
                        className="text-left py-2"
                    >
                        Каталог
                    </button>

                    {catalogOpen && (
                        <div className="pl-4 flex flex-col gap-1">
                            <button
                                onClick={() => handleCategorySelect(null)}
                                className="text-left py-1 text-sm text-[#8C7E6A]"
                            >
                                Все товары
                            </button>

                            {categories.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleCategorySelect(item.id)}
                                    className="text-left py-1 text-sm text-[#8C7E6A]"
                                >
                                    {item.category}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            navigate("/favorites");
                            setMobileOpen(false);
                        }}
                        className="text-left py-2"
                    >
                        Избранное
                    </button>

                    <button
                        onClick={() => {
                            navigate("/cart");
                            setMobileOpen(false);
                        }}
                        className="text-left py-2"
                    >
                        Корзина
                    </button>

                    {isLogged ? (
                        <button
                            onClick={() => {
                                navigate("/profile");
                                setMobileOpen(false);
                            }}
                            className="bg-[#8B5E3C] text-white py-2 rounded mt-2"
                        >
                            Профиль
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate("/login");
                                setMobileOpen(false);
                            }}
                            className="border border-[#8B5E3C] text-[#8B5E3C] py-2 rounded mt-2"
                        >
                            Войти
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;