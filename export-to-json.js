const SqliteJsonExport = require('sqlite-json-export');
const fs = require('fs');
const loki = require('lokijs');
const exporter = new SqliteJsonExport('ttfl.db');

var db = new loki('ttfl.json')

var posts = db.addCollection('posts');
exporter.json('select * FROM post', (err, data) => {
    posts.insert(data);
});

var comments = db.addCollection('comments');
exporter.json('select * FROM comment', (err, data) => {
    for(var i = 0; i < data.length; i++)
        comments.insert(data[i]);
});