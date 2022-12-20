import { fetchCurrentStockLevels } from "../src/stock.util";
import { fetchFileData } from "../src/file.util";
import { STOCK_FILE_PATH, TRANSACTIONS_FILE_PATH } from "../src/file.constants";

jest.mock("../src/file.util");

const stock = [
    { sku: "SKU1", stock: 50 },
    { sku: "SKU2", stock: 30 },
];
  
 const transactions = [
    { sku: "SKU1", type: "order", qty: 20 },
    { sku: "SKU1", type: "refund", qty: 10 },
    { sku: "SKU3", type: "refund", qty: 10 },
];
  
const STOCKLEVEL_SKU1 = { sku: "SKU1", qty: 40 };
const STOCKLEVEL_SKU2 = { sku: "SKU2", qty: 30 };
const STOCKLEVEL_SKU3 = { sku: "SKU3", qty: 10 };

const mockFetchFileData = () => {
  (fetchFileData as jest.Mock).mockImplementation((filePath) => {
    if (filePath === STOCK_FILE_PATH) 
      return stock;
    else if (filePath === TRANSACTIONS_FILE_PATH)
      return transactions;
  });
};

describe("Stock Utility", () => {

  describe("Fetch Current Stock Levels", () => {

    test("Should return current stock levels when SKU is in both files", async () => {
      
        mockFetchFileData();

        const result = await fetchCurrentStockLevels(STOCKLEVEL_SKU1.sku);
        expect(result.sku).toBe(STOCKLEVEL_SKU1.sku);
        expect(result.qty).toBe(STOCKLEVEL_SKU1.qty);
    });

    test("Should return current stock levels when SKU is in stock file only", async () => {
      
        mockFetchFileData();

        const result = await fetchCurrentStockLevels(STOCKLEVEL_SKU2.sku);
        expect(result.sku).toBe(STOCKLEVEL_SKU2.sku);
        expect(result.qty).toBe(STOCKLEVEL_SKU2.qty);
    });

    test("Should return current stock levels when SKU is in transaction file only", async () => {
      
        mockFetchFileData();

        const result = await fetchCurrentStockLevels(STOCKLEVEL_SKU3.sku);
        expect(result.sku).toBe(STOCKLEVEL_SKU3.sku);
        expect(result.qty).toBe(STOCKLEVEL_SKU3.qty);
    });

    test("Should throw error - SKU does not exist", async () => {
        
      try {
        mockFetchFileData();

        await fetchCurrentStockLevels("xyz");
        expect(true).toBe(false);
      } 
      catch (error: any) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("SKU does not exist");
      }
    });

  });

});
