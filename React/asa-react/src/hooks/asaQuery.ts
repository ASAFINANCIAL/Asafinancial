import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { DataLoaderProvider, useDataLoader } from '../components/dataloader';
import { Config } from '../config'
import React, { useState, useEffect,useContext } from "react";
import {UseQueryResult, QueryClient,  useQuery, useQueryClient,useMutation } from "react-query";
import {callApiGet,apiCallPost} from '../services/apiCallService'
import axios from "axios";
import { IAsaResponse } from '../services/apiCallService';
interface BaseQueryResult<TData> {
  data: IAsaResponse<TData>;
 
  isError?: boolean;

  isLoading: boolean;
  isLoadingError?: boolean;
  isRefetchError?: boolean;
  isSuccess?: boolean;
  status?: string;
  [propName: string]: any;
}

function useAsaQuery<TData>(keys:[key:string,val:any | undefined],query:any ){
    const [state,setState]=useContext(AsaStateContext)
    const queryfn= (typeof query =='string')?()=>callApiGet(query,state):query
    const reactquery= useQuery<IAsaResponse<TData>,any>({
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
function useAsaPostQuery<TData>(keys:[key:string,val:any | undefined],query:any ,body:any){
  const [state,setState]=useContext(AsaStateContext)
  const queryfn= (typeof query =='string')?()=>apiCallPost(query,body,state):query
  const reactquery= useQuery<IAsaResponse<TData>,any>({
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
export {useAsaQuery ,useAsaPostQuery}