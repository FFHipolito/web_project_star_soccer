export const formatDate = (date) => {
  const arrayDate = date.toLocaleDateString().split("/");
  const dateMapped = {
    yyyy: arrayDate[2],
    mm: `${arrayDate[0].length === 1 ? "0" : ""}${arrayDate[0]}`,
    dd: `${arrayDate[1].length === 1 ? "0" : ""}${arrayDate[1]}`,
  };
  return `${dateMapped.yyyy}-${dateMapped.mm}-${dateMapped.dd}`;
};
