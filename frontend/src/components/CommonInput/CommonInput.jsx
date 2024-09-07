const CommonInput = ({ value, onChange, placeholder, error, name, type }) => {
  return (
    <div>
      <input
        className={`border p-3 rounded-lg w-full outline-none mt-3 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CommonInput;
