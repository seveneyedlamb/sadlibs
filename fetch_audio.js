const fs = require('fs');
const https = require('https');

const url = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_f55e3deaa1.mp3?filename=internet-dial-up-modem-1-105051.mp3';
const dest = './audio/dialup.mp3';

https.get(url, (res) => {
    if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
        let fetchUrl = url;
        if (res.statusCode === 301 || res.statusCode === 302) {
            fetchUrl = res.headers.location;
            https.get(fetchUrl, (res2) => {
                const file = fs.createWriteStream(dest);
                res2.pipe(file);
                file.on('finish', () => { file.close(); console.log('Downloaded'); });
            });
            return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log('Downloaded'); });
    } else {
        console.error('Failed with status: ' + res.statusCode);
    }
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
