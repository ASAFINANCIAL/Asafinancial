
class Config{
    static asaOpenApiUri= "https://openapi.asacore.com/";
    static subscriptionKey="b411117506864076ab565e85cde3114f";
    static asafintechCode= "962922346";
    static applicationCode= "2009"
    static authorizationKey= "4BQGMJ2NBeBKN4c7qvEc";
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
