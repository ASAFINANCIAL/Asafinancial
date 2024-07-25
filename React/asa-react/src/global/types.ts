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

export {type ITransferLink,type IAccount}