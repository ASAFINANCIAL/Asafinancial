
class Config{
    static asaOpenApiUri= "https://localhost:5001/";
    static subscriptionKey="b98a2ffde7864380846ab6fb34e435e4";
    static asafintechCode= "12345678";
    static applicationCode= "1124"
    static authorizationKey= "4sd7FsVTY2V4sT+AuKpv";
    static baseAsaHeaders={
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key":Config.subscriptionKey,
                "X-ASA-Version":"1.07",
                "X-ASA-FintechCode":Config.asafintechCode,
                "X-ASA-FintechApplicationCode":Config.applicationCode,
                "X-ASA-FintechAuthorizationKey":Config.authorizationKey,

            }
}
module.exports = { Config }; 
