import { format } from "date-fns";

export const getWeekRange = () => {
  const curr = new Date();
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = format(new Date(curr.setDate(first)), "yyyy-MM-dd");
    week.push(day);
  }
  return week;
};

export const validators = {
  validateTitle: (value: string) => {
    const validRegex = /^[a-zA-Z0-9' ]+$/;
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      return {
        hasError: true,
        errorMessage: "Title is required",
      };
    }
    if (!validRegex.test(trimmedValue)) {
      return {
        hasError: true,
        errorMessage:
          "Title can only contain letters, numbers, and spaces and apostrophes",
      };
    }
    if (trimmedValue.length > 50) {
      return {
        hasError: true,
        errorMessage: "Title must be less than 50 characters",
      };
    }
    return {
      hasError: false,
      errorMessage: "",
    };
  },
  validateDescription: (value: string) => {
    const trimmedValue = value.trim();
    const validRegex = /^[a-zA-Z0-9'@!#? ]+$/;
    if (trimmedValue.length > 200) {
      return {
        hasError: true,
        errorMessage: "Description must be less than 200 characters",
      };
    }
    if (!validRegex.test(trimmedValue)) {
      return {
        hasError: true,
        errorMessage:
          "Invalid characters in description. Only letters, numbers, and @!#? are allowed",
      };
    }
    return {
      hasError: false,
      errorMessage: "",
    };
  },
};
