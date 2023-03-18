import config from '../config';
import { Pool } from 'pg';

const client: Pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
  max: 4 // max request
});

// Listenr for error on connection
client.on('error', (err: Error) => {
  console.log(err.message);
});
export default client;
