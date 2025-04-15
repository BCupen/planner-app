import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink } from "react-router";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`min-h-dvh z-10 max-w-[250px] ${
        expanded ? "w-full max-sm:absolute" : "w-14"
      } sticky top-0 transition-all duration-150 ease-linear bg-sidebar`}
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
            onClick={() => setExpanded(!expanded)}
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
