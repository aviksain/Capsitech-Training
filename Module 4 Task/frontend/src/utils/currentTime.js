const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getCurrentTime = () => {
  let date = new Date();
  let d = date.getDate();
  let m = months[date.getMonth()];
  let y = date.getFullYear();
  return `${d} ${m} ${y}`;
};