export const validateInitialPayment = (payment, total) => {
  if (!/^\d+$/.test(payment)) {
    return "Введите число";
  } else if (payment >= total - 1000) {
    return "Сумма кредита не может быть менее 1000 руб.";
  } else {
    return "";
  }
};
