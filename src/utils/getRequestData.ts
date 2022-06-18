import { IncomingMessage } from 'http';
import { IUser } from '../models/models';

export const getRequestData = (req: IncomingMessage): Promise<IUser> => {
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
          throw new Error('awdawdawd');
        }
      });
      req.on('error', (error) => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
      reject({ message: 'test' });
    }
  });
};
