import React, { useState,createContext,ReactNode  } from 'react';
const STORAGE_KEY="AsaState"
interface IAsaState{
  asaConsumerCode:number,
  token:string | undefined
}
interface Props {
  children?: ReactNode
  // any props that come into the component
}
type setStateFunc = (asaState:IAsaState) => void;

const initialData:IAsaState= JSON.parse(localStorage.getItem(STORAGE_KEY) || '0') || {asaConsumerCode:2146374978,token:'efewf'}  
const AsaStateContext = createContext<[IAsaState,setStateFunc]>([initialData,(s)=>{}]);
 
const AsaStateProvider = ({ children, ...props }: Props) => {
  const [state, setState] = useState(initialData);
  const wrapsetState=(asaState:IAsaState)=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(asaState))
    setState(asaState)
  }
  return (
    <AsaStateContext.Provider value={[state,wrapsetState]}>
      {children}
    </AsaStateContext.Provider>
  );
};

export { AsaStateProvider,AsaStateContext,type  IAsaState}