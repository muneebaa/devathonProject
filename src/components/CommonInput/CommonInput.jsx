const CommonInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="border border-gray-300 p-3 rounded-lg w-full outline-none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CommonInput;
