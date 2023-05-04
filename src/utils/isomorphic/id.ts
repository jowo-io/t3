import { init } from "@paralleldrive/cuid2";

export const idLength = 18;

export const createId = init({
  length: idLength,
});
