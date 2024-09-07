const CommonButton = ({ title, onClick, variant }) => {
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
        {title}
      </p>
    </div>
  );
};

export default CommonButton;
