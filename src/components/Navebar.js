import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navebar = () => {
  const { user } = useAuthContext();
  const { logOut } = useLogout();

  const logoutHandeler = () => {
    logOut();
  };

  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-b-sky-900">
      <Link to="/" className="logo text-2xl font-medium text-sky-400">
        Proxima
      </Link>

      <nav>
        {!user && (
          <div className="flex gap-5">
            <Link
              to="/login"
              className="hover:text-sky-400 duration-300 text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-sky-400 duration-300 text-gray-300"
            >
              Signup
            </Link>
          </div>
        )}

        {user && (
          <div className="flex gap-6 items-center">
            <span className="text-[1.2rem] tracking-widest font-semibold text-gray-400 uppercase cursor-pointer hover:text-sky-300 duration-300">
              {`  ${user.name} `}
            </span>
            <span className="cursor-pointer font-bold text-gray-400 text-[1.2rem] hover:text-sky-300 duration-300">
              |
            </span>
            <button
              onClick={logoutHandeler}
              className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navebar;
