import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if(logout){
        await logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-pink-600">Dashboard</h1>
        
        <div className="mb-8 rounded-md bg-pink-50 p-4">
          <h2 className="mb-2 text-xl font-semibold text-pink-700">Welcome!</h2>
          <p className="text-gray-700">
            You are logged in as:{" "}
            <span className="font-medium text-pink-600">
              {user?.email}
            </span>
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <button 
            onClick={handleLogout}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}