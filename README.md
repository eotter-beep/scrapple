# Scrapple

Scrapple is a open-source web scraping tool written in Node.js.  
It spins up a local HTTP proxy, forwards requests to a target host, and also fetches the raw page source for inspection.  

---

## Features

- Local HTTP proxy (default port: `8080`)
- Adds a custom header (`X-Special-Proxy-Header: foobar`) to proxied requests
- Fetches and logs the full HTML source of the target site
- Minimal setup, no heavy frameworks

---

## Installation

Clone this repo and install dependencies:

```bash
git clone https://github.com/eotter-beep/scrapple.git
cd scrapple
npm install
```

Read our wiki to learn Scrapple!
