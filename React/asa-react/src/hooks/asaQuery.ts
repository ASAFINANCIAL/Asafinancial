import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { DataLoaderProvider, useDataLoader } from '../components/dataloader';
import { Config } from '../config'
import React, { useState, useEffect,useContext } from "react";
import {UseQueryResult, QueryClient,  useQuery, useQueryClient,useMutation } from "react-query";
import {callApiGet} from '../services/apiCallService'
import axios from "axios";

function useAsaQuery(keys:[key:string,val:any | undefined],query:any ){
    const [state,setState]=useContext(AsaStateContext)
    const queryfn= (typeof query =='string')?()=>callApiGet(query,state):query
    const reactquery= useQuery({
        queryKey: keys,
        queryFn: async () => {
            return await queryfn();
        },
        
        refetchOnWindowFocus: false,
        //refetchOnMount:false
      });
    
    const [setLoading,setError]=useDataLoader();
    //console.log(setLoading,setError,x,query.isFetching)
    useEffect(() => {
      setLoading(reactquery.isFetching)  
      setError(reactquery.isError)
    },[reactquery.isFetching]);
    if(reactquery.isError){
        console.log(reactquery.error)
    }
    return reactquery
}
export {useAsaQuery }