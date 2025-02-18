import { Priority } from "./types";

export const generateUID = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getPriorityColor = (p: Priority) => {
  switch (p) {
    case Priority.LOW:
      return "text-blue-600";
    case Priority.MEDIUM:
      return "text-orange-600";
    case Priority.HIGH:
      return "text-red-600";
    default:
      return "text-blue-600";
  }
};
