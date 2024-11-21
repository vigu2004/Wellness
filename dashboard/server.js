require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
  });
  
  const express = require('express');
  const React = require('react');
  const ReactDOMServer = require('react-dom/server');
  const App = require('./src/App'); // Your React App
  
  const server = express();
  
  server.use(express.static('public'));
  
  server.get('*', (req, res) => {
    const appString = ReactDOMServer.renderToString(<App />);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with React and Node</title>
          <script src="client.js" defer></script> <!-- Your client bundle -->
        </head>
        <body>
          <div id="root">${appString}</div>
        </body>
      </html>
    `);
  });
  
  server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });