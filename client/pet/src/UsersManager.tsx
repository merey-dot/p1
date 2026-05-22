import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    banned: boolean;
}

const UsersManager = () => {
    const token = localStorage.getItem("accessToken");

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!token) return;

            const res = await fetch("https://p1-abih.onrender.com/api/admin/getUsers", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) return;

            const data: User[] = await res.json();
            setUsers(data);
            setLoading(false);
        };

        load();
    }, []);

    const toggleBan = async (id: number) => {
        if (!token) return;

        await fetch(`https://p1-abih.onrender.com/api/admin/banUser/${id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        });

        setUsers((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, banned: !u.banned } : u
            )
        );
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Пользователи</h2>

            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b">
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b">
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.banned ? "banned" : "active"}</td>
                            <td className="text-right">
                                <button
                                    onClick={() => toggleBan(u.id)}
                                    className="text-blue-600"
                                >
                                    {u.banned ? "unban" : "ban"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManager;