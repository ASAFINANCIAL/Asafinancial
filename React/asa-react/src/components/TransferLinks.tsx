import React, { useState,useContext, useRef } from 'react';
import { Container, Row, Col, Form,Modal, Button,Navbar,Spinner } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import Accounts from './Accounts';
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { ITransferLink } from '../global/types';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransferLinkCreate } from './TransferLinkCreate';
const TRANSFERLINK_PATH='Transfers/TransferLink'


const TransferLinks=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const [isCreate,setisCreate]=useState(false)
    const {data} = useAsaQuery<ITransferLink[]>([TRANSFERLINK_PATH,state.asaConsumerCode],TRANSFERLINK_PATH);
    const verifyLink=async (linkCode:string)=>{
        toast.loading ("Veryfying", {
           
          });
    }
    const renderLinkLine=(l:ITransferLink)=>
        <Row key={l.linkCode} className='py-2'>
            <Col>{l.linkName}</Col>
            <Col>{l.amount}</Col>
            <Col>{l.fromAccountDetailModel.accountNumber} {l.fromAccountDetailModel.nickName}</Col>
            <Col>{l.toAccountDetailModel.accountNumber} {l.toAccountDetailModel.nickName}</Col>
            <Col>
                <Row>
                    <Col><Button onClick={(e)=>verifyLink(l.linkCode)}>Verify</Button></Col>
                    <Col><Button>Transfer</Button></Col>
                </Row>
            </Col>
        </Row>

    return (
            <>
            <Row>
                <Button onClick={()=>setisCreate(true)}>Create Transfer link</Button>
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