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
  const autoDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    } else {
      setIsVisible(false); // triggers exit animation
    }
  }, [show]);

  useEffect(() => {
    if (isMounted) {
      // after mounting, trigger visible
      setTimeout(() => {
        setIsVisible(true);
      }, 0); // wait for the next render cycle to trigger animation
    }
  }, [isMounted]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName.includes("In")) {
      if (autoDismissTimer.current) {
        clearTimeout(autoDismissTimer.current);
      }
      autoDismissTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else if (e.animationName.includes("Out")) {
      setIsMounted(false);
      onClose();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={[
        "max-w-xs w-full z-50",
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
      <button className="flex items-center" onClick={() => setIsVisible(false)}>
        <Cross2Icon className="text-red-600 hover:text-red-700" />
      </button>
    </div>
  );
};
