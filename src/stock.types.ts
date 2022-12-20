export enum TransactionTypeEnum {
    ORDER = "order",
    REFUND = "refund",
}
  
export type Stock = {
    sku: string;
    stock: number;
};
  
export type Transaction = {
    sku: string;
    type: TransactionTypeEnum;
    qty: number;
};
