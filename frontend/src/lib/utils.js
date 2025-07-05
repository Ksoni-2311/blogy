export function formatDate(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year:"2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}