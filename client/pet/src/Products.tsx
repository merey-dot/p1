import { useState, useEffect } from 'react'

interface Props {
    categoryId: number | null
    favorites: number[]
    toggleFavorite: (id: number) => void
}

interface Product {
    id: number
    name: string
    description: string
    price: number
    stock: number
    image: string
    categoryId: number
}

const Products: React.FC<Props> = ({ categoryId, favorites, toggleFavorite }) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getAll = async () => {
            const res = await fetch('http://localhost:5000/products/get')
            const data = await res.json() as Product[]
            setProducts(data)
        }
        getAll()
    }, [])

    const filteredProducts = categoryId === null
        ? products
        : products.filter(p => p.categoryId === categoryId)

    // Загрузка
    if (!products.length) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-[#D9CEBC] rounded-xl overflow-hidden animate-pulse">
                    <div className="bg-[#EDE6D8] aspect-[4/3]" />
                    <div className="p-5 space-y-3">
                        <div className="h-3 bg-[#EDE6D8] rounded w-1/3" />
                        <div className="h-5 bg-[#EDE6D8] rounded w-3/4" />
                        <div className="h-3 bg-[#EDE6D8] rounded w-full" />
                        <div className="h-3 bg-[#EDE6D8] rounded w-2/3" />
                        <div className="flex justify-between items-center pt-2">
                            <div className="h-6 bg-[#EDE6D8] rounded w-1/3" />
                            <div className="h-9 bg-[#EDE6D8] rounded w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    // Пусто
    if (filteredProducts.length === 0) return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg className="w-16 h-16 text-[#D9CEBC] mb-6" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="16" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 16v-4a8 8 0 0 1 16 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="24" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="font-serif text-2xl font-light text-[#1C1510] mb-2">Товаров не найдено</p>
            <p className="text-[#8C7E6A] text-sm">Попробуйте выбрать другую категорию</p>
        </div>
    )
    const addToCart = (item: Product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')

        const found = cart.find((p: any) => p.id === item.id)

        if (found) {
            found.quantity += 1
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(item => (
                <div
                    key={item.id}
                    className="bg-white border border-[#D9CEBC] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                    {/* Фото */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Кнопка избранного */}
                        <button
                            onClick={() => toggleFavorite(item.id)}
                            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                            aria-label={favorites.includes(item.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                        >
                            <svg
                                className="w-4 h-4 transition-colors duration-200"
                                viewBox="0 0 20 20"
                                fill={favorites.includes(item.id) ? '#8B5E3C' : 'none'}
                                stroke="#8B5E3C"
                                strokeWidth="1.5"
                            >
                                <path d="M10 17s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.5-7 9-7 9z" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Бейдж остатка */}
                        {item.stock <= 3 && item.stock > 0 && (
                            <span className="absolute top-3 left-3 bg-[#1C1510] text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded">
                                Осталось {item.stock} шт.
                            </span>
                        )}
                        {item.stock === 0 && (
                            <span className="absolute top-3 left-3 bg-[#8C7E6A] text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded">
                                Нет в наличии
                            </span>
                        )}
                    </div>

                    {/* Контент */}
                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-serif text-lg font-light text-[#1C1510] leading-snug mb-1.5">
                            {item.name}
                        </h3>
                        <p className="text-[#8C7E6A] text-sm leading-relaxed line-clamp-2 flex-1">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#D9CEBC]/60">
                            <p className="font-serif text-xl text-[#1C1510]">
                                {item.price.toLocaleString()} ₸
                            </p>
                            <button
                                onClick={() => addToCart(item)}
                                disabled={item.stock === 0}
                                className="bg-[#8B5E3C] hover:bg-[#1C1510] disabled:bg-[#D9CEBC] disabled:cursor-not-allowed text-white text-xs font-medium tracking-[0.12em] uppercase px-4 py-2.5 rounded transition-all duration-200 hover:-translate-y-px hover:shadow-md disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products
