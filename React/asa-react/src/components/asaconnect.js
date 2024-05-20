import { Config } from "./config.js";
import React, { useState } from 'react';

var popUpWindow;
class UserContext{
    loginuri;
    accesstoken;
    asaconsumerCode;
}
export default function AsaConnector() {
    const [context, setcontext] = useState({...new UserContext()})
    return (
     <div> 
        <label>Asa connector</label>
        <br/>
        <label onClick={()=>loginwithasa(context,setcontext)} style={{cursor:'pointer',backgroundColor:"green"}} >Login with asa</label>
     
      { !context.accesstoken  &&
       <div>
        <label>
          You are not logged 
        </label>
        </div>
      }
      { context.accesstoken  &&
       <div>
        <label>
          You are logged IN
        </label>
        <br/>
        <label>AsaConsumerCode {context.asaconsumerCode} </label>
        <br/>
        <label>AsaConsumerCode {context.accesstoken} </label>
        <br/>
        <label  style={{cursor:'pointer',backgroundColor:"green"}} >Get User Info</label>
       </div>

      }
     </div>
    )
  }
async function loginwithasa(ctx,setHook){
    const asaauth=await fetchAutorization();
    if(!asaauth){
         return;
    }
    startListen(ctx,setHook)
    var uri = asaauth.data.message;
    popup("popUpDiv",uri)
}
function popup(n,popupuri){
    var uri =popupuri; 
    popUpWindow = window.open(uri,n, "height=500,width=500");
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
     const headers={...Config.baseAsaHeaders,
             "anyyourheader": "any your header value"
         }
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
             popUpWindow.close();
             popUpWindow=undefined;
         }, 1000);
     }
 }
 function startListen(ctx,setHook){
    console.log('start listen');
    window.addEventListener(
        "message",
        (event) => {
            if(event.source==popUpWindow){

                if(event.data && event.data.type=="callback"){
                    const searchParams = new URLSearchParams(event.data.hash.replace("?", ""));
                    ctx.accesstoken=searchParams.get("access_token") ||  searchParams.get("bearerToken");
                    ctx.asaconsumerCode=searchParams.get("asaconsumerCode")
                    for (const p of searchParams) {
                    //console.log(p);
                    }
                    console.log(event.data);
                    setHook({...ctx});
                    closepopup();
                }
            }
        },
        false,
        );
}
 async function userinfo(ctx){
     try
     {
      var headers;
      if(ctx.accesstoken){
         headers={...Config.baseAsaHeaders,
             Authorization: 'Bearer ' + ctx.accesstoken,
             "X-ASA-ConsumerCode":ctx.asaconsumerCode
         }           
      }
      const resp=await  fetch(Config.asaOpenApiUri+"Consumer",//"Authentication/UserInfo",
         {
             headers:headers
         }
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
  