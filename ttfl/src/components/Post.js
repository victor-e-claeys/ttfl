import React, { Component } from 'react';
import {Avatar, Card, CardActions, CardHeader, CardContent, Divider, IconButton, Icon} from '@material-ui/core';
import moment from 'moment';
import Attachment from './Attachment';
import Comment from './Comment';
import Loading from './Loading';
import TrackVisibility from 'react-on-screen';
import AutoLinkText from 'react-autolink-text2';
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise"

export default class Post extends Component{
    constructor(props){
      super(props);
      this.state = {
        numberCommentsToShow: 100,
        numberCommentsDisplayed: 2
      };
    }
    showMoreComments(){
        const {numberCommentsDisplayed, numberCommentsToShow} = this.state;
        this.setState({
            numberCommentsDisplayed: numberCommentsDisplayed + numberCommentsToShow
        });
    }
    render(){
        const {numberCommentsDisplayed, numberCommentsToShow} = this.state;
        const {post, search, comment} = this.props;
        const moreCommentAmount = Math.max(Math.min(post.comments.length - numberCommentsDisplayed, numberCommentsToShow), 0);
        const message = 
            search && search.length > 0 ? 
            post.message.replace(search, function(result){
                return '<span class="search-result">' + result + '</span>';
            }) :
            post.message;
        return(
            <Card className="post">
                <CardHeader
                    title={<a className="author" target="_blank" href={'https://www.facebook.com/' + post.from_id}>{post.from_name}</a>}
                    subheader={<a className="permalink" target="_blank" href={'https://www.facebook.com/' + post.id}>{moment(post.created_time).format('YYYY-MM-DD HH:mm')}</a>}
                    avatar={<Avatar alt={post.from_name} src={"https://graph.facebook.com/v2.12/" + post.from_id + "/picture?access_token"} />}
                    action={
                        <IconButton 
                            aria-label="Copy link" 
                            onClick={() => {
                                clipboard.writeText(window.location.href + '#post=' + post.id );
                            }}
                        >
                            <Icon>link</Icon>
                        </IconButton>
                    }
                />
                <CardContent className="message">
                    <AutoLinkText text={message} linkProps={{target:'_blank'}} />
                    <Attachment post={post} />
                </CardContent>
                <TrackVisibility once partialVisibility>
                    {({ isVisible }) => {
                        return isVisible 
                            ?
                            <CardActions className="post-footer">
                                {
                                    post.comments.length > 0 
                                    ?
                                    <div className="number-of-comments">
                                    {post.comments.length} comments
                                    </div>
                                    :
                                    null
                                }
                                {
                                (comment ? post.comments.filter(currentComment => currentComment.id === comment ) : post.comments.slice(0, numberCommentsDisplayed))
                                .map(comment => {
                                    return(
                                    <Comment key={comment.id} comment={comment} post={post} />
                                    );
                                })
                                }
                                {
                                    moreCommentAmount > 0 
                                    ?
                                    <div>
                                        <Divider />
                                        <a className="showMoreComments" onClick={this.showMoreComments.bind(this)}>Show {moreCommentAmount} more comments</a>
                                    </div>
                                    :
                                    null
                                }
                            </CardActions>
                            :
                            <Loading />;
                    }}
                </TrackVisibility>
            </Card>
        );
    }
  }