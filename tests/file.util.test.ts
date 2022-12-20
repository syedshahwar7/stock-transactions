import { fetchFileData } from "../src/file.util";
import { STOCK_FILE_PATH, TRANSACTIONS_FILE_PATH } from "../src/file.constants";
import { Stock, Transaction } from "../src/stock.types"

describe("File Utility", () => {

  describe("Fetch File Data", () => {

    test("Should read file and return stock", async () => {
      const stocks: Stock[] = await fetchFileData(STOCK_FILE_PATH);
      expect(stocks).toBeTruthy();
    });

    test("Should read file and return transactions", async () => {
      const transactions: Transaction[] = await fetchFileData(TRANSACTIONS_FILE_PATH);
      expect(transactions).toBeTruthy();
    });

    test("Should throw error when file is not found", async () => {
       try {
        await fetchFileData("invalidFileName");
        expect(true).toBe(false);
      } catch (error) {
        expect(true).toBeTruthy();
      }
    });
  });

});
