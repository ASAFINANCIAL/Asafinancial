import React, { useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {useAsaPostQuery,useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'

import { IAccount,IRequestTransaction,IAccountInstance,IAccountDetail } from '../global/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProps from './allprops';
const ACCOUNT_PATH='Balance/Accounts'



const renderAccount=(a:IAccountDetail)=>
    <Container className='text-start' key={a.asaFiAccountCode}>
        <Row >
            <Col>{a.asaFiAccountCode} </Col>
            <Col>{a.description} </Col>
            <Col>{a.accountNumber} </Col>
            <Col>{a.balance} </Col>
            <Col>{a.availableBalance} </Col>
            <Col>{a.calculatedBalance} </Col>
        </Row>

    </Container>
const AccountDetails=()=>{
    
    
    const [state]=useContext(AsaStateContext)
    //todo new state if we need change request body
    const body:IRequestTransaction={
        asaConsumerCode:state.asaConsumerCode,
        account_ids:[]
    }

    const {data,isFetching} = useAsaQuery<IAccountDetail[]>([ACCOUNT_PATH,state.asaConsumerCode],ACCOUNT_PATH);
   
    if(data && data.status!==200){
        return(
            <Container className='text-start'>
            <Row>
                <Col>Status</Col>
                <Col>{data.status}</Col>
            </Row>
            <Row>
                <Col>Message</Col>
                <Col>{data.message}</Col>
            </Row>
            </Container>
        )
    }
    return (
        <>
        {isFetching &&
            <Row>
                 <Spinner animation="grow" variant="warning" />
            </Row>
        }
        {data &&
            <Container>
                 <Row className='fw-bold fs-4 bg-secondary text-dark'>
                    <Col>asaFiAccountCode</Col>
                    <Col>description</Col>
                    <Col >accountNumber</Col>
                    <Col>balance</Col>
                    <Col>available balance</Col>
                    <Col>calculated balance</Col>
                 </Row>
                 {data.data.map((a)=>renderAccount(a))}
            </Container>
        }
        </>
    )

}
export default AccountDetails