const fs = require('fs');
const moment = require('moment');
const comments = require('./ttfl/src/data/comment.json');
let posts = require('./ttfl/src/data/post.json');
let postComments = {};

posts.forEach(function(post, index){
    postComments[post.id] = [];
});

console.log('postComments object created');

comments.sort(function(a, b){
    return moment(a.created_time).valueOf() > moment(b.created_time).valueOf() ? 1 : -1;
}).forEach(function(comment, index){
    postComments[comment.post_id].push(comment);
});

console.log('comments added to postComments');

posts.forEach(function(post, index){
    posts[index].comments = postComments[post.id];
});

console.log('comments added to posts');

fs.writeFile("./ttfl/src/data/posts.json", JSON.stringify(posts), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 