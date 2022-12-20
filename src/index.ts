import { fetchCurrentStockLevels } from "./stock.util";

export const app = async () => {
  
    try {
        let sku = '';

        if (process.argv && process.argv.length) 
            sku = process.argv[2];

        if(sku == '' || sku == undefined)
            throw new Error("SKU is not provided");

        const currentStockLevels = await fetchCurrentStockLevels(sku);
        console.log("================================================================\n");
        console.log("Current Stock Levels: ",currentStockLevels);
        console.log("\n================================================================");
    } 
    catch (error: any) {
        console.log(error);
    }
};

app();
