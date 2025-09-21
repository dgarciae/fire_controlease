export const capitalizeText = (text: string, sep: string = " ") => {
  return text
    .split(sep)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
