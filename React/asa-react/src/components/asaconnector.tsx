
import React, { useState,useContext } from 'react';
import { Container,  Button,Navbar } from 'react-bootstrap';
import {AsaStateContext} from './asaStateProvider'
import {  useDataLoader } from './dataloader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ConsumerInfo from "./ConsumeInfo";
import Transfer from "./Transfer";
import Transactions from "./Transactions";
import AccountTypes from "./AccountTypes";
import Holdings from "./Holdings";
import Healthy from "./Healthy";
import {apiCallAutorization} from '../services/apiCallService'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';



// we can't use state, due to event came from external source and state not accesible
var popupWindow: WindowProxy | null
var timer:NodeJS.Timeout | undefined
export default function AsaConnector() {
   
    const [state,setState]=useContext(AsaStateContext)
    const [popupState,setPopupState]=useState(false)
    const [setLoading,setError]=useDataLoader()
    const isLogged=!!state.token
   
    const loginwithasa=async ()=>{
        setError(false)
        setLoading(true)
        const asaauth=await apiCallAutorization()
        setLoading(false)
        if(!asaauth){
            setError(true)
             return
        }
        var uri = asaauth.data.message;
        showpopup("_blank",uri)
    }
    const logout=()=>{
        setState({asaConsumerCode:0,token:undefined})
    }
    const showpopup=(target:string,popupuri:string)=>{
        popupWindow = window.open(popupuri,target, "height=500,width=500");

        var cleartimer = setInterval(()=> { 
            if(popupWindow?.closed) {
                clearInterval(timer);
                closepopup()
            }
        }, 1000);
            // not working with different domain
            //popup_window.addEventListener("unload", (event) => {console.log(event)})
           // popup_window.addEventListener("load", (event) => {console.log(event)})
        window.addEventListener("message",eventListener,false,);
        timer=cleartimer;
        setPopupState(true)
    }
    const closepopup=()=>{
          
        clearInterval(timer);
        try{
                popupWindow?.removeEventListener("message",eventListener)
        }
        catch(err){
            console.error('security ',err)
        }
        popupWindow?.close();
        setPopupState(false)
     }
    const eventListener=(event:MessageEvent<any>)=>{
     
        if(event.source==popupWindow){
    
            if(event.data && event.data.type=="callback"){
                const searchParams = new URLSearchParams(event.data.hash.replace("?", ""));
                const newstate={...state}
                newstate.token=searchParams.get("access_token") ||  searchParams.get("bearerToken") || '';
                newstate.asaConsumerCode=parseInt(searchParams.get("asaconsumerCode") || '')

              
                setState(newstate);
               
                closepopup();
            }
        }

    } 
     
    return (
    <Container className='asa-container-main' >
        <Navbar className="asa-navbar asa-grey px-5 mx-5">
        <Container className='asa-grey'>
            <Navbar.Brand><img src='/favicon.ico' alt='OpenApi'/>  </Navbar.Brand>
            <Navbar.Brand className='asa-grey' href="#home">Asa Open API</Navbar.Brand>
            <Navbar.Toggle />
            {isLogged &&
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className='asa-grey' >
                    Signed in as: <a href="#login">{state.asaConsumerCode}</a>
                </Navbar.Text>
                <Button variant="outline-secondary" onClick={()=>logout()} >Logout</Button>
                </Navbar.Collapse>
            }
            {!isLogged &&
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="px-2 asa-grey">You are Not Looged in  </Navbar.Text>
                <Button variant="outline-success" onClick={()=>loginwithasa()} disabled={popupState}>Login</Button>
                </Navbar.Collapse>
            }
        </Container>
        </Navbar>
        <Container className='asa-container-data'>
                <Tabs >
                <TabList className='fw-bold fs-4 asa-nav-tab'>
                    <Tab>General</Tab>
                    <Tab disabled={!isLogged}>ConsumerInfo</Tab>
                    <Tab disabled={!isLogged}>Transfer</Tab>
                    <Tab disabled={!isLogged}>Transactions</Tab>
                    <Tab disabled={!isLogged}>Holdings</Tab>
                    <Tab>AccountTypes</Tab>
                    <Tab>Healthy</Tab>
                </TabList>
                <TabPanel>
                    
                </TabPanel>
                <TabPanel>
                    <ConsumerInfo/>
                </TabPanel>
                <TabPanel>
                    <Transfer/>
                </TabPanel>
                <TabPanel>
                    <Transactions/>
                </TabPanel>
                <TabPanel>
                    <Holdings/>
                </TabPanel>
                <TabPanel>
                    <AccountTypes/>
                </TabPanel>
                <TabPanel>
                    <Healthy/>
                </TabPanel>
                </Tabs>
        </Container>
     </Container>
    )
  }





