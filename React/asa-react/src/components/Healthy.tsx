import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col,Spinner } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'
import axios ,{AxiosError} from "axios";
import {IAsaResponse} from '../services/apiCallService'
const ACCOUNTTYPE_PATH='Account/AccountTypes'
interface Props {
    option?: any
    // any props that come into the component
}

const callHealthyOptionCheck =async (option:string,arg:any)=>{
    const { data } = await axios.get('http://localhost:64245/api/HeartBeat/OptionCheck',
        {
            params: {
                option: option
        }
    })
        console.log(data)
        return data;

}
const callHealthyOption =async ()=>{
    const { data } = await axios.get('http://localhost:64245/api/HeartBeat/Options')
        console.log(data)
        return data;

}
const HealthyOption=({option}:Props)=>{
    const [loading,setLoading]=useState(true)
    const [optState,setoptState]=useState<IAsaResponse<string>>()
    useEffect(() => {
        const getData=async ()=>{
            try{
               
                const data=await callHealthyOptionCheck(option.option,undefined)
                setoptState(data)
                console.log(data)
            }
            catch(err){
                console.log(err)
                setoptState(undefined)
            }
            setLoading(false)
        }
        getData()

      },[]);
    return (
    <Row key={option.option}>
        <Col className='p-3 mb-2 bg-primary text-white'>{option.option}</Col>
        <Col>{option.arg}</Col>
        <Col sm={4}>{option.description}</Col>
        {loading && 
         <Col>
            <Spinner animation="grow" variant="secondary" />
         </Col>
        }
        {!loading && optState &&
            <Col className='p-3 mb-2 bg-success text-white'>{optState.data}</Col>
        }

    </Row>
    )
}
const Healthy=()=>{
    const [options,setOptions]=useState<any>(undefined)
    const [error,seterror]=useState<boolean>(false)
    useEffect(() => {
        const getData=async ()=>{
            try{
                seterror(false)
                const data=await callHealthyOption()
                setOptions(data)
                console.log(data)
            }
            catch(err){
                console.log(err)
                seterror(true)
            }
        }
        getData()

      },[]);
    if(error){
        return (
            <p><a href="#" className="text-danger">Error accessing</a></p>
        )
    }
    if(!options){
        return (
            <div>.........</div>
        )
    }

    return (

            <Container className='text-start asa-tab-data-in'>
                <Row className='fw-bold fs-4'>
                    <Col>option</Col>
                    <Col>arg</Col>
                    <Col sm={4}>description</Col>
                    <Col>status</Col>
                </Row>
                {options.data.map((o:any)=><HealthyOption option={o}/> )}

            </Container>
        
    )

}
export default Healthy