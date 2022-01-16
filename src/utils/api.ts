import { IReceipt,IReceiptResp } from "./type";
import axios from "axios";



export function fetchReceiptList() :Promise<IReceipt[]>{

    const receiptList = axios.get("http://localhost:3000/invoices?_sort=time&_order=desc").then((response) => {
        return response.data;
    });
    return  receiptList
}
export function addReceipt(receipt:IReceipt) :Promise<IReceipt[]>{

    const receiptList = axios.post("http://localhost:3000/invoices",receipt).then((response) => {
        console.log(response)
        return response.data;
    });
    return  receiptList
}
export function deleteReceipt(id:number) :Promise<IReceipt[]>{

    const receiptList = axios.delete("http://localhost:3000/invoices/"+id).then((response) => {
        console.log(response)
        return response.data;
    });
    return  receiptList
}



