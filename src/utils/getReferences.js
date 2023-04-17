import { v4 as uuid } from "uuid";
import { References } from "./data";

export function getReferences() {
  return new Promise((resolve, reject) => {
    // reject(new Error('Error 500'))
    setTimeout(() => {
      resolve(References);
    }, 1500);
  });
}
