const connect = require('connect');
const url = require('url');

const app = connect();


function lab2Handler(req, res, next) {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/lab2' && req.method === 'GET') {
    const query = parsedUrl.query;
    const { method, x, y } = query;

    const numberX = parseFloat(x);
    const numberY = parseFloat(y);

    
    if (isNaN(numberX) || isNaN(numberY)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Invalid numbers for x or y." }));
      return;
    }

    let result;
    switch (method) {
      case 'add':
        result = numberX + numberY;
        break;
      case 'subtract':
        result = numberX - numberY;
        break;
      case 'multiply':
        result = numberX * numberY;
        break;
      case 'divide':
       
        result = numberX / numberY;
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid method. Use add, subtract, multiply, or divide." }));
        return;
    }

    
    const response = {
      operation: method, 
      x: x,
      y: y,
      result: result.toString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } else {
    next();
  }
}


app.use(lab2Handler);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});