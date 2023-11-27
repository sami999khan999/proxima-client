import { Link } from "react-router-dom";

const Navebar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-b-sky-900">
      <Link to="/" className="logo text-2xl font-medium text-sky-400">
        Proxima
      </Link>
    </div>
  );
};

export default Navebar;
