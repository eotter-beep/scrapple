import httpProxy3 from 'https://cdn.jsdelivr.net/npm/http-proxy-3@1.21.0/+esm'
const proxy = createProxyServer(options); // See below
const proxy = createProxyServer({});
function scrape() {
proxy.on("proxyReq", (proxyReq, req, res, options, socket) => {
  proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
});
  http.createServer((req, res, site) => {
    proxy.web(req, res, { target: "http://", site });
    try {
      const response = await fetch("http://", site);
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Get the response body as text (the HTML source)
      const pageSource = await response.text();
      
      // Log the source code to the console
      console.log(pageSource);
  
      // Or, you can display it on the current page
      document.getElementById('source-code-display').textContent = pageSource;
    
    } catch (error) {
      console.error('Failed to fetch the page source:', error);
    }
  }
  });
}
