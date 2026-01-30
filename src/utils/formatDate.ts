export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
