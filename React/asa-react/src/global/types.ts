 interface IAccount{
    accountNumber:string
    nickName:string,
    asaConsumerCode:string,
    accountFI:string,
}
interface ITransferLink{
    linkName:string,
    amount:number,
    linkCode:string,
    fromAccountDetailModel:IAccount,
    toAccountDetailModel:IAccount
    [propName: string]: any
}
interface ITransfer{
    asaTransactionId:number,
    amount:number
    transferStatus:string
    confirmationNumber:string
    transferDateTime:string
    message:string
    [propName: string]: any
}

export {type ITransferLink,type IAccount,type ITransfer}