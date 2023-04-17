export const sleep = (ms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function prettify(num) {
  let n = num.toString();
  let separator = " ";
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}
