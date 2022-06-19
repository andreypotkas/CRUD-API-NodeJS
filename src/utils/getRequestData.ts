import { IncomingMessage } from 'http';
import { IUser } from '../models/models';
import http from 'http';

export const getRequestData = (
  req: IncomingMessage,
  res: http.ServerResponse
): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        if (
          JSON.parse(body).hobbies &&
          JSON.parse(body).username &&
          JSON.parse(body).age
        ) {
          resolve(JSON.parse(body));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: "Request body doesn't contain required fields",
            })
          );
        }
      });
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Internal Server Error',
        })
      );
    }
  });
};
