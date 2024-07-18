import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaPostQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const TRANSACTIONS_PATH='Transactions'
interface IDataResponseTransactions{
    [propName: string]: any;
}
interface IRequestTransaction{
    asaConsumerCode:number
    [propName: string]: any;
}
const Transactions=()=>{
    const [state,setState]=useContext(AsaStateContext)
    //todo new state if we need change request body
    const body:IRequestTransaction={
        asaConsumerCode:state.asaConsumerCode,
        account_ids:['22']
    }

    const {data} = useAsaPostQuery<IDataResponseTransactions>([TRANSACTIONS_PATH,state.asaConsumerCode],TRANSACTIONS_PATH,body);
    console.log(data)
    if(data && data.status!=200){
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
        {data &&
            <Container>
            <Row>
                <Col>AsaConsumerCode</Col>
                <Col></Col>
            </Row>
            </Container>
        }
        </>
    )

}
export default Transactions