import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const TRANSFER_PATH='Transfers'
interface IDataResponseTransfer{
    [propName: string]: any;
}
const Transfer=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery<IDataResponseTransfer>([TRANSFER_PATH,state.asaConsumerCode],TRANSFER_PATH);
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
                <Col>{data.message}</Col>
                <Col></Col>
            </Row>
            </Container>
        }
        </>
    )

}
export default Transfer