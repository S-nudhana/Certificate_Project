export const dateFormatChange = (date) => {
  const dateChange = new Date(date);
  const day = dateChange.getDate();
  const month = dateChange.getMonth() + 1;
  const year = dateChange.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDate = (date) => {
  const dateChange = new Date(date);
  const year = dateChange.getFullYear();
  const month = String(dateChange.getMonth() + 1).padStart(2, '0');
  const day = String(dateChange.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};