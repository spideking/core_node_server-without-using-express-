import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { userRouterEvent } from './router/user.router.js';

dotenv.config({
  path: './.env',
});

const server = createServer();

server.on('request', (req, res) => {
  const { url, method } = req;
  // console.log(req);

  switch (url) {
    case '/': {

      switch (method) {

        case 'GET': {
          userRouterEvent?.emit('/', req, res);
          break;
        }
        case 'POST': {
          userRouterEvent?.emit('/addFriends', req, res)
          break;
        }
      }
      break;
    }

    case '/friends': {
      userRouterEvent?.emit('/friends', req, res);
      break;
    }
    default: {
      res.writeHead(404, 'application/json');
      res.end(
        JSON.stringify({
          statusCode: 404,
          messageBody: '404! Not Found',
        }),
      );
    }
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server is listining at ${process.env.PORT}...`);
});
