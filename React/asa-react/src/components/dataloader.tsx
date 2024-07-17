import React, { useState, useEffect,useContext,ReactNode } from "react";

interface Props {
  children?: ReactNode
  // any props that come into the component
}
type SetBool=React.Dispatch<React.SetStateAction<boolean>>
//React.Dispatch<React.SetStateAction<boolean>>
const DataLoaderContext = React.createContext<[SetBool,SetBool]>([()=>{},()=>{}]);
const useDataLoader=()=>useContext(DataLoaderContext)
 
const DataLoaderProvider = ({ children, ...props }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  return (
    <DataLoaderContext.Provider value={[setLoading,setError]}>
    <>
      <div className={isLoading?'bg-warning':''}>
        Data Loader State {isLoading?'Loading':'Done'}
        {isError &&
          <div className='bg-danger'>
            Error
          </div>
        }
      </div>
      {children}
    </>
    </DataLoaderContext.Provider>
  );
};

export { DataLoaderProvider,useDataLoader}


