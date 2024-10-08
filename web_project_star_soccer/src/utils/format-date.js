export const getDateFormatted = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDateToDisplay = (date) => {
  const dateSplitted = date.split("-");
  const yyyy = dateSplitted[0];
  const mm = dateSplitted[1];
  const dd = dateSplitted[2];
  return `${dd}/${mm}/${yyyy}`;
};
