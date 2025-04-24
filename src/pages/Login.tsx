import { PageHeader } from "../components/PageHeader";
import { useState } from "react";

const Login = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <main className="w-full flex flex-col items-center gap-5 bg-background p-6 md:mt-4">
      <div className="w-full md:w-1/3 border border-subtle bg-sidebar rounded-md px-4 py-6">
        <PageHeader title="Log In" subText="Looks like you aren't logged in" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="emailInput" className="text-text-1">
              Email:
            </label>
            <input
              type="text"
              id="emailInput"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className="w-full md:w-3/4 bg-background focus:outline-none border border-subtle rounded-md p-1 text-text-2 text-sm"
            />
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
                className="underline text-subtle text-sm"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                Show
              </button>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full shadow rounded-md py-2 flex justify-center items-center gap-2 bg-primary border border-primary hover:bg-transparent text-white hover:text-primary transition-all duration-100">
              Log in
            </button>
            <span className="flex items-center gap-2">
              <p className="text-text-2">Don't have an account?</p>
              <button className="underline text-primary text-sm transition-all duration-100 hover:text-text-1">
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
