export interface IReceiptInfo{
    title: string
    count: number|string
    amount: number|string
}

export interface IReceipt{
    id:number
    invNum: string
    status: string
    type: number
    time: string
    amount: number
    sellerName: string
    details: IReceiptDetails[]
}

export interface IReceiptDetails{
    description: string
    quantity: number
    unitPrice: number
    amount: number
}