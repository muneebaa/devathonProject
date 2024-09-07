import { useState } from "react";
import CommonButton from "../../components/CommonButton";
import CommonInput from "../../components/CommonInput";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/helper";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    type: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = null;
    if (name === "email" && !isValidEmail(value)) {
      error = "Please enter a valid email";
    } else if (name === "password" && !isValidPassword(value)) {
      error =
        "Password must be 8+ characters with uppercase, lowercase, number, and special character";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    setErrors((prevErrors) => ({ ...prevErrors, ...formErrors }));

    if (
      Object.keys(formErrors).length === 0 &&
      Object.keys(errors).length === 0
    ) {
      console.log(formData);
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.email && !errors.email) {
      formErrors.email = "Email is required";
    }

    if (!formData.type && !errors.type) {
      formErrors.type = "Please select a type";
    }

    if (!formData.password && !errors.password) {
      formErrors.password = "Password is required";
    }

    return formErrors;
  };

  return (
    <div className="flex flex-row justify-between">
      <div style={{ width: "50%", height: "100vh" }} className="">
        <div className="p-4" style={{ width: "fit-content" }}>
          <img src={Logo} height={100} width={100} alt="Logo" />
          <p className="text-center font-medium text-xl">Health App</p>
        </div>
        <div
          className="flex items-center justify-center "
          style={{ height: "75%" }}
        >
          <div style={{ width: "70%", margin: "0 auto" }} className="">
            <CommonInput
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
              error={errors.email}
            />

            <CommonInput
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type="password"
              error={errors.password}
            />

            <div>
              <select
                className={`border p-3 rounded-lg w-full outline-none mt-3 ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.type}
                name="type"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="photographer">Photographer</option>
                <option value="videographer">Videographer</option>
              </select>
              {errors.type && (
                <p className="text-red text-xs mt-1">{errors.type}</p>
              )}
            </div>
            <div className="mt-5">
              <CommonButton
                title={"Submit"}
                variant={"filled"}
                onClick={handleSubmit}
              />
            </div>
            <p className="text-gray600 mt-3 text-right">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-primary underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ width: "50%", height: "100vh" }}
        className="bg-primary"
      ></div>
    </div>
  );
};

export default Login;
