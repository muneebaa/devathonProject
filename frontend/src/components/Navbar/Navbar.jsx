import { Link } from "react-router-dom";
import Logo from "../../assets/LogoLight.png";

const Navbar = () => {
  return (
    <div className="bg-primary flex items-center justify-between p-4">
      <div style={{ width: "50%" }}>
        <div
          className="flex flex-row items-center"
          style={{ width: "fit-content" }}
        >
          <img
            src={Logo}
            height={70}
            width={70}
            style={{ borderRadius: "50%" }}
            alt="Logo"
          />
          <p className="text-white font-medium text-xl ml-2">Health App</p>
        </div>
      </div>
      <div className="flex justify-between" style={{ width: "20%" }}>
        <Link to={"/"} className="text-white hover:underline hover:text-white">
          <p>Home</p>
        </Link>
        <Link
          to={"/appointments"}
          className="text-white hover:underline hover:text-white"
        >
          <p>Appointments</p>
        </Link>
        <p className="text-white  hover:text-white cursor-pointer">Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
