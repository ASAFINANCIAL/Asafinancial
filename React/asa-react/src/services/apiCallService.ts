import {IAsaState } from '../components/asaStateProvider'

import { Config } from '../config'

import axios ,{AxiosError} from "axios";

interface IAsaResponse<TData>{
    status:number,
    message:string,
    data:TData
}
interface IDataResponseAhtorization{
    field:string
    message:string
}
interface BaseHeaders{
    'Ocp-Apim-Subscription-Key':string
    'Access-Control-Allow-Origin':string

    'Accept':string,
    Authorization?:string,
    'X-ASA-ConsumerCode'?:number,
    'X-ASA-ApiVersion':string,
    'X-ASA-FintechCode':string,
    'X-ASA-FintechApplicationCode':string,
    'X-ASA-FintechAuthorizationKey':string
}


declare function getHeadersFn():BaseHeaders
const getHeaders:typeof getHeadersFn = () =>{

    const headers:BaseHeaders=
    {
        'Ocp-Apim-Subscription-Key':Config.subscriptionKey,
        'Access-Control-Allow-Origin': '*',
        'Accept':'application/json',
        'X-ASA-ApiVersion':Config.asaApiVersion,
        'X-ASA-FintechCode':Config.asafintechCode,
        'X-ASA-FintechApplicationCode':Config.applicationCode,
        'X-ASA-FintechAuthorizationKey':Config.authorizationKey
    }
    return headers
}
const callApiGet =async (path:string,state:IAsaState)=>{

    const headers=getHeaders()
    if(state.token) 
        headers.Authorization= 'Bearer ' + state.token
    headers['X-ASA-ConsumerCode']=state.asaConsumerCode
        const { data } = await axios.get(
            `${Config.asaOpenApiUri}${path}`,
        {
            headers  :{...headers},
        }
    )
        console.log(data)
        return data;

}

async function apiCallPost<TResponse>(path:string,body:any,asaState:IAsaState|undefined):Promise<TResponse | undefined>  {
    try
    {
        const headers=getHeaders()
        if(asaState){ 
            headers.Authorization= 'Bearer ' + asaState.token
            headers['X-ASA-ConsumerCode']=asaState.asaConsumerCode
        }
        const url=Config.asaOpenApiUri+path;
        const { data}  = await axios.post(url ,body, { headers  :{...headers}, })

        return data
    }
    catch(err){
        const axerr=err as AxiosError
        console.error(err)
        return axerr?.response?.data as TResponse
    }

}
const apiCallAutorization=async ():Promise<IAsaResponse<IDataResponseAhtorization> | undefined>  =>{

    const mylocation=window.location.origin
    const body={
        asafintechCode: Config.asafintechCode,
        applicationCode: Config.applicationCode,
        authorizationKey: Config.authorizationKey,
        redirectUrl:mylocation+"/asasilent.html",
        redirectFailureUrl:mylocation+"/asasilenterror.html",
        subscriptionKey:Config.subscriptionKey,
        scope: "openid",
        apiVersion: Config.asaApiVersion
    }
    return await apiCallPost("Authentication/Authorization",body,undefined)
}
export {callApiGet,apiCallAutorization,type IAsaResponse,apiCallPost}