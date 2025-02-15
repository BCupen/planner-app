import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-dvh max-w-[250px] ${
        expanded ? "w-full max-md:absolute" : "w-14"
      } transition-all duration-150 ease-linear bg-sidebar`}
    >
      <nav className="w-full flex flex-col items-center p-4">
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
      </nav>
    </aside>
  );
};
