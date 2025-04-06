import { useNavigate } from "react-router-dom";

const FloatingUserWidget = () => {
  const username = localStorage.getItem("username") || "User";
  const initials = username
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
   
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
  <div className=" flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full shadow-md backdrop-blur-lg" >
    <span className="bg-green-600 text-white font-bold px-3 py-1 rounded-full text-sm">
      {initials}
    </span>
    <span className="text-white text-sm font-medium  ">
      {username}
    </span>
  </div>
  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition"
  >
    Logout
  </button>
</div>

  );
};

export default FloatingUserWidget;
