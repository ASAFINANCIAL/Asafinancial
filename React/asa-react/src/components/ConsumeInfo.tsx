import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'

const CONSUMER_PATH='Consumer'

const ConsumerInfo=()=>{
    const [state,setState]=useContext(AsaStateContext)
    const {data} = useAsaQuery([CONSUMER_PATH,state.asaConsumerCode],CONSUMER_PATH);
    return (
        <>
        {data &&
            <Container>
            <Row>
                <Col>AsaConsumerCode</Col>
                <Col>{data.data.asaConsumerCode}</Col>
            </Row>
            <Row>
                <Col>Email</Col>
                <Col>{data.data.email}</Col>
            </Row>
            </Container>
        }
        </>
    )

}
export default ConsumerInfo