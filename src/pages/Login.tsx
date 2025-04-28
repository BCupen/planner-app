import { PageHeader } from "../components/PageHeader";
import { useState } from "react";
import { useLoginUserMutation } from "../data/api/userApiSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../data/hooks";
import { setUser } from "../data/userSlice";
import { InputFieldState } from "../data/types";
import { Toast } from "../components/toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<InputFieldState>({
    value: "",
    hasError: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState<InputFieldState>({
    value: "",
    hasError: false,
    errorMessage: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showToast, setShowToast] = useState(false);

  const [loginUser] = useLoginUserMutation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isButtonDisabled =
    email.value.length === 0 ||
    password.value.length === 0 ||
    !validateEmail(email.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    try {
      const response = await loginUser({
        email: email.value,
        password: password.value,
      }).unwrap();
      console.log("Login successful:", response);
      dispatch(setUser({ name: response.name, email: response.email }));
      navigate("/tasks", { replace: true });
    } catch (error) {
      setShowToast(true);
      if ((error as { status: number }).status === 401) {
        setErrorMessage("Invalid Credentials");
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <main className="w-full flex flex-col items-center gap-5 bg-background p-6 md:mt-4">
      <Toast
        title={errorMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="error"
      />
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
                if (email.value.length === 0) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "Email cannot be empty",
                  });
                } else if (!validateEmail(email.value)) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "Please enter a valid email address",
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
                value={password.value}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                onBlur={() => {
                  if (password.value.length === 0) {
                    setPassword({
                      ...password,
                      hasError: true,
                      errorMessage: "Password cannot be empty",
                    });
                  } else {
                    setPassword({
                      ...password,
                      hasError: false,
                      errorMessage: "",
                    });
                  }
                }}
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
            {password.hasError && (
              <p className="text-red-500 text-sm">{password.errorMessage}</p>
            )}
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
