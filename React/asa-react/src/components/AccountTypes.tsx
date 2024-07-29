import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'

const ACCOUNTTYPE_PATH='Account/AccountTypes'
interface IAccountType{
    accountType:string,
    fullAccountType:string,
    description:number,

}

const renderAccountTypeLine=(a:IAccountType)=>
    <Row key={a.fullAccountType}>
        <Col>{a.accountType}</Col>
        <Col sm={6}>{a.description}</Col>
        <Col>{a.fullAccountType}</Col>
        
    </Row>
const AccountTypes=()=>{
    const [state]=useContext(AsaStateContext)
    const {data} = useAsaQuery<IAccountType[]>([ACCOUNTTYPE_PATH,state.asaConsumerCode],ACCOUNTTYPE_PATH);
    if(!data){
        return (
            <div>.........</div>
        )
    }
    if(data && data.status!==200){
        return(
            <Container className='text-start asa-tab-data'>
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

            <Container className='text-start asa-tab-data-in'>
                <Row className='fw-bold fs-4'>
                    <Col>accountType</Col>
                    <Col sm={6}>description</Col>
                    <Col>fullAccountType</Col>
                   
                </Row>
                {data.data.map((a)=>renderAccountTypeLine(a))}
            <Row>
                <Col>AsaConsumerCode</Col>
                <Col></Col>
            </Row>
            </Container>
        
    )

}
export default AccountTypes