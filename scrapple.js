// scrapple.js
import http from 'http';
import httpProxy3 from 'http-proxy-3';

const proxy = httpProxy3.createProxyServer({});

// Set a header on proxied requests
proxy.on("proxyReq", (proxyReq, req, res, options) => {
  proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
});

async function scrape(targetHost = "example.com") {
  const server = http.createServer(async (req, res) => {
    const targetUrl = `http://${targetHost}`;

    // Proxy the request
    proxy.web(req, res, { target: targetUrl }, (err) => {
      if (err) console.error("Proxy error:", err);
    });

    // Scrape the page
    try {
      const response = await fetch(targetUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pageSource = await response.text();

      console.log("---- Page Source Start ----");
      console.log(pageSource.slice(0, 1000)); // first 1000 chars
      console.log("---- Page Source End ----");

    } catch (error) {
      console.error("Failed to fetch the page source:", error);
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Scraping done! Check console.\n");
  });

  server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
  });
}

// Export the function if you want to call it elsewhere
export { scrape };
