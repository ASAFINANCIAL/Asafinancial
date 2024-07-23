import React, { useState, useEffect,useContext,ReactNode } from "react";
import { Spinner,Container,Row,Col } from 'react-bootstrap'; 
interface Props {
  children?: ReactNode
  // any props that come into the component
}
type SetBool=React.Dispatch<React.SetStateAction<boolean>>
const containerStyle = { backgroundColor: 'transparent', height: '40px', padding: '0px' };
//React.Dispatch<React.SetStateAction<boolean>>
const DataLoaderContext = React.createContext<[SetBool,SetBool]>([()=>{},()=>{}]);
const useDataLoader=()=>useContext(DataLoaderContext)
 
const DataLoaderProvider = ({ children, ...props }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  return (
    <DataLoaderContext.Provider value={[setLoading,setError]}>
    <>
      <Container style={containerStyle}>
        <Row>
          <Col sm={8}>
        { isLoading &&
          <>
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="secondary" />
          </>

        }
       </Col>
       <Col sm={4}>
        {isError &&
          <div className='bg-danger'>
            Error
          </div>
        }
      </Col>
      </Row>
      </Container>
      {children}
    </>
    </DataLoaderContext.Provider>
  );
};

export { DataLoaderProvider,useDataLoader}


