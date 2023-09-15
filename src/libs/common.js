const fs = require('fs');
const os = require('os');

class Common {
 static appName = 'Live Stream Server';
 static appVersion = '0.01';
 static settingsFile = 'settings.json';
 static settings;

 static addLog(message, type = 0) {
  const date = this.getDateTime();
  const msg = message == undefined ? '' : message;
  let typeText = 'INFO';
  let color = '\x1b[32m';
  switch (type) {
   case 1:
    typeText = 'WARNING'; 
    color = '\x1b[33m';
   case 2:
    typeText = 'ERROR'; 
    color = '\x1b[31m';
  }
  console.log('\x1b[96m' + date + '\x1b[0m - ' + color + typeText + '\x1b[0m: ' + msg);
  if (this.settings && this.settings.log_to_file) fs.appendFileSync(this.settings.log_file, date + ' - ' + typeText + ': ' + msg + os.EOL);
 }

 static getDateTime() {
  function toString(number, padLength) { return number.toString().padStart(padLength, '0'); }
  const date = new Date();
  return toString(date.getFullYear(), 4)
   + '-' + toString(date.getMonth() + 1, 2)
   + '-'  + toString(date.getDate(), 2)
   + ' ' + toString(date.getHours(), 2)
   + ':'  + toString(date.getMinutes(), 2)
   + ':'  + toString(date.getSeconds(), 2);
 }

 static getDatePlusSeconds(date, seconds) {
  return new Date(date.setSeconds(date.getSeconds() + seconds));
 }
}

exports.Common = Common;
