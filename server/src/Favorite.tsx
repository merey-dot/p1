import Header from './Header'

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
}

interface FavoriteProps {
    products: Product[]
    favorites: number[]
    toggleFavorite: (id: number) => void
}

const Favorite: React.FC<FavoriteProps> = ({ products, favorites, toggleFavorite }) => {
    const favoriteProducts = products.filter(p => favorites.includes(p.id))

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Header onSelectCategory={() => { }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">

                {/* Заголовок */}
                <div className="mb-10">
                    <h1 className="font-serif text-4xl font-light text-[#1C1510] mb-2">Избранное</h1>
                    <div className="w-10 h-0.5 bg-[#C49A6C]" />
                    {favoriteProducts.length > 0 && (
                        <p className="text-[#8C7E6A] text-sm mt-3">
                            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'товар' : 'товара'}
                        </p>
                    )}
                </div>

                {/* Пустое состояние */}
                {favoriteProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <svg className="w-16 h-16 text-[#D9CEBC] mb-6" viewBox="0 0 48 48" fill="none">
                            <path d="M24 42S6 30 6 18a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 12-18 24-18 24z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <p className="font-serif text-2xl font-light text-[#1C1510] mb-2">Нет избранных товаров</p>
                        <p className="text-[#8C7E6A] text-sm">Добавляйте понравившиеся позиции из каталога</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProducts.map(item => (
                            <div
                                key={item.id}
                                className="bg-white border border-[#D9CEBC] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
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
                                        aria-label="Убрать из избранного"
                                    >
                                        <svg className="w-4 h-4 text-[#8B5E3C]" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 17s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.5-7 9-7 9z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Контент */}
                                <div className="p-5">
                                    <span className="inline-block bg-[#8B5E3C]/10 text-[#8B5E3C] text-[10px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded mb-3">
                                        Мебель
                                    </span>
                                    <h3 className="font-serif text-xl font-light text-[#1C1510] mb-1.5 leading-snug">
                                        {item.name}
                                    </h3>
                                    <p className="text-[#8C7E6A] text-sm leading-relaxed line-clamp-2 mb-4">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-[#D9CEBC]/60">
                                        <p className="font-serif text-xl text-[#1C1510]">
                                            {item.price.toLocaleString()} ₸
                                        </p>
                                        <button className="bg-[#8B5E3C] hover:bg-[#1C1510] text-white text-xs font-medium tracking-[0.12em] uppercase px-4 py-2.5 rounded transition-all duration-200 hover:-translate-y-px hover:shadow-md">
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorite
