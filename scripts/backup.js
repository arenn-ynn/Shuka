import {db,dataDir} from '../backend/db.js'; import fs from 'node:fs'; import path from 'node:path';
const d=path.join(dataDir,'backups');fs.mkdirSync(d,{recursive:true}); const file=path.join(d,`shuka-${new Date().toISOString().slice(0,10)}.sqlite`); await db.backup(file); console.log(`Backup saved: ${file}`);
