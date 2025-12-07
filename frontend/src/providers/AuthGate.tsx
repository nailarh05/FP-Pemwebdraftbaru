import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { setToken, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, skipping auth check");
      setLoading(false);
      return;
    }

    setToken(token);

    api
      .get("/api/auth/me")
      .then((res) => {
        console.log("Auth check success:", res.data);
        setUser(res.data.data); // sesuaikan struktur backend
      })
      .catch((err) => {
        console.error("Auth check failed:", err.message);
        setError(err.message);
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("AuthGate Error:", error);
  }

  return <>{children}</>;
}
