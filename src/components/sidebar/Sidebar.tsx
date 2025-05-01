import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../data/hooks";
import { removeUser, userState } from "../../data/userSlice";
import { useLogoutUserMutation } from "../../data/api/userApiSlice";
import { useSidebar } from "./SidebarProvider";

export const Sidebar = () => {
  const { name } = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const { isOpen: expanded, toggle } = useSidebar();

  const handleSignOut = () => {
    try {
      logoutUser({})
        .unwrap()
        .then(() => {
          dispatch(removeUser());
          navigate("/login", { replace: true });
        });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside
      className={[
        "h-dvh max-w-[256px] bg-sidebar",
        "fixed top-0 left-0 z-10",
        expanded ? "w-full" : "w-14",
        "transition-all duration-300 ease-linear",
      ].join(" ")}
    >
      <nav className="w-full flex flex-col items-start p-4 gap-3">
        <div className="max-h-9 w-full flex justify-between items-center">
          <h1
            className={`text-nowrap text-2xl font-bold text-primary overflow-hidden transition-all duration-50 ease-in origin-left ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Todo Things
          </h1>
          <button
            className="hover:bg-gray-300 rounded-full p-1 transition-all duration-150 ease-linear"
            onClick={() => toggle()}
          >
            {expanded ? (
              <ChevronLeftIcon className="text-primary w-5 h-5" />
            ) : (
              <ChevronRightIcon className="text-primary w-5 h-5" />
            )}
          </button>
        </div>

        <ul
          className={`${
            expanded ? "w-32" : "w-0"
          } flex flex-col gap text-text-1 font-semibold overflow-hidden`}
        >
          <Link path="/tasks" title="All" />
          <Link path="/tasks/today" title="Today" />
          <Link path="/tasks/upcoming" title="Upcoming" />
        </ul>
      </nav>

      <div
        className={`w-full absolute bottom-0 flex justify-between p-3 overflow-hidden`}
      >
        <h3
          className={`${
            expanded ? "w-32" : "w-0"
          } overflow-hidden text-text-2 font-bold text-nowrap`}
        >
          Hi, {name}
        </h3>

        <button
          onClick={() => handleSignOut()}
          className={`${
            expanded ? "w-16" : "w-0"
          } overflow-hidden text-nowrap underline text-primary text-sm font-semibold hover:text-subtle transition-all duration-150 ease-linear`}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

const Link = ({ title, path }: { title: string; path: string }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? "text-primary underline" : "hover:text-primary"
        }
        end
      >
        {title}
      </NavLink>
    </li>
  );
};
