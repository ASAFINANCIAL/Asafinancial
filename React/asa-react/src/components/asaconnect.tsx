import { Config } from "../config.js";
import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { DataLoaderProvider, useDataLoader } from '../components/dataloader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ConsumerInfo from "./ConsumeInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

type SetAsaState=React.Dispatch<React.SetStateAction<IAsaState>>
interface IPopupData{
   popupWindow: WindowProxy | null,
   timer:NodeJS.Timeout | undefined
}

export default function AsaConnector() {
   
    const [state,setState]=useContext(AsaStateContext)
    const [popupState,setPopupState]=useState<IPopupData>({popupWindow:null,timer:undefined})
    const [setLoading,setError]=useDataLoader()
    const isLogged=!!!state.token
    const loginwithasa=async ()=>{
        const asaauth=await fetchAutorization();
        if(!asaauth){
             return;
        }
       
        var uri = asaauth.data.message;
        showpopup("_blank",uri)
        
    }
    const fetchAutorization=async ()=>{
        try
        {
        const mylocation=window.location.origin
        const body={
            asafintechCode: Config.asafintechCode,
            applicationCode: Config.applicationCode,
            authorizationKey: Config.authorizationKey,
            redirectUrl:mylocation+"/asasilent.html",
            redirectFailureUrl:mylocation+"/asasilenterror.html",
            subscriptionKey:Config.subscriptionKey,
            scope: "openid",
            apiVersion: Config.asaApiVersion
        }
        const headers={...Config.baseAsaHeaders}
        const url=Config.asaOpenApiUri+"Authentication/Authorization";
        setLoading(true)
        setError(false)
        const resp=await  fetch(url,
            {
                method:"POST",
                headers:headers,
                body:JSON.stringify(body)
            }
         );
         return await resp.json();
        }
        catch(err){
            setError(true)
        }
        finally{
            setLoading(false)
        }
    }
    const showpopup=(target:string,popupuri:string)=>{
        var uri =popupuri; 
        const popup_window = window.open(popupuri,target, "height=500,width=500");

        var timer = setInterval(()=> { 
            if(popup_window?.closed) {
                clearInterval(timer);
                closepopup()
            }
        }, 1000);
            // not working with different domain
            //popup_window.addEventListener("unload", (event) => {console.log(event)})
           // popup_window.addEventListener("load", (event) => {console.log(event)})
        startListen(popup_window)
        setPopupState({popupWindow:popup_window,timer:timer})
    }
    const closepopup=()=>{
        const {popupWindow,timer}= popupState       
        clearInterval(timer);
        popupWindow?.close();

     }
    const startListen =(src:WindowProxy|null)=>{
    
        window.addEventListener(
            "message",
            (event) => {
                if(event.source==src){
    
                    if(event.data && event.data.type=="callback"){
                        const searchParams = new URLSearchParams(event.data.hash.replace("?", ""));
                        const newstate={...state}
                        newstate.token=searchParams.get("access_token") ||  searchParams.get("bearerToken") || '';
                        newstate.asaConsumerCode=parseInt(searchParams.get("asaconsumerCode") || '')
    
                        console.log(event.data,state);
                        setState(newstate);
                       
                        closepopup();
                    }
                }
            },
            false,
            );
    }
     
    return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Asa Connect</Navbar.Brand>
        <Navbar.Toggle />
        {state.token &&
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href="#login">{state.asaConsumerCode}</a>
            </Navbar.Text>
            </Navbar.Collapse>
        }
         {!state.token &&
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>You are Not Looged in  </Navbar.Text>
            <Button variant="outline-success" onClick={()=>loginwithasa()}>Login</Button>
            </Navbar.Collapse>
        }
      </Container>
    </Navbar>
    <Container>
            <Tabs>
            <TabList>
                <Tab>Landing</Tab>
                <Tab disabled={isLogged}>ConsumerInfo</Tab>
                <Tab>Other</Tab>
            </TabList>
            <TabPanel>
                
            </TabPanel>
            <TabPanel>
                <ConsumerInfo/>
            </TabPanel>
            <TabPanel>
                Other
            </TabPanel>

            </Tabs>
    </Container>
     </>
    )
  }





