import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'

import { ITransferLink,ITransfer } from '../global/types';
import { toast } from 'react-toastify';
const TRANSFER_PATH='Transfers'

const classNameSelector =(status:string):string=>{
    switch (status) {
        case 'denied':
        case 'error':
          return 'bg-danger text-white'
        case 'pending':
          return 'bg-warning text-dark'
        case 'completed':
          return 'bg-success text-white'
        default:
          return ''
      }
}

const Transfer=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery<ITransfer[]>([TRANSFER_PATH,state.asaConsumerCode],TRANSFER_PATH);
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
    const showStatus=(t:ITransfer)=>{
        toast.info(t.message)
    }
    const renderTransferLine=(t:ITransfer)=>
        <Row key={t.confirmationNumber} className='py-2'>
            <Col>{t.confirmationNumber}</Col>
            <Col>{t.transferDateTime}</Col>
            <Col className='text-end px-5'>{t.amount}</Col>
            <Col className={classNameSelector(t.transferStatus)}>{t.transferStatus}</Col>
            <Col ><Button onClick={(e)=>showStatus(t)} >status</Button></Col>
        </Row>
    return (
        <>
        {data && data.status!==200 &&
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
        }
        <Container className='text-start'>
            <Row className='fw-bold fs-4'>
                <Col>confirmationNumber</Col>
                <Col>Date Time</Col>
                <Col className='text-end'>Amount</Col>
                <Col >transferStatus</Col>
                <Col>...</Col>
            </Row>
            {data && data.status==200 && data.data.map((t)=>renderTransferLine(t))}

        </Container>
        </>
    )

}
export default Transfer