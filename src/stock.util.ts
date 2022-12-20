import { fetchFileData } from "./file.util";
import { STOCK_FILE_PATH, TRANSACTIONS_FILE_PATH } from "./file.constants";
import { Stock, Transaction, TransactionTypeEnum } from "./stock.types";

export const fetchCurrentStockLevels = async (sku: string): Promise<{ sku: string; qty: number }> => {
  
  const stock: Stock[] = await fetchFileData(STOCK_FILE_PATH);
  const transactions: Transaction[] = await fetchFileData(TRANSACTIONS_FILE_PATH);
  
  const givenSkuStock: Stock | undefined = stock.find((elem) => elem.sku === sku);
  const givenSkuTransactions: Transaction[] = transactions.filter((elem) => elem.sku === sku);

  if (!givenSkuStock && !givenSkuTransactions.length)
    throw new Error("SKU does not exist");

  let qty: number = givenSkuStock ? givenSkuStock.stock : 0;

  givenSkuTransactions.forEach(elem=>{
    if (elem.type === TransactionTypeEnum.ORDER)
      qty -= elem.qty;
    else if (elem.type === TransactionTypeEnum.REFUND)
      qty += elem.qty;
  });

  return { sku, qty};
};
