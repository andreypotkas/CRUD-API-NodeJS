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
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
