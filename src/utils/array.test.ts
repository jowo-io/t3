import { repeat } from "./array";

describe("repeat", () => {
  test("repeat 3 times", () => {
    const data = repeat((i, max) => `${i + 1} of ${max}`, 3);
    expect(data).toEqual(["1 of 3", "2 of 3", "3 of 3"]);
  });
});
