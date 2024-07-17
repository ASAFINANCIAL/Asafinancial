import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { DataLoaderProvider, useDataLoader } from '../components/dataloader';
import { Config } from '../config'
import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
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

    try {

        const { data } = await axios.get(
            `${Config.asaOpenApiUri}${path}`,
        {
            headers  :{...headers},
        }
    )
        console.log(data)
        return data;
    }
    catch(err){
        console.error(err)

    }

}

export {callApiGet}