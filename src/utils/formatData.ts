export const formatDateTime = (dateTimeString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Date(dateTimeString).toLocaleString(
    "en-US",
    options
  );

  return formattedDate;
};
