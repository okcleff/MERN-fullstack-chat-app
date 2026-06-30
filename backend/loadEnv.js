import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// dotenv는 기본적으로 process.cwd()의 .env를 읽는다.
// 서버를 어디서 실행하든(예: 루트에서 `nodemon backend/server.js`)
// 항상 backend/.env를 읽도록 이 파일 기준 절대 경로를 지정한다.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '.env') });
