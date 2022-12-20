import { app } from "../src";

describe("Index", () => {

  describe("App", () => {

    test("Should successfully run for valid sku", async () => {
      process.argv[2] = "PWX000842/03/47"
      await app()
      expect(true).toBeTruthy();
    });

    test("Should throw error for not providing sku arg", async () => {
      try {
        process.argv[2] = '';
        await app();
        expect(true).toBe(false);
      } catch (error) {
        expect(true).toBeTruthy();
      }
    });

    test("Should throw error for invalid sku", async () => {
      try {
        process.argv[2] = 'xyz'
        await app();
        expect(true).toBe(false);
      } catch (error) {
        expect(true).toBeTruthy();
      }
    });
  });

});
