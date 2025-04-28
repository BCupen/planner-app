import { PageHeader } from "../components/PageHeader";
import { useState } from "react";
import { useLoginUserMutation } from "../data/api/userApiSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../data/hooks";
import { setUser } from "../data/userSlice";
import { InputFieldState } from "../data/types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<InputFieldState>({
    value: "",
    hasError: false,
    errorMessage: "",
  });
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loginUser] = useLoginUserMutation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isButtonDisabled =
    email.value.length === 0 ||
    passwordValue.length === 0 ||
    !validateEmail(email.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    try {
      const response = await loginUser({
        email: email.value,
        password: passwordValue,
      }).unwrap();
      console.log("Login successful:", response);
      dispatch(setUser({ name: response.name, email: response.email }));
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="w-full flex flex-col items-center gap-5 bg-background p-6 md:mt-4">
      <div className="w-full md:w-1/2 lg:w-1/3 border border-subtle bg-sidebar rounded-md px-4 py-6">
        <PageHeader
          title="Looks like you aren't logged in"
          subText="Log in now to organize your tasks"
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="emailInput" className="text-text-1">
              Email:
            </label>
            <input
              type="text"
              id="emailInput"
              value={email.value}
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
              onBlur={() => {
                if (!validateEmail(email.value)) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "Please enter a valid email address",
                  });
                } else if (email.value.length === 0) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "Email cannot be empty",
                  });
                } else {
                  setEmail({ ...email, hasError: false, errorMessage: "" });
                }
              }}
              className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
            />
            {email.hasError && (
              <p className="text-red-500 text-sm">{email.errorMessage}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="passwordInput" className="text-text-1">
              Password:
            </label>
            <span className="flex gap-2 ">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                id="passwordInput"
                className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
              />
              <button
                type="button"
                className="underline text-subtle text-sm hover:text-primary transition-all duration-100"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                Show
              </button>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full shadow rounded-md py-2 flex justify-center items-center gap-2 bg-primary border border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100 disabled:bg-subtle disabled:text-background disabled:border-subtle disabled:cursor-not-allowed"
            >
              Log in
            </button>
            <span className="flex items-center gap-2">
              <p className="text-text-2">Don't have an account?</p>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="underline text-primary text-sm transition-all duration-100 hover:text-text-1"
              >
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
