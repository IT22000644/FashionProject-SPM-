import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, clearNotifications } from "@/redux/authSlice";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);

    dispatch(loginUser(formData))
      .then((result) => {
        if (result.type === "auth/login/fulfilled") {
          const userData = result.payload.user;
          if (
            userData &&
            userData.notifications &&
            userData.notifications.length > 0
          ) {
            userData.notifications.forEach((notification) => {
              toast.info(notification); // Show toast notification
            });

            // Clear notifications from backend
            if (userData.email) {
              dispatch(clearNotifications(userData.email))
                .then((clearResult) => {
                  clearResult.type === "auth/clearNotifications/fulfilled";
                })
                .catch(() => {
                  toast.error("Failed to clear notifications");
                });
            }
          }
        } else {
          // Handle login errors if any
          toast.error("Login failed");
        }
      })
      .catch(() => {
        toast.error("Login failed");
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back!
        </h1>
        <p className="mt-2">
          Do not have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Log In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
