import { useEffect, useState } from "react";
import Header from "./Header";

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const Cart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const changeQty = (id: number, qty: number) => {
        if (qty <= 0) {
            removeItem(id);
            return;
        }

        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Header onSelectCategory={() => { }} />

            <div className="max-w-5xl mx-auto px-6 lg:px-16 py-12">
                <h1 className="font-serif text-4xl font-light text-[#1C1510] mb-2">
                    Корзина
                </h1>
                <div className="w-10 h-0.5 bg-[#C49A6C] mb-10" />

                {cart.length === 0 ? (
                    <div className="bg-white border border-[#D9CEBC] rounded-xl p-10 text-center shadow-sm">
                        <p className="font-serif text-2xl font-light text-[#1C1510] mb-2">
                            Корзина пустая
                        </p>
                        <p className="text-[#8C7E6A] text-sm">
                            Добавьте товары из каталога
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LIST */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-[#D9CEBC] rounded-xl p-5 shadow-sm flex gap-5"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-28 h-24 object-cover rounded-lg border border-[#D9CEBC]"
                                    />

                                    <div className="flex-1">
                                        <h2 className="font-serif text-lg font-light text-[#1C1510]">
                                            {item.name}
                                        </h2>

                                        <p className="text-[#8C7E6A] text-sm mt-1">
                                            {item.price.toLocaleString()} ₸ / шт.
                                        </p>

                                        <div className="flex items-center gap-3 mt-4">
                                            <button
                                                onClick={() => changeQty(item.id, item.quantity - 1)}
                                                className="w-9 h-9 border border-[#D9CEBC] rounded hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition"
                                            >
                                                -
                                            </button>

                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    changeQty(item.id, Number(e.target.value))
                                                }
                                                className="w-14 text-center bg-[#F5F0E8] border border-[#D9CEBC] rounded py-2 outline-none focus:border-[#C49A6C]"
                                            />

                                            <button
                                                onClick={() => changeQty(item.id, item.quantity + 1)}
                                                className="w-9 h-9 border border-[#D9CEBC] rounded hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition"
                                            >
                                                +
                                            </button>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="ml-auto text-xs font-medium tracking-[0.12em] uppercase text-red-400 hover:text-red-600 transition"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end">
                                        <p className="font-serif text-lg text-[#1C1510]">
                                            {(item.price * item.quantity).toLocaleString()} ₸
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="bg-white border border-[#D9CEBC] rounded-xl p-6 shadow-sm h-fit">
                            <h2 className="font-serif text-2xl font-light text-[#1C1510] mb-4">
                                Итог
                            </h2>

                            <div className="flex justify-between text-sm text-[#8C7E6A] mb-2">
                                <span>Товаров:</span>
                                <span>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
                            </div>

                            <div className="flex justify-between text-sm text-[#8C7E6A] mb-4">
                                <span>Сумма:</span>
                                <span>{total.toLocaleString()} ₸</span>
                            </div>

                            <div className="border-t border-[#D9CEBC] pt-4 flex justify-between items-center mb-6">
                                <span className="text-sm text-[#8C7E6A]">Итого:</span>
                                <span className="font-serif text-2xl text-[#1C1510]">
                                    {total.toLocaleString()} ₸
                                </span>
                            </div>

                            <button className="w-full bg-[#8B5E3C] hover:bg-[#1C1510] text-white text-xs font-medium tracking-[0.12em] uppercase py-4 rounded transition">
                                Оформить заказ
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full mt-3 border border-[#D9CEBC] text-[#8C7E6A] hover:border-red-300 hover:text-red-500 text-xs font-medium tracking-[0.12em] uppercase py-4 rounded transition"
                            >
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;