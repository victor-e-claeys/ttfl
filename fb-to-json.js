const moment = require('moment');
const fetch = require('node-fetch');
const FB = require('fb');

FB.setAccessToken(process.argv[3]);

//FB.api('/' + process.argv[2] + '/feed?from', console.log);
FB.api('/462493170453287_462528253783112?from', console.log);

/*
function getPosts(request){
    if(request.error){
        console.log(request.error)
    }if(request.paging && request.paging.next && page < startPage){
        page++
        fetch(request.paging.next)
            .then(res => res.json())
            .then(getPosts);
    }else{
        postCount += request.data.length;
        request.data.forEach(function(p){
            FB.api('/' + p.id + '?fields=id,created_time,description,from,full_picture,link,message,name,object_id,parent_id,properties,source,status_type,story,type', function(post){
                
                fetchComments(post.id).then(function(comments){
                    post.created_time = moment(post.created_time).valueOf();
                    posts[post.id] = post;
                    posts[post.id]['comments'] = comments;
                    console.log(Object.keys(posts).length, postCount);
                    if(Object.keys(posts).length === postCount){
                        if(request.paging && request.paging.next && page < pages + startPage){
                            page++
                            fetch(request.paging.next)
                                .then(res => res.json())
                                .then(getPosts);
                        }
                        writeToFile(startPage, page);
                    } 
                }).catch(console.log);
            });
        });
    }
}

function fetchComments(postID){
    return new Promise(function (fulfill, reject){
        var comments = [];
        FB.api('/' + postID + '/comments?fields=id', function(response){
            if(response.error){
                reject(response.error);
            }else if(response.data.length > 0){
                response.data.forEach(function(comment){
                    FB.api('/' + comment.id + '?fields=id,attachment,comment_count,created_time,from,message', function(comment){
                        if(comment.comment_count > 0){
                            fetchComments(comment.id).then(function(subcomments){
                                comment.subcomments = subcomments;
                                comments.push(comment);
                                if(comments.length === response.data.length) fulfill(comments);
                            });
                        }else{
                            comment.created_time = moment(comment.created_time).valueOf();
                            comments.push(comment);
                            if(comments.length === response.data.length) fulfill(comments);
                        }
                    });
                });
            }else{
                fulfill([]);
            }
        });
    });
}

*/