import React, { useState,useContext, useRef } from 'react';
import { Container, Row, Col, Form,Modal, Button,Navbar } from 'react-bootstrap';

import {useAsaQuery} from '../hooks/asaQuery'


import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
const TRANSFER_PATH='Transfers/TransferLink'
interface IDataResponseTransferLinks{
    [propName: string]: any;

}

interface IAccount{
    accountNumber:string
    nickName:string,
    asaConsumerCode:string,
    accountFI:string,
}
interface ITransferLink{
    linkName:string,
    amount:number,
    fromAccountDetailModel:IAccount,
    toAccountDetailModel:IAccount
    [propName: string]: any
}
interface PropsCreate{
    open:boolean,
    onclose():void
}
interface PropsLinkAccount{
    prefix:string,
    
}
const TransferLinkAccount=({prefix}:PropsLinkAccount)=>
    <>
        <Form.Group className='row' >
            <Col>
                <Form.Label>accountNumber</Form.Label>
                </Col>  
                <Col>  
                <Form.Control placeholder="accountNumber"  name={prefix+".accountNumber"} id="AccountNumber" />
            </Col>
          
        </Form.Group>
        <Form.Group className='row' >
            <Col>
                <Form.Label>accountFI</Form.Label>
                </Col>  
                <Col>  
                <Form.Control placeholder="accountFI"  name={prefix+".accountFI"} id="accountFI" />
            </Col>
          
        </Form.Group>
    </>

const TransferLinkCreate=({open,onclose}:PropsCreate)=>{
    const formref=useRef<HTMLFormElement>(null)
    const [state,setState]=useContext(AsaStateContext)
    const onSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       
        const data = new FormData(e.target as HTMLFormElement);
       
        const objectData=Object.fromEntries(data.entries());
        const createData:ITransferLink={
            linkName:objectData.linkName as string,
            amount:parseFloat(`${objectData.amount}`),
            fromAccountDetailModel:{
                    accountNumber:objectData['FromAccountDetailModel.accountNumber'] as string,
                    nickName:'',
                    accountFI:objectData['FromAccountDetailModel.accountFI'] as string,
                    asaConsumerCode:`${state.asaConsumerCode}`
                },
            toAccountDetailModel:{
                accountNumber:objectData['ToAccountDetailModel.accountNumber'] as string,
                nickName:'',
                accountFI:objectData['ToAccountDetailModel.accountFI'] as string,
                asaConsumerCode:`${state.asaConsumerCode}`
            }
        }
        console.log(createData)
    }
    return (
        <div>
        <Modal
          show={open}
         
          dialogClassName="modal-90w"
          contentClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Dialog className='modal-90w'>
            <Modal.Header closeButton onClick={()=>onclose()}>
              <Modal.Title className=''>Create new transfer link</Modal.Title>
            </Modal.Header>
  
            <Modal.Body >
              <Form ref={formref} className='form-row' onSubmit={(e)=> onSubmit(e)}>
                <Form.Group className='row' >
                  <Col>
                  <Form.Label>Link Name</Form.Label>
                  </Col>  
                  <Col>  
                    <Form.Control placeholder="Link Name"  name="linkName"  id="linkName" />
                </Col>  
                </Form.Group>
  
                <Form.Group className='row' >
                  <Col>
                  <Form.Label>Amount</Form.Label>
                  </Col>  
                  <Col>  
                    <Form.Control placeholder="Amount"  name="amount"  id="Amount" />
                </Col>  
                </Form.Group>
                <Row>
                    <Col className='p-3 bg-light'>
                        <Row className='fs-4'>From</Row>
                        <Row >
                            <TransferLinkAccount prefix='FromAccountDetailModel'/>
                        </Row>
                    </Col>
                    <Col className='p-3 '>
                        <Row className='fs-4'>To</Row>
                        <Row>
                            <TransferLinkAccount prefix='ToAccountDetailModel'/>
                        </Row>
                    </Col>
                </Row>



                <Button  type="submit" >Create</Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    )
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
    const [isCreate,setisCreate]=useState(false)
    const {data} = useAsaQuery<ITransferLink[]>([TRANSFER_PATH,state.asaConsumerCode],TRANSFER_PATH);

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
                </Row>
                {data && data.status==200 && data.data.map((t)=>renderLinkLine(t))}

            </Container>
            </>
    )
}
export default TransferLinks