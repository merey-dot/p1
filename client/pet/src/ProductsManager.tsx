import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category_id: number;
}

const emptyProduct: Partial<Product> = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    category_id: 0,
};

const ProductsManager = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<Product>>(emptyProduct);
    const [addForm, setAddForm] = useState<Partial<Product>>(emptyProduct);
    const [showAdd, setShowAdd] = useState(false);

    const token = localStorage.getItem("accessToken");

    const fetchProducts = async () => {
        if (!token) return;

        const res = await fetch("https://p1-abih.onrender.com/admin/get", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const handleDelete = async (id: number) => {
        await fetch(`https://p1-abih.onrender.com/admin/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleSaveEdit = async (id: number) => {
        await fetch(`https://p1-abih.onrender.com/admin/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        setEditingId(null);
        fetchProducts();
    };

    const handleAdd = async () => {
        await fetch("https://p1-abih.onrender.com/admin/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addForm),
        });

        setAddForm(emptyProduct);
        setShowAdd(false);
        fetchProducts();
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="space-y-4">

            {/* ADD */}
            <button
                onClick={() => setShowAdd((p) => !p)}
                className="bg-[#8B5E3C] text-white px-4 py-2 rounded"
            >
                {showAdd ? "Отмена" : "Добавить товар"}
            </button>

            {showAdd && (
                <div className="border p-4 rounded space-y-2 bg-white">
                    <input placeholder="Название" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />

                    <input placeholder="Описание" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />

                    <input type="number" placeholder="Цена" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, price: +e.target.value })} />

                    <input type="number" placeholder="Склад" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, stock: +e.target.value })} />

                    <input placeholder="Картинка (URL)" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, image: e.target.value })} />

                    <input type="number" placeholder="Категория ID" className="border p-2 w-full"
                        onChange={(e) => setAddForm({ ...addForm, category_id: +e.target.value })} />

                    <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
                        Создать
                    </button>
                </div>
            )}

            {/* LIST */}
            <div className="grid gap-3">
                {products.map((p) => (
                    <div key={p.id} className="border p-3 rounded bg-white">

                        {editingId === p.id ? (
                            <div className="space-y-2">

                                <input defaultValue={p.name} className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })} />

                                <input defaultValue={p.description} className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, description: e.target.value })} />

                                <input defaultValue={p.price} type="number" className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, price: +e.target.value })} />

                                <input defaultValue={p.stock} type="number" className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, stock: +e.target.value })} />

                                <input defaultValue={p.image} className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, image: e.target.value })} />

                                <input defaultValue={p.category_id} type="number" className="border p-2 w-full"
                                    onChange={(e) => setForm({ ...form, category_id: +e.target.value })} />

                                <button
                                    onClick={() => handleSaveEdit(p.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Сохранить
                                </button>

                                <button onClick={() => setEditingId(null)} className="ml-2 text-gray-500">
                                    Отмена
                                </button>
                            </div>
                        ) : (
                            <div className="text-sm space-y-1">

                                <p><b>ID:</b> {p.id}</p>
                                <p><b>Название:</b> {p.name}</p>
                                <p><b>Описание:</b> {p.description}</p>
                                <p><b>Цена:</b> {p.price}</p>
                                <p><b>Склад:</b> {p.stock}</p>
                                <p><b>Категория:</b> {p.category_id}</p>

                                <img src={p.image} className="w-32 h-20 object-cover" />

                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => { setEditingId(p.id); setForm(p); }} className="text-blue-600">
                                        Изменить
                                    </button>

                                    <button onClick={() => handleDelete(p.id)} className="text-red-500">
                                        Удалить
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsManager;