import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const TRANSFER_PATH='Transfers/TransferLink'
interface IDataResponseTransferLinks{
    [propName: string]: any;

}
interface IAccount{
    accountNumber:string
    nickName:string
}
interface ITransferLink{
    linkName:string,
    amount:string,
    fromAccountDetailModel:IAccount,
    toAccountDetailModel:IAccount
    [propName: string]: any
}
const renderLinkLine=(l:ITransferLink)=>
    <Row key={l.linkName}>
        <Col>{l.linkName}</Col>
        <Col>{l.amount}</Col>
        <Col>{l.fromAccountDetailModel.accountNumber} {l.fromAccountDetailModel.nickName}</Col>
        <Col>{l.toAccountDetailModel.accountNumber} {l.toAccountDetailModel.nickName}</Col>
    </Row>
const TransferLinks=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery<ITransferLink[]>([TRANSFER_PATH,state.asaConsumerCode],TRANSFER_PATH);
    if(!data){
        return (
            <div>.........</div>
        )
    }
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

            <Container className='text-start'>
                <Row className='fw-bold fs-4'>
                    <Col>Name</Col>
                    <Col >Amount</Col>
                    <Col>From</Col>
                    <Col>To</Col>
                </Row>
                {data.data.map((t)=>renderLinkLine(t))}

            </Container>
    )
}
export default TransferLinks