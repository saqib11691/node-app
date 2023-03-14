'use strict';

const express = require('express');
const axios = require("axios");
// Constants
const PORT = 8083;
const HOST = 'localhost';
const config = require('config');
const callport = config.get('server.port');
const callhost = config.get('server.host');
const baseUrl = "http://"+callhost+":"+callport+"/"
// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/call-python-app',async (req, res) => {
  try {
		const response = await axios({
      headers: { Accept: 'text/html, application/json, text/plain, */*' },
     proxy: false,

			url: baseUrl,
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
})
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});