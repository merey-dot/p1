import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    accessToken: string;
    user: any;
}

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("https://p1-abih.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError("Неверный email или пароль");
                return;
            }

            const data: LoginResponse = await res.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/");
        } catch {
            setError("Ошибка подключения к серверу");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-4">
            <div className="w-full max-w-sm bg-white border border-[#D9CEBC] rounded p-6">
                <h1 className="text-2xl font-semibold text-[#1C1510] mb-1">Вход</h1>
                <p className="text-sm text-[#8C7E6A] mb-6">Введите данные аккаунта</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#D9CEBC] rounded px-3 py-2 mb-3 outline-none"
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#D9CEBC] rounded px-3 py-2 mb-3 outline-none"
                />

                {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

                <button
                    onClick={login}
                    disabled={loading}
                    className="w-full bg-[#8B5E3C] text-white rounded py-2 hover:bg-[#1C1510] transition disabled:opacity-60"
                >
                    {loading ? "Входим..." : "Войти"}
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="w-full mt-3 border border-[#8B5E3C] text-[#8B5E3C] rounded py-2 hover:bg-[#8B5E3C] hover:text-white transition"
                >
                    Регистрация
                </button>
            </div>
        </div>
    );
};

export default Login;
