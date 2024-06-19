export const dateCheck = (date) => {
  const inputDate = new Date(date);
  const currentDate = new Date();
  return inputDate > currentDate;
};

export const dateFormatChange = (date) => {
  const dateChange = new Date(date);
  const day = dateChange.getDate();
  const month = dateChange.getMonth() + 1;
  const year = dateChange.getFullYear();
  return `${day}/${month}/${year}`;
};

export const dateOverSeven = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();
    return ((currentDate - inputDate)/ (1000 * 3600 * 24)) > 7;
}

export const dateOverThirty = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();
    return ((currentDate - inputDate)/ (1000 * 3600 * 24)) > 30;
}