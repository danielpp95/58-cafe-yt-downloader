const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const sanitize = require('sanitize-filename')
const path = require('path');

app.use(cors());

app.use("/dist", express.static(__dirname + '/dist'));
app.use("/", express.static(__dirname + '/static'));

 
app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        res.sendFile(path.join(__dirname+'/index.dev.html'));
    }else{
        res.sendFile(path.join(__dirname+'/index.prod.html'));
    }
})

app.get('/info', async (req, res) => {
    var url = req.query.URL;

    if(url === ''){
        res.status(400);
res.send('None shall pass');
    }
    else if (!/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url)){
        res.sendStatus(400)
    }
    else {
        res.send(await ytdl.getBasicInfo(url));
    }
})

app.get('/download', async (req, res) => {
    var url = req.query.URL;
    var format = req.query.FORMAT;

    var info = await ytdl.getBasicInfo(url)
    var title = info.player_response.videoDetails.title
    // sanitize emoji
    title = title.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')

    res.setHeader('Content-disposition', 'attachment; filename=' + sanitize(title) + format);

    if (format === '.mp3') {
        var info = await ytdl.getBasicInfo(url)
        info.formats.forEach(format => {
            if (format.audio_channels) {
                if (format.type.includes('audio/mp4')) {
                    ytdl(url, {format: format}).pipe(res)
                   
                }
            }
        });
    }else{
        ytdl(url).pipe(res)
    }
})

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});