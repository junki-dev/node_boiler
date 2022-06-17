import dotenv from 'dotenv';
import path from 'path';

const load = () => {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.resolve('.env.production') });
  } else {
    dotenv.config({ path: path.resolve('.env.development') });
  }
};

export default load;
