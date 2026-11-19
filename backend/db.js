import Database from 'better-sqlite3';
import fs from 'node:fs'; import path from 'node:path';
export const dataDir=path.resolve(process.env.DATA_DIR||'./data'); fs.mkdirSync(dataDir,{recursive:true});
export const uploadsDir=path.join(dataDir,'uploads'); fs.mkdirSync(uploadsDir,{recursive:true});
export const db=new Database(path.join(dataDir,'shuka.sqlite'));
db.pragma('foreign_keys = ON'); db.pragma('journal_mode = WAL'); db.pragma('busy_timeout = 10000');
export const now=()=>new Date().toISOString();
export function migrate(){db.exec('CREATE TABLE IF NOT EXISTS _migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL) STRICT');const dir=path.resolve('migrations');for(const file of fs.readdirSync(dir).filter(n=>/^\d+.*\.sql$/.test(n)).sort()){if(!db.prepare('SELECT 1 FROM _migrations WHERE version=?').get(file)){db.transaction(()=>{db.exec(fs.readFileSync(path.join(dir,file),'utf8'));db.prepare('INSERT INTO _migrations VALUES(?,?)').run(file,now())})();console.log('Applied',file)}}}
