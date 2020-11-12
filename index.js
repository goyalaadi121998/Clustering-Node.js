const cluster = require('cluster');

console.log(cluster.isMaster);

if(cluster.isMaster){
    // Cause running of index.js again
    //in slave mode 
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();

}else{

    const express = require('express');

    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {
            //console.log('Work');
        }
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there!');
    });

    app.get('/fast',function(req, res) {
        res.send('This is fast');
    });

    app.listen(3000,function(){
        console.log('listening');
    });

}

