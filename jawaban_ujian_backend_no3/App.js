const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Plutoiscute123$',
    database: 'toko'
});

db.connect();

app.get('/karyawan', (req, res)=>{
    var sql = 'SELECT * FROM karyawan';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/karyawan', (req, res) => {
    let tglLahir = req.body.tglLahir;    
    let hariUser = parseInt(tglLahir.substr(0, 2));
    let bulanUser = parseInt(tglLahir.substr(3, 2));
    let tahunUser = tglLahir.substr(6, 4);
    let tahun = new Date();
    let tahunSekarang = tahun.getFullYear();

    var zod_signs = ["Capricorn" , "Aquarius", "Pisces", "Aries",
"Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
"Sagittarius"];

    let zodiacSign = "kenapa ya?";

    switch(bulanUser)
    {
        case 1: {//Januari
                if(hariUser < 20)
                    zodiacSign = zod_signs[0];
                else
                    zodiacSign = zod_signs[1];
                }break;
        case 2: {//Februari
                if(hariUser < 19)
                    zodiacSign = zod_signs[1];
                else
                    zodiacSign = zod_signs[2];
                }break;
        case 3: {//Maret
                if(hariUser < 21)
                    zodiacSign = zod_signs[2];
                else
                    zodiacSign = zod_signs[3];
                }break;
        case 4: {//April
                if(hariUser < 20)
                    zodiacSign = zod_signs[3];
                else
                    zodiacSign = zod_signs[4];
                }break;
        case 5: {//Mei
                if(hariUser < 21)
                    zodiacSign = zod_signs[4];
                else
                    zodiacSign = zod_signs[5];
                }break;
        case 6: {//Juni
                if(hariUser < 22)
                    zodiacSign = zod_signs[5];
                else
                    zodiacSign = zod_signs[6];
                }break;
        case 7: {//Juli
                if(hariUser < 23)
                    zodiacSign = zod_signs[6];
                else
                    zodiacSign = zod_signs[7];
                }break;
        case 8: {//Agustus
                if(hariUser < 23)
                    zodiacSign = zod_signs[7];
                else
                    zodiacSign = zod_signs[8];
                }break;
        case 9: {//September
                if(hariUser < 23)
                    zodiacSign = zod_signs[8];
                else
                    zodiacSign = zod_signs[9];
                }break;
        case 10: {//Oktober
                if(hariUser < 23)
                    zodiacSign = zod_signs[9];
                else
                    zodiacSign = zod_signs[10];
                }break;
        case 11: {//November
                if(hariUser < 22)
                    zodiacSign = zod_signs[10];
                else
                    zodiacSign = zod_signs[11];
                }break;
        case 12: {//Desember
                if(hariUser < 22)
                    zodiacSign = zod_signs[11];
                else
                    zodiacSign = zod_signs[0];
                }break;
    }

    var data = {
        nama: req.body.nama,
        hari: hariUser,
        bulan: bulanUser,
        tahun: tahunUser,
        zodiak: zodiacSign,
        usia: tahunSekarang - tahunUser
    }

    var sql = 'INSERT INTO karyawan SET ?';
    db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({
            status: 'POST SUKSES',
            nama: req.body.nama,
            hari: hariUser,
            bulan: bulanUser,
            tahun: tahunUser,
            zodiak: zodiacSign,
            usia: tahunSekarang - tahunUser
        });
    });
});

app.listen(3000, ()=> {
    console.log('Server @port 3000')
});