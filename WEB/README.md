# Integration ASA Connection to Website

This example demonstrates the integration of ASA using pure vanilla JavaScript, without relying on any external libraries. The provided sources include two HTML files.

## Sources

### 1. `asalogin.html`
This simple web page contains two buttons:
- **Login with ASA**: Initiates the login routine with ASA, concluding by receiving a Bearer Token.
- **User Info**: Requests consumer information from a secured endpoint, requiring a valid Bearer Token.
At the begin of scipt two variables
- **accesstoken**
- **asaconsumerCode**

After success login they will contain valid access token and AsaCosumerCode

### 2. `asasilent.html`
This callback page appears upon the completion of the login process. While you can change its layout, the JavaScript code should remain unaltered.


## How to Use

### Scenario 1:
1. Place both static files (`asalogin.html` and `asasilent.html`) on your web server in any location.
2. Update the subscription and authorization key along with your details.
3. Open `https://yourwebsite/asalogin.html` in a browser.
4. Test the functionality by interacting with the buttons on the page.

### Scenario 2:
1. Integrate the JavaScript code from `asalogin.html` into any of your web pages.
2. Update the subscription and authorization key along with your details.
3. From your layout, assign calls to `loginwithasa()` to any button click event.
4. Ensure the `asasilent.html` file is present on your server.

By following these instructions, you can successfully integrate ASA connection functionality into your website using the provided example code.