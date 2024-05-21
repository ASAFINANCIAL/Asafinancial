
const configuration = require("./config.js")  
const http = require('http');
const url = require('node:url');
const open =  (...args) => import('open').then(({default: open}) => open(...args));
const https = require('https');
const { userInfo } = require("os");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    });
var port = process.env.PORT || 1337;
const config=configuration.Config;
class UserContext{
    loginuri;
    accesstoken;
    asaconsumerCode;
}

//login with asa, main routine
loginWithAsa().then(async ctx=>
    {
        //enters when sucess with UserContext, containing accesstoken,asaconsumerCode
        //now any secure endpoints can be used
        //as example getting consumer info
        var userinfo=await asauserInfo(ctx)
        console.log("User info",userinfo);
    }
);

//establish login to ASA and receive asa Token
async function loginWithAsa(){
    const contx=new UserContext();
    //getting login url
    const authcontext=await asaAutorization(contx);
    if(!authcontext.loginuri){
        console.error("Failed to obtain login url");
    }
    //open browser with login url
    const browser=await open(authcontext.loginuri)
    //open listener ro receive redirect callback from browser
    var usercontext=await waitHttpRedirect(authcontext);
    browser.kill();
    console.log("Autorized user",usercontext);
    return usercontext;
}
//send asaautorization request
async function asaAutorization(contx){
    try
    {
    const body={
        asafintechCode: config.asafintechCode,
        applicationCode: config.applicationCode,
        authorizationKey: config.authorizationKey,
        redirectUrl:`http://localhost:${port}/cb.html`,
        redirectFailureUrl:`http://localhost:${port}/errorcb.html`,
        subscriptionKey:config.subscriptionKey,
        scope: "openid",
        apiVersion: "1.07"
    }
    const headers={...config.baseAsaHeaders,
            "anyyourheader": "any your header value"
        }
    const url=config.asaOpenApiUri+"Authentication/Authorization";
    const resp=await  fetch(url,
        {
            method:"POST",
            headers:headers,
            body:JSON.stringify(body),
            agent:httpsAgent

        }
     );
     const result= await resp.json();
     console.log("Autorization responded with result",result);
     return {...contx,loginuri: result.data.message};
     
     
    }
    catch(err){
        console.log(err);
    }
}
//open a listener to receive http callback/redirect
function waitHttpRedirect(contx){
    const promise=new Promise(function(resolve, reject){
        var timeoutId;
        const srvr= http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Processing ASA authorization\n');
            if(req.url && req.url.includes("cb.html")){
                resolve({...contx,... parseRedirectRequest(req)});
                clearTimeout(timeoutId);
                srvr.close();
            }
        });
        timeoutId=setTimeout(()=>{
            resolve({});
            srvr.close();
        },100000)
        srvr.listen(port);
    });
    return promise;
}
function parseRedirectRequest(reg){
    console.log("Receiving callback ",reg.url)
    const parsedurl=url.parse(reg.url);
    const searchParams = new URLSearchParams(parsedurl.hash || parsedurl.search);
   
    return {
        accesstoken:searchParams.get("access_token") ||  searchParams.get("bearerToken"),
        asaconsumerCode:searchParams.get("asaconsumerCode")
    }
}
//getting asauserinfo with received token
// any other secure asa function can be used by the same way
async function asauserInfo(context){
    try
    {
     var headers;
     if(context.accesstoken){
        headers={...config.baseAsaHeaders,
            Authorization: 'Bearer ' + context.accesstoken,
            "X-ASA-ConsumerCode":context.asaconsumerCode
        }           
     }
     const resp=await  fetch(config.asaOpenApiUri+"Consumer",
        {
            headers:headers,
            agent:httpsAgent
        }
     );
     if(!resp.ok){
        console.error("Failed get user info",resp.status);
        return null;
     }
     return await resp.json();
      
    }
    catch(err)
    {
        console.error("Failed get user info",err);
        return null;
    }
}