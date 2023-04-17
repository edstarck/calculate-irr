import { Banks } from "./data";

export async function getBanks() {
  const res = await fetch(``);
  // const data = await res.json();
  let data = Banks;

  if (res.ok) {
    return data;
  } else {
    throw new Error(text);
  }
}
