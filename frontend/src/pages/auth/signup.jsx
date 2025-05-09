import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CommonForm from "@/components/common/form";
import { resigterFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/authSlice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  //referralCode: "",
};

const AuthSignup = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ State for error message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Helper function to check empty fields
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  function onSubmit(event) {
    event.preventDefault();

    // ✅ Clear previous error message
    setErrorMessage("");

    // ✅ Check if any field is empty
    if (!isFormValid()) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    if (/[^a-zA-Z0-9]/.test(formData.username)) {
    setErrorMessage("Username should not contain special characters.");
    return;
    }

    // ✅ Check for password mismatch
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!/^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
        setErrorMessage("Password must be at least 8 characters long and contain at least one number and one special character.");
        return;
    }

    // ✅ Validate email format
    if (!isValidEmail(formData.email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    console.log("Form Data:", formData);

    // ✅ Dispatch the registration action
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Sign Up Successful",
          description: "Welcome to the platform!",
          duration: 3000,
        });
        navigate("/shop/home");
      } else if (data?.payload?.message === "Username already exists") {
        setErrorMessage("Username already exists. Please choose another one.");
      } else if (data?.payload?.message === "Email already exists") {
        setErrorMessage("Email already in use. Please use a different email.");
      } else {
        console.log(data);
        setErrorMessage(data?.payload?.message || "Username or email already exists");
      }
    });
  }

  useEffect(() => {
    // ✅ Extract referral token from URL and set referral code
    const queryParams = new URLSearchParams(window.location.search);
    const referralToken = queryParams.get("referralToken");

    // ✅ Set referral code if present
    if (referralToken) {
      setFormData((prev) => ({ ...prev, referralCode: referralToken }));
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign Up
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      {/* ✅ Display error message in red */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <CommonForm
        formControls={resigterFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthSignup;
