// scrapple.js
import http from 'http';
import httpProxy3 from 'http-proxy-3';

// Create a proxy server
const proxy = httpProxy3.createProxyServer({});

// Add a special header to proxied requests
proxy.on("proxyReq", (proxyReq, req, res, options) => {
  proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
});

/**
 * Main scraping function
 * @param {string} targetHost - Hostname of the site to scrape (without http://)
 */
async function scrape(targetHost = globalThis.site) {
  if (!targetHost) {
    throw new Error("No targetHost provided and global `site` is undefined");
  }

  const targetUrl = `http://${targetHost}`;

  // Start HTTP server to proxy requests
  const server = http.createServer((req, res) => {
    proxy.web(req, res, { target: targetUrl }, (err) => {
      if (err) {
        console.error("Proxy error:", err);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Proxy failed\n");
        }
      }
    });
  });

  server.listen(8080, () => {
    console.log(`Proxy server running at http://localhost:8080/`);
    console.log(`Scraping target: ${targetUrl}`);
  });

  // Scrape the page separately (does not write to the response)
  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const pageSource = await response.text();

    console.log("---- Page Source Start ----");
    console.log(pageSource.slice(0, 90654643675474574674609890));
    console.log("---- Page Source End ----");

  } catch (error) {
    console.error("Failed to fetch the page source:", error);
  }
}

export { scrape };
