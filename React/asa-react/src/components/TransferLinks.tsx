import React, { useState,useContext, useRef } from 'react';
import { Container, Row, Col, Form,Modal, Button,Navbar,Spinner } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'

import {callApiGet,apiCallPost,IAsaResponse} from '../services/apiCallService'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { ITransferLink } from '../global/types';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransferLinkCreate } from './TransferLinkCreate';
const TRANSFERLINK_PATH='Transfers/TransferLink'
const TRANSFERLINK_VERIFY_PATH='Transfers/TransferLink/Verify'
const TRANSFERLINK_MAKE_PATH='Transfers/MakeTransfer'


const TransferLinks=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const [isCreate,setisCreate]=useState(false)
    const {data} = useAsaQuery<ITransferLink[]>([TRANSFERLINK_PATH,state.asaConsumerCode],TRANSFERLINK_PATH);
    const verifyLink=async (link:ITransferLink)=>{
        toast.loading ("Veryfying", {
           
          });
        const requestBody={
            linkCode:link.linkCode,
            amount:link.amount
        }  
        const result=await  apiCallPost<IAsaResponse<ITransferLink[]>>(TRANSFERLINK_VERIFY_PATH,requestBody,state)
        toast.dismiss()
        if(result?.status===200)
        {
            toast.success(result?.message)
        }else{
            toast.warning(result?.message)
        }

      
    }
    const makeTransfer=async (link:ITransferLink)=>{
        toast.loading ("Transfering", {
           
          });
        const requestBody={
            linkCode:link.linkCode,
            amount:link.amount
        }  
        const result=await  apiCallPost<IAsaResponse<ITransferLink[]>>(TRANSFERLINK_MAKE_PATH,requestBody,state)
        toast.dismiss()
        if(result?.status===200)
        {
            toast.success(result?.message)
        }else{
            toast.warning(result?.message)
        }

      
    }
    
    const renderLinkLine=(l:ITransferLink)=>
        <Row key={l.linkCode} className='py-2'>
            <Col>{l.linkCode}</Col>
            <Col>{l.linkName}</Col>
            <Col>{l.amount}</Col>
            <Col>{l.fromAccountDetailModel.accountNumber} {l.fromAccountDetailModel.nickName}</Col>
            <Col>{l.toAccountDetailModel.accountNumber} {l.toAccountDetailModel.nickName}</Col>
            <Col>
                <Row>
                    <Col><Button onClick={(e)=>verifyLink(l)}>Verify</Button></Col>
                    <Col><Button variant="success" onClick={(e)=>makeTransfer(l)}>Transfer</Button></Col>
                </Row>
            </Col>
        </Row>

    return (
            <>
            <Row>
                <Button variant="success" onClick={()=>setisCreate(true)}>Create Transfer link</Button>
            </Row>
            <TransferLinkCreate open={isCreate} onclose={()=>setisCreate(false)}/>
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
                    <Col>LinkCode</Col>
                    <Col>Name</Col>
                    <Col >Amount</Col>
                    <Col>From</Col>
                    <Col>To</Col>
                    <Col>Command</Col>
                </Row>
                {data && data.status==200 && data.data.map((t)=>renderLinkLine(t))}

            </Container>
            </>
    )
}
export default TransferLinks