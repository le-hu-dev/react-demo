How to start a React project:

1. Solution 1. You Might Not Need a Toolchain.
* From [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html#quickly-try-jsx) get [an example HTML file with JSX ](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html):
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    
    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">

    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('root')
    );
	  
    </script>
    
  </body>
</html>
```
 - I start fiddling with `itunes.apple.com` API. A simple fetch is not enough because the API doesn't [support CORS](https://www.html5rocks.com/en/tutorials/cors/). But supports JSONP. After some research and optimisations I wrote a script:
```html
<script>
  function loadScript(url) {
    let {lastScript} = loadScript
    let	s = loadScript.lastScript = document.createElement('script');
    s.setAttribute('src', url);
    if(!HTMLScriptElement.prototype.isPrototypeOf(lastScript)){
      loadScript.lastScript = document.head.appendChild(s);
    } else
      document.head.replaceChild(s,lastScript)
  }
  loadScript.callback = response => {
        console.log(response);
        window.data = response;
  }
  function itunesSearch (_term) {
    let term = encodeURIComponent(_term).replace(/%20/g, '+')
    let url=`https://itunes.apple.com/search?term=${term}&limit=1&callback=loadScript.callback`
    loadScript(url)
  }
</script>
  ```
Try `fetch("https://itunes.apple.com/search?term=jack+johnson&limit=1")` and you will get 
```
Access to fetch at 'https://itunes.apple.com/search?term=jack+johnson&limit=1' 
from origin 'null' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
An workaround is a proxy server (https://cors.io): try
`fetch("https://cors.io/?https://itunes.apple.com/search?term=jack+johnson&limit=1",{mode: "cors"}).then(res=>res.json())`

The downside of this approach is that you don't get good support in VSCode

2. Solution 2. [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).
```
npx create-react-app itunes-search
```
which downloaded and created for me ~200MB of data!! The zipped archive takes a third ~65MB 

3. Solution 3. Use an [online code editor](https://www.quora.com/What-is-the-best-free-online-code-editor):
   - https://codesandbox.io/
   - https://stackblitz.com/edit/react-avgnkx
   - https://codepen.io/mesterum/pen/QopLvb
   
   All 3 allow you to sign in with an GitHub account and first 2 have VS Code inside.


```
1

2

3

4

5

6

7
```
