import { Config } from "../config.js";
import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
import {IAsaState, AsaStateContext} from '../components/asaStateProvider'
import { DataLoaderProvider, useDataLoader } from '../components/dataloader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ConsumerInfo from "./ConsumeInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
var popUpWindow:WindowProxy | null;
type SetAsaState=React.Dispatch<React.SetStateAction<IAsaState>>
export default function AsaConnector() {
   
    const [state,setState]=useContext(AsaStateContext)
    const [setLoading,setError]=useDataLoader()
    const loginwithasa=async ()=>{
        const asaauth=await fetchAutorization();
        if(!asaauth){
             return;
        }
        startListen(state,setState)
        var uri = asaauth.data.message;
        popup("popUpDiv",uri)
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
                Signed in as: <a href="#login">Mark Otto</a>
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
        {state.token &&
            <LoggedInfo/>
        }
    </Container>
     </>
    )
  }
const LoggedInfo=()=>{
    return (
<Tabs>
    <TabList>
      <Tab>ConsumerInfo</Tab>
      <Tab>Other</Tab>
    </TabList>
   
    <TabPanel>
        <ConsumerInfo/>
    </TabPanel>
    <TabPanel>
        Other
    </TabPanel>

    </Tabs>
    )
}
function popup(target:string,popupuri:string){
    var uri =popupuri; 
    popUpWindow = window.open(uri,target, "height=500,width=500");
 }
 async function fetchAutorization(){
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
         apiVersion: "1.07"
     }
     const headers={...Config.baseAsaHeaders}
     const url=Config.asaOpenApiUri+"Authentication/Authorization";
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
        
     }
 }


 function closepopup(){
     if(popUpWindow){
         setTimeout(() => {
             popUpWindow?.close();
             popUpWindow=null;
         }, 1000);
     }
 }
 function startListen(asaState:IAsaState,setAsaState:SetAsaState){
    console.log('start listen');
    window.addEventListener(
        "message",
        (event) => {
            if(event.source==popUpWindow){

                if(event.data && event.data.type=="callback"){
                    const searchParams = new URLSearchParams(event.data.hash.replace("?", ""));
                    const state={...asaState}
                    state.token=searchParams.get("access_token") ||  searchParams.get("bearerToken") || '';
                    state.asaConsumerCode=parseInt(searchParams.get("asaconsumerCode") || '')

                    console.log(event.data,state);
                    setAsaState(state);
                    closepopup();
                }
            }
        },
        false,
        );
}
 async function userinfo(asaState:IAsaState){
     try
     {
      var headers;
      if(asaState.token){
         headers={...Config.baseAsaHeaders,
             Authorization: 'Bearer ' + asaState.token,
             "X-ASA-ConsumerCode":asaState.asaConsumerCode
         }           
      }
      const resp=await  fetch(Config.asaOpenApiUri+"Consumer",
         //{
          //   headers:null//headers
         //}
      );
      if(!resp.ok){
         
         return;
      }
      
      const result=await resp.json();
     
     }
     catch(err)
     {
        
     }
 }
  