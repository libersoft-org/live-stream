const fs = require('fs');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const { Common } = require('./common.js');
const Data = require('./data.js');

const app = express();
const socketPath = './tmp/server.sock';

class WebServer { 
 async run() {
  const data = new Data();
  let streams = await data.getStreams();
  streams.forEach(stream => {
   this.addStream(stream, data);
  });
  if (fs.existsSync(socketPath)) { fs.unlinkSync(socketPath); }
  app.listen(socketPath, () => {
   Common.addLog('Server running on Unix socket: ' + socketPath);
  });
  fs.chmodSync(socketPath, '777');
 }

 addStream(stream, data) {
  app.use('/stream/:' + stream.id.toString(), async (req, res) => {
   console.log(stream);
   res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
   let ffmpegCommand = ffmpeg();
   switch (stream.id_source) {
    case 1:
     ffmpegCommand = ffmpegCommand.input(stream.path).inputFormat('v4l2');
     break;
    case 2:
     ffmpegCommand = ffmpegCommand.input(stream.path).inputFormat('rtsp');
     break;
    case 3:
     let files = await data.getFiles(stream.id);
     console.log('AA');
     console.log(files);
     console.log('BB');
     for (const file of files) { ffmpegCommand = ffmpegCommand.input(file); }
     ffmpegCommand = ffmpegCommand.loop();
     break;
    default:
     Common.addLog('Unknown stream type', 2);
   }
   ffmpegCommand.outputOptions(['-preset ultrafast', '-g 48', '-sc_threshold 0', '-hls_time 10', '-hls_list_size 0', '-f hls']).toFormat('hls').on('end', () => { Common.addLog('Stream finished.'); }).pipe(res, { end: true });
  });
 }
}

module.exports = WebServer;
