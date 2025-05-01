import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { InputFieldState } from "../data/types";
import { useRegisterUserMutation } from "../data/api/userApiSlice";
import { useAppDispatch } from "../data/hooks";
import { setUser } from "../data/userSlice";
import { Toast } from "../components/toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registerUser, { isError }] = useRegisterUserMutation();

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
  const [confirmPassword, setConfirmPassword] = useState<InputFieldState>({
    value: "",
    hasError: false,
    errorMessage: "",
  });
  const [name, setName] = useState<InputFieldState>({
    value: "",
    hasError: false,
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const isButtonDisabled =
    name.hasError ||
    email.hasError ||
    password.hasError ||
    confirmPassword.hasError ||
    !name.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value;

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    try {
      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      const response = await registerUser(userData).unwrap();
      dispatch(
        setUser({
          name: response.name,
          email: response.email,
        })
      );
      if (response) {
        navigate("/tasks", { replace: true });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const status = (error as { status: number }).status; // Narrowing the type
        if (status === 400) {
          setEmail({
            ...email,
            hasError: true,
            errorMessage: "Email already exists",
          });
        }
      } else {
        setEmail({
          ...email,
          hasError: true,
          errorMessage: "An unexpected error occurred",
        });
      }
    }
  };

  useEffect(() => {
    if (isError) {
      setShowToast(true);
    }
  }, [isError]);

  return (
    <main className="w-full flex flex-col items-center gap-5 bg-background p-6">
      <Toast
        title="An error occurred"
        description="Please try again later"
        show={showToast}
        onClose={() => setShowToast(false)}
        type="error"
      />
      <div className="w-full md:w-1/2 lg:w-1/3 border border-subtle bg-sidebar rounded-md px-4 py-6">
        <PageHeader
          title="Let's get you signed up"
          subText="Create an account to organize your tasks"
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nameInput" className="text-text-1">
              Name:
            </label>
            <input
              type="text"
              id="nameInput"
              value={name.value}
              onBlur={() => {
                if (name.value.length === 0) {
                  setName({
                    ...name,
                    hasError: true,
                    errorMessage: "This is a required field",
                  });
                } else if (!validateName(name.value)) {
                  setName({
                    ...name,
                    hasError: true,
                    errorMessage: "Invalid name format",
                  });
                } else {
                  setName({
                    ...name,
                    hasError: false,
                    errorMessage: "",
                  });
                }
              }}
              onChange={(e) => setName({ ...name, value: e.target.value })}
              className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
            />
            {name.hasError && (
              <p className="text-red-600 text-sm">* {name.errorMessage}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="emailInput" className="text-text-1">
              Email:
            </label>
            <input
              type="text"
              id="emailInput"
              value={email.value}
              onBlur={() => {
                if (email.value.length === 0) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "This is a required field",
                  });
                } else if (!validateEmail(email.value)) {
                  setEmail({
                    ...email,
                    hasError: true,
                    errorMessage: "Invalid email format",
                  });
                } else {
                  setEmail({
                    ...email,
                    hasError: false,
                    errorMessage: "",
                  });
                }
              }}
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
              className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
            />
            {email.hasError && (
              <p className="text-red-600 text-sm">* {email.errorMessage}</p>
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
                onBlur={() => {
                  if (password.value.length === 0) {
                    setPassword({
                      ...password,
                      hasError: true,
                      errorMessage: "This is a required field",
                    });
                  } else if (!validatePassword(password.value)) {
                    setPassword({
                      ...password,
                      hasError: true,
                      errorMessage:
                        "Password must be at least 8 characters long and contain at least one letter and one number",
                    });
                  } else {
                    setPassword({
                      ...password,
                      hasError: false,
                      errorMessage: "",
                    });
                  }
                }}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
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
              <p className="text-red-600 text-sm">* {password.errorMessage}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPasswordInput" className="text-text-1">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword.value}
              onBlur={() => {
                if (confirmPassword.value.length === 0) {
                  setConfirmPassword({
                    ...confirmPassword,
                    hasError: true,
                    errorMessage: "This is a required field",
                  });
                } else if (
                  !validateConfirmPassword(
                    password.value,
                    confirmPassword.value
                  )
                ) {
                  setConfirmPassword({
                    ...confirmPassword,
                    hasError: true,
                    errorMessage: "Passwords do not match",
                  });
                } else {
                  setConfirmPassword({
                    ...confirmPassword,
                    hasError: false,
                    errorMessage: "",
                  });
                }
              }}
              onChange={(e) =>
                setConfirmPassword({
                  ...confirmPassword,
                  value: e.target.value,
                })
              }
              id="confirmPasswordInput"
              className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
            />
            {confirmPassword.hasError && (
              <p className="text-red-600 text-sm">
                * {confirmPassword.errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full shadow rounded-md py-2 flex justify-center items-center gap-2 bg-primary border border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100 disabled:bg-subtle disabled:text-background disabled:border-subtle disabled:cursor-not-allowed"
            >
              Create Account
            </button>
            <span className="flex items-center gap-2">
              <p className="text-text-2">Already have an account?</p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="underline text-primary text-sm transition-all duration-100 hover:text-text-1"
              >
                Login
              </button>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
