const Database = require('./database_sqlite.js');
const Common = require('./common.js').Common;

class Data {
 constructor() {
  this.db = new Database();
 }

 async createDB() {
  try {
   await this.db.write('CREATE TABLE IF NOT EXISTS sources (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(64) NOT NULL)');
   await this.db.write('CREATE TABLE IF NOT EXISTS streams (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(64) NOT NULL, id_source INT NOT NULL, path TEXT NULL, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_source) REFERENCES sources(id))');
   await this.db.write('CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, id_stream INT NOT NULL, file TEXT NOT NULL, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_stream) REFERENCES streams(id))');
   await this.db.write('INSERT INTO sources (name) VALUES (?)', [ 'Web camera' ]);
   await this.db.write('INSERT INTO sources (name) VALUES (?)', [ 'IP camera' ]);
   await this.db.write('INSERT INTO sources (name) VALUES (?)', [ 'Video files' ]);
   await this.db.write('INSERT INTO streams (name, id_source, path) VALUES (?, ?, ?)', [ 'Example web camera stream', 1, '/dev/video0' ]);
   await this.db.write('INSERT INTO streams (name, id_source, path) VALUES (?, ?, ?)', [ 'Example IP camera stream', 2, 'rtsp://user:pass@server.tld:port/path' ]);
   await this.db.write('INSERT INTO streams (name, id_source, path) VALUES (?, ?, ?)', [ 'Example video files stream', 3, './video' ]);
   await this.db.write('INSERT INTO files (id_stream, file) VALUES (?, ?)', [ 3, 'video1.mp4' ]);
   await this.db.write('INSERT INTO files (id_stream, file) VALUES (?, ?)', [ 3, 'video2.mp4' ]);
  } catch (ex) {
   Common.addLog({ex});
   process.exit(1);
  }
 }
}

module.exports = Data;
