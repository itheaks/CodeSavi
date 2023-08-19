function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

// server.js
const http = require('http');
const url = require('url');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;

// MongoDB Connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'registrationDB';
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a simple HTTP server
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/register') {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        const data = JSON.parse(body);
        
        // Connect to the MongoDB
        await client.connect();
        const db = client.db(dbName);
        const registrations = db.collection('registrations');
        
        // Insert the registration data into the database
        await registrations.insertOne(data);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Registration successful' }));
      });
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
