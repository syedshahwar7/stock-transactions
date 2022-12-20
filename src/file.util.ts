import * as fs from "fs/promises";

export const fetchFileData = async (filePath: string): Promise<any> => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } 
    catch (error: any) {
        console.log(error);
    }
};
