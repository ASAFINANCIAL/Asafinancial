import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col,Spinner } from 'react-bootstrap';
import {useAsaQuery} from '../hooks/asaQuery'
import { AsaStateContext} from '../components/asaStateProvider'
import axios ,{AxiosError} from "axios";
import {IAsaResponse} from '../services/apiCallService'
const ACCOUNTTYPE_PATH='Account/AccountTypes'
const LINKFI_URL='https://linkfi-api-qa.azurewebsites.net/api/'
//const LINKFI_URL='http://localhost:64245/api/'
interface Props {
    option?: any
    // any props that come into the component
}

const callHealthyOptionCheck =async (option:string,arg:any)=>{
    const { data } = await axios.get(LINKFI_URL+'HeartBeat/OptionCheck',
        {
            params: {
                option: option,
                arg:arg
        }
    })
        console.log(data)
        return data;

}
const callHealthyOption =async ()=>{
    const { data } = await axios.get(LINKFI_URL+'HeartBeat/Options')
        console.log(data)
        return data;

}
const HealthyOption=({option}:Props)=>{
    const [loading,setLoading]=useState(true)
    const [optState,setoptState]=useState<IAsaResponse<string>>()
    useEffect(() => {
        const getData=async ()=>{
            try{
               
                const data=await callHealthyOptionCheck(option.option,option.arg)
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
        <Col sm={4}>{option.description}</Col>
        {loading && 
         <Col>
            <Spinner animation="grow" variant="secondary" />
         </Col>
        }
        {!loading && optState && optState.status===200 && 
            <Col className='p-3 mb-2 bg-success text-white'>{optState.data}</Col>
        }
        {!loading && optState && optState.status!==200 && optState.status<400 &&
            <Col className='p-3 mb-2 bg-warning text-dark'>{optState.data}</Col>
        }
        {!loading && (!optState || optState.status>=400) && 
            <Col className='p-3 mb-2 bg-danger text-white'>Error</Col>
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
    if(!!!options){
        return (
            <Spinner animation="grow" variant="secondary" />
        )
    }

    return (

            <Container className='text-start asa-tab-data-in'>
              
                <Row className='fw-bold fs-4'>
                    <Col>service</Col>
                    <Col sm={4}>description</Col>
                    <Col>status</Col>
                </Row>
                {options.data.map((o:any)=><HealthyOption option={o}/> )}

            </Container>
        
    )

}
export default Healthy