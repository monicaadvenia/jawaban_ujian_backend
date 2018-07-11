const express = require('express');
const app = express();
const os = require('os');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://monica:1234@localhost:27017/ujianbackend_no2';

MongoClient.connect(url, (err, db) => {
    console.log('Terhubung ke MongoDB!')
});

app.get('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('dataCPU');
        collection.find({}).toArray((err, docs) => {
            console.log(docs);
            res.send(docs);
        });
    });
});

app.post('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var dataOS = {
            namacpu: os.hostname(),
            tipe: os.type(),
            platform: os.platform(),
            rilis: os.release(),
            ramSisa: os.freemem(),
            ramTotal: os.totalmem()
        } 
        var collection = db.collection('dataCPU');
        collection.insert(dataOS, (err, result) =>{
            console.log(result);
            res.send(result);
        })
    });
});

app.listen(3000, () => {
    console.log('Server aktif di port @3000.')
});