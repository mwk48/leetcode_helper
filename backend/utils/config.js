import path, {dirname} from 'path';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env["PORT"] || 3001

const MONGODB_URI = process.env.NODE_ENV !== "test" 
? process.env["MONGODB_URI"] : process.env["TEST_MONGODB_URI"];

export default {
    MONGODB_URI,
    PORT
};

