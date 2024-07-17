import React, { useState,createContext,ReactNode  } from 'react';
 
interface IAsaState{
  asaConsumerCode:number,
  token:string
}
interface Props {
  children?: ReactNode
  // any props that come into the component
}

const initialData:IAsaState={asaConsumerCode:-1,token:''}  
const AsaStateContext = createContext<[IAsaState,React.Dispatch<React.SetStateAction<IAsaState>>]>([initialData,(s)=>{}]);
 
const AsaStateProvider = ({ children, ...props }: Props) => {
  const [state, setState] = useState(initialData);
 
  return (
    <AsaStateContext.Provider value={[state,setState]}>
      {children}
    </AsaStateContext.Provider>
  );
};

export { AsaStateProvider,AsaStateContext,type  IAsaState}