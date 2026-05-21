import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            <Header onSelectCategory={() => { }} />

            <div className="max-w-2xl mx-auto px-6 py-10">
                <h1 className="text-3xl mb-6">Профиль</h1>

                <div className="bg-white p-6 rounded border">
                    <p>Имя: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>ID: {user.id}</p>
                    <p>Role: {user.role}</p>

                    <button
                        onClick={logout}
                        className="mt-4 bg-red-500 text-white px-4 py-2"
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;