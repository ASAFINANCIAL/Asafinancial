import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'

const CONSUMER_PATH='Consumer'
interface IDataResponseConsumer{
    email:string,
    asaConsumerCode:number
    [propName: string]: any;
}
const ConsumerInfo=()=>{
    const [state]=useContext(AsaStateContext)
    const {data} = useAsaQuery<IDataResponseConsumer>([CONSUMER_PATH,state.asaConsumerCode],CONSUMER_PATH);
    return (
        <>
        {data &&
            <Container className='text-start'>
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