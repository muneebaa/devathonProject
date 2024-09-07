import { FadeLoader } from "react-spinners";
const CommonButton = ({ title, onClick, variant, loading }) => {
  return (
    <div
      onClick={onClick}
      className={` border  p-3 rounded-lg w-full outline-none cursor-pointer ${
        variant === "filled"
          ? "bg-primary border-primary"
          : "bg-white border-primary"
      }`}
    >
      <p
        className={`text-primary text-center ${
          variant === "filled" ? "text-white" : "text-primary"
        }`}
      >
        {loading ? "Loading..." : title}
      </p>
    </div>
  );
};

export default CommonButton;
