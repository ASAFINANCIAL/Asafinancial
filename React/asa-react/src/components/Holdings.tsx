import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const HOLDINGS_PATH='Holdings'
interface IHolding{
    asaType:string,
    description:string,
    costBasis:number,
    marketValue:number
}
interface IDataResponseHoldings{
    consumerHoldings:IHolding[],
    [propName: string]: any;
}
const renderHoldingLine=(h:IHolding)=>
    <Row>
        <Col>{h.asaType}</Col>
        <Col sm={6}>{h.description}</Col>
        <Col>{h.costBasis}</Col>
        <Col>{h.marketValue}</Col>
    </Row>
const Holdings=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery<IDataResponseHoldings>([HOLDINGS_PATH,state.asaConsumerCode],HOLDINGS_PATH);
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
                    <Col>asaType</Col>
                    <Col sm={6}>description</Col>
                    <Col>costBasis</Col>
                    <Col>marketValue</Col>
                </Row>
                {data.data.consumerHoldings.map((h)=>renderHoldingLine(h))}
            <Row>
                <Col>AsaConsumerCode</Col>
                <Col></Col>
            </Row>
            </Container>
        
    )

}
export default Holdings