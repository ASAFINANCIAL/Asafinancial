import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const ACCOUNTTYPE_PATH='Account/AccountTypes'
interface IAccountType{
    accountType:string,
    fullAccountType:string,
    description:number,

}
interface IDataResponseAccountType{
    consumerHoldings:IAccountType[],
    [propName: string]: any;
}
const renderAccountTypeLine=(a:IAccountType)=>
    <Row key={a.fullAccountType}>
        <Col>{a.accountType}</Col>
        <Col sm={6}>{a.description}</Col>
        <Col>{a.fullAccountType}</Col>
        
    </Row>
const AccountTypes=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery<IAccountType[]>([ACCOUNTTYPE_PATH,state.asaConsumerCode],ACCOUNTTYPE_PATH);
    if(!data){
        return (
            <div>.........</div>
        )
    }
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

            <Container className='text-start'>
                <Row className='fw-bold fs-4'>
                    <Col>accountType</Col>
                    <Col sm={6}>description</Col>
                    <Col>fullAccountType</Col>
                   
                </Row>
                {data.data.map((a)=>renderAccountTypeLine(a))}
            <Row>
                <Col>AsaConsumerCode</Col>
                <Col></Col>
            </Row>
            </Container>
        
    )

}
export default AccountTypes