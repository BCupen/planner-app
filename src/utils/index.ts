import { format } from "date-fns";

export const getWeekRange = () => {
  const curr = new Date();
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = format(new Date(curr.setDate(first)), "PP");
    week.push(day);
  }
  return week;
};
