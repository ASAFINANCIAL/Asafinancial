import React, { useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {useAsaPostQuery,useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'

import { INetworth,INetWorthTrend } from '../global/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProps from './allprops';
const NETWORTH_PATH='Balance/NetWorth'



const renderNetWorthTrend=(a:INetWorthTrend)=>
    <Container className='text-start' key={a.fIAccountName}>
        <Row >
            <Col>{a.fiAccountCalculatedBalance} </Col>
            <Col>{a.fiAccountCalculatedBalanceChange} </Col>
            <Col>{a.fiStatus} </Col>

        </Row>

    </Container>
const NetWorth=()=>{
    
    
    const [state]=useContext(AsaStateContext)
    //todo new state if we need change request body
 

    const {data,isFetching} = useAsaQuery<INetworth>([NETWORTH_PATH,state.asaConsumerCode],NETWORTH_PATH);
   
    if(data && data.status!==200){
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
        {isFetching &&
            <Row>
                 <Spinner animation="grow" variant="warning" />
            </Row>
        }
        {data &&
            <Container className='p-3 mb-2 bg-info text-white fw-bold fs-4'>
                  <Row>
                    <Col>networth</Col>
                    <Col>{data.data?.fiCalculatedBalance?.networth}</Col>
                 </Row>
                 <Row>
                    <Col>changeNetworth</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changeNetworth}</Col>
                 </Row>
                 <Row>
                    <Col>changePercent</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changePercent}</Col>
                 </Row>
                 <Row>
                    <Col>asset</Col>
                    <Col>{data.data?.fiCalculatedBalance?.asset}</Col>
                 </Row>
                 <Row>
                    <Col>changeAsset</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changeAsset}</Col>
                 </Row>
                 <Row>
                    <Col>changeAssetPercent</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changeAssetPercent}</Col>
                 </Row>
                 <Row>
                    <Col>changeAssetPercent</Col>
                    <Col>{data.data?.fiCalculatedBalance?.liability}</Col>
                 </Row>
                 <Row>
                    <Col>changeLiability</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changeLiability}</Col>
                 </Row>
                 <Row>
                    <Col>changeLiabilityPercent</Col>
                    <Col>{data.data?.fiCalculatedBalance?.changeLiabilityPercent}</Col>
                 </Row>
                 <Row className='fw-bold fs-4 bg-secondary text-dark'>
                    <Col>fiAccountCalculatedBalance</Col>
                    <Col>fiAccountCalculatedBalanceChange</Col>
                    <Col >fiStatus</Col>

                 </Row>

                 {data.data?.netWorthTrends?.map((a)=>renderNetWorthTrend(a))}
            </Container>
        }
        </>
    )

}
export default NetWorth