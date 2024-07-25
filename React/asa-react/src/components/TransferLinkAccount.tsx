import React, { useState,useContext, useRef } from 'react';
import { Container, Row, Col, Form,Modal, Button,Navbar,Spinner } from 'react-bootstrap';
import {Config} from '../config'
import {useAsaQuery} from '../hooks/asaQuery'
import {callApiGet,apiCallPost} from '../services/apiCallService'
import Accounts from './Accounts';
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { IAsaResponse } from '../services/apiCallService';
import { ITransferLink } from '../global/types';
const TRANSFERLINK_PATH='Transfers/TransferLink'

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

export { TransferLinkAccount}