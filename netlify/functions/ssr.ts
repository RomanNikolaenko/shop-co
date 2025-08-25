import path from 'path';
import { fileURLToPath } from 'url';

import { Handler } from '@netlify/functions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = await import(path.join(__dirname, '../../dist/shop-co/server/server.mjs'));

export const handler: Handler = async(event) => {
  try {
    const response = await server.default.handle(event);

    return {
      statusCode: response.statusCode || 200,
      headers: response.headers,
      body: response.body,
    };
  } catch (error) {
    console.error('SSR error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
