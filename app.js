const express = require('express');
const app = express();
const path = require('path');

// Statische Dateien aus dem "public" Ordner freigeben
app.use(express.static(__dirname + '/public'));

// Statische Dateien aus dem "build" Ordner von Three.js freigeben
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));

// Statische Dateien aus dem "jsm" Ordner von Three.js freigeben
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));


app.listen(3000, () => console.log('Visit http://127.0.0.1:3000'));
