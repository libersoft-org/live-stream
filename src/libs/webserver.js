const fs = require('fs');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const { Common } = require('./common.js');

const app = express();
const socketPath = './tmp/server.sock';

class WebServer { 
 constructor() {
  app.use('/stream', (req, res) => {
   res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
   let ffmpegCommand = ffmpeg();
   switch (settingsFile.sourceType) {
    case 'webcam':
     ffmpegCommand = ffmpegCommand.input(settingsFile.sourcePath).inputFormat('v4l2');
     break;
    case 'ipcam':
     ffmpegCommand = ffmpegCommand.input(settingsFile.ipcamURL).inputFormat('rtsp');
     break;
    case 'files':
     for (const file of settingsFile.videoFiles) { ffmpegCommand = ffmpegCommand.input(file); }
     ffmpegCommand = ffmpegCommand.loop();
     break;
    default:
     throw new Error('Unknown source type');
   }
   ffmpegCommand.outputOptions(['-preset ultrafast', '-g 48', '-sc_threshold 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
    .toFormat('hls')
    .on('end', () => { Common.addLog('Stream finished.'); })
    .pipe(res, { end: true });
  });
  if (fs.existsSync(socketPath)) { fs.unlinkSync(socketPath); }
  app.listen(socketPath, () => {
   Common.addLog('Server running on Unix socket: ' + socketPath);
  });
  fs.chmodSync(socketPath, '777');
 }
}

module.exports = WebServer;
