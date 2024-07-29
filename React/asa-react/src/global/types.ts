 interface IAccountCreate{
    accountNumber:string
    nickName:string,
    asaConsumerCode:string,
    accountFI:string,
}
interface ITransferLink{
    linkName:string,
    amount:number,
    linkCode:string,
    fromAccountDetailModel:IAccountCreate,
    toAccountDetailModel:IAccountCreate
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
interface IRequestTransaction{
    asaConsumerCode:number
    [propName: string]: any;
}
interface IAccountInstance{
    account:IAccount
}
interface ITransaction{
    amount:number,
    description:string,
    transactiondate:string
    transactiontype:string
    transactionid:string
}

interface IBalance{
    available:number,
    current:number
}
interface IAccount{
    account_id:string,
    account_type:string,
    accountname:string,
    balances:IBalance
    transactions:ITransaction[]
}
interface IAccountDetail{
    balance:number
    asaFiAccountCode:number
    accountName:string
    accountNumber:string
    accountType:string
    availableBalance:number
    calculatedBalance:number
    description:string
}
interface INetWorthTrend{
    fIAccountName:string
    fiAccountCalculatedBalance:number
    fiAccountCalculatedBalanceChange:number
    fiStatus:string
}
interface INetworth{
    period:string
    endPeriod:string
    startPeriod:string
    netWorthTrends:INetWorthTrend[]
    fiCalculatedBalance:INetworthCalcBalance
}
interface INetworthCalcBalance{
    networth:number
    changeNetworth:number
    changePercent:number
    asset:number
    changeAsset:number
    changeAssetPercent:number
    liability:number
    changeLiability:number
    changeLiabilityPercent:number
}

export {type ITransferLink,type IAccount,type ITransfer,
        type IRequestTransaction,type IAccountInstance, type IAccountCreate,
        type IAccountDetail,type INetworth, type INetWorthTrend}