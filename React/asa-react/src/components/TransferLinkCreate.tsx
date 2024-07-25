import React, { useState,useContext, useRef } from 'react';
import { Container, Row, Col, Form,Modal, Button,Navbar,Spinner } from 'react-bootstrap';
import {Config} from '../config'
import {useAsaQuery} from '../hooks/asaQuery'
import {callApiGet,apiCallPost} from '../services/apiCallService'
import Accounts from './Accounts';
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
import { ITransferLink } from '../global/types';
import {TransferLinkAccount} from './TransferLinkAccount';
const TRANSFERLINK_PATH='Transfers/TransferLink'

interface PropsCreate{
    open:boolean,
    onclose():void
}


const TransferLinkCreate=({open,onclose}:PropsCreate)=>{
    const formref=useRef<HTMLFormElement>(null)
    const [state,setState]=useContext(AsaStateContext)
    const [response,setresponse]=useState<string|null>()
    const [isCreating,setIsCreating]=useState(false)
    const onSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       
        const data = new FormData(e.target as HTMLFormElement);
       
        const objectData=Object.fromEntries(data.entries());
        setIsCreating(true)
        const createData:ITransferLink={
            linkName:objectData.linkName as string,
            amount:parseFloat(`${objectData.amount}`),
            linkCode:'',
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
        const result=await apiCallPost<IAsaResponse<ITransferLink[]>>('Transfers/TransferLink/Create',createData,state)
        console.log(result)
        setresponse(result?.message)
        setIsCreating(false)
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
            <Modal.Header closeButton onClick={()=>onclose() } >
              <Modal.Title className=''>Create new transfer link</Modal.Title>
            </Modal.Header>
  
            <Modal.Body >
              <Form ref={formref} className='form-row p-3' onSubmit={(e)=> onSubmit(e)}>
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



                <Button  type="submit" disabled={isCreating}>Create</Button>
              </Form>
              <Row className='p-3 mb-2 bg-info text-white'>
                <Col >Response</Col>
                {!isCreating && <Col sm={8}>{response}</Col>}
                {isCreating && <Col sm={8}> <Spinner animation="grow" variant="warning" /></Col>}
              </Row>
              <Row >
              <Col className='text-center bg-success text-white fw-bold fs-5'>Available Accounts</Col>
              </Row>
              <Row><Accounts></Accounts></Row>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    )
}

export { TransferLinkCreate}