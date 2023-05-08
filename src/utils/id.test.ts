import { createId, idLength } from "./id";

const pattern = /^[a-z0-9]+$/i;

describe("createId", () => {
  test("that id is correct shape and length", () => {
    const data = createId();
    expect(data.length).toEqual(idLength);
    expect(pattern.test(data)).toEqual(true);
  });
});
