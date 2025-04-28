import { useState, useEffect, useRef } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./toast.css";

export interface ToastProps {
  title: string;
  description?: string;
  type?: "info" | "error";
  show: boolean;
  onClose: () => void;
}

export const Toast = ({
  title,
  type = "info",
  show,
  onClose,
  description,
}: ToastProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const getToastStyles = (type: "info" | "error") => {
    switch (type) {
      case "info":
      default:
        return "bg-blue-500 text-white";
      case "error":
        return "bg-red-300 text-red-700";
    }
  };

  useEffect(() => {
    if (show) {
      setIsMounted(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10); // allow DOM to mount before starting animation

      // Start auto-dismiss timer
      const timer = setTimeout(() => {
        setIsVisible(false); // triggers exit animation
      }, 3000);

      return () => clearTimeout(timer); // cleanup timer on unmount
    } else {
      setIsVisible(false);
    }
  }, [open]);

  useEffect(() => {
    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === "slideFadeOut") {
        setIsMounted(false);
        onClose(); // Parent callback
      }
    };

    const node = toastRef.current;
    if (node) {
      node.addEventListener("animationend", handleAnimationEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={toastRef}
      className={[
        "max-w-xs w-full z-100",
        "rounded-md shadow-md px-3 py-2",
        "flex justify-between items-center",
        "absolute top-0 md:right-0 m-2 md:m-4",
        "overflow-hidden pointer-events-auto",
        isVisible ? "toast-enter" : "toast-exit",
        getToastStyles(type),
      ].join(" ")}
    >
      <div>
        <h2 className="font-semibold">{title}</h2>
        {description && <p className="text-red-600 text-sm">{description}</p>}
      </div>
      <button className="flex items-center">
        <Cross2Icon
          className=" text-red-600 hover:text-red-700"
          onClick={() => setIsVisible(false)}
        />
      </button>
    </div>
  );
};
