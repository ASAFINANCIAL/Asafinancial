import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useAsaPostQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'

import 'bootstrap/dist/css/bootstrap.min.css';
import AllProps from './allprops';
const TRANSACTIONS_PATH='Transactions'

interface IRequestTransaction{
    asaConsumerCode:number
    [propName: string]: any;
}
interface IAccountInstance{
    account:IAccount
}
interface ITransaction{
    amount:number,
    description:string,
    transactiondate:string
    transactiontype:string
    transactionid:string
}

interface IBalance{
    available:number,
    current:number
}
interface IAccount{
    account_id:string,
    account_type:string,
    accountname:string,
    balances:IBalance
    transactions:ITransaction[]
}

const renderTransactionLine=(t:ITransaction)=>
    <Row key={t.transactionid}>
        <Col>{t.transactiondate}</Col> 
        <Col>{t.transactiontype}</Col> 
        <Col sm={6}>{t.description}</Col>
        <Col>{t.amount}</Col>
       
    </Row>
const renderAccount=(a:IAccount)=>
    <Container className='text-start'>
        <Row className='bg-primary text-white fw-bold fs-5'>Account Name {a.accountname}</Row>
        <AllProps src={a}/>
        <Row className='bg-secondary text-dark'>Balances
            <Row>
                <Col>available</Col>
                <Col>{a.balances.available}</Col>
            </Row>
            <Row>
                <Col>current</Col>
                <Col>{a.balances.current}</Col>
            </Row>
        </Row>
        <Row className='bg-light text-dark'>Transactions
            <Row className='bg-info text-white'>
                <Col>date</Col> 
                <Col>type</Col> 
                <Col sm={6}>description</Col>
                <Col>amount</Col>
            </Row>
                {a.transactions.map((t)=>renderTransactionLine(t))}
        </Row>
    </Container>
const Transactions=()=>{
    
    
    const [state]=useContext(AsaStateContext)
    //todo new state if we need change request body
    const body:IRequestTransaction={
        asaConsumerCode:state.asaConsumerCode,
        account_ids:[]
    }

    const {data} = useAsaPostQuery<IAccountInstance[]>([TRANSACTIONS_PATH,state.asaConsumerCode],TRANSACTIONS_PATH,body);
   
    if(data && data.status!==200){
        return(
            <Container className='text-start asa-tab-data-in'>
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
            <Container className='text-start asa-tab-data-in'>
                 {data.data.map((a)=>renderAccount(a.account))}
            </Container>
        }
        </>
    )

}
export default Transactions