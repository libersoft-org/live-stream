const Common = require('./common.js').Common;
const WebServer = require('./webserver.js');
const fs = require('fs');

class App {
 constructor() {
  const args = process.argv.slice(2);
  switch (args.length) {
   case 0:
    this.startServer();
    break;
   case 1:
    if (args[0] === '--create-settings') this.createSettings();
    if (args[0] === '--create-database') this.createDatabase();
    if (args[0] === '--create-admin') this.createAdmin();
    else this.getHelp();
    break;
   default:
    this.getHelp();
    break;
  }
 }

 startServer() {
  try {
   this.loadSettings();
   const header = 'Live Stream Server';
   const dashes = '='.repeat(header.length);
   Common.addLog('');
   Common.addLog(dashes);
   Common.addLog(header);
   Common.addLog(dashes);
   Common.addLog('');
   this.webServer = new WebServer();
  } catch (ex) {
   Common.addLog(ex);
  }
 }

 getHelp() {
  Common.addLog('Command line arguments:');
  Common.addLog('');
  Common.addLog('--help - to see this help');
  Common.addLog('--create-settings - to create a default settings file named "' + Common.settingsFile + '"');
  Common.addLog('--create-database - to create a database defined in "' + Common.settingsFile + '" file.');
  Common.addLog('');
 }

 loadSettings() {
  if (fs.existsSync(Common.settingsFile)) {
   Common.settings = JSON.parse(fs.readFileSync(Common.settingsFile, { encoding:'utf8', flag:'r' }));
  } else {
   Common.addLog('Settings file "' + Common.settingsFile + '" not found. If you would like create a new settings file, use: node index.js --create-settings', 2);
   process.exit(1);
  }
 }

 createSettings() {
  if (fs.existsSync(Common.settingsFile)) {
   Common.addLog('Settings file "' + Common.settingsFile +  '" already exists. If you need to replace it with default one, delete the old one first.', 2);
   process.exit(1);
  } else {
   let settings = {
    db_file: 'live.db',
    log_to_file: true,
    log_file: 'live.log',
   }
   fs.writeFileSync(Common.settingsFile, JSON.stringify(settings, null, ' '));
   Common.addLog('Settings file was created sucessfully.');
  }
 }

 createDatabase() {
  this.loadSettings();
  const Data = require('./data.js');
  const data = new Data();
  data.createDB();
  Common.addLog('Database was created sucessfully.');
  Common.addLog('');
 }
}

module.exports = App;
