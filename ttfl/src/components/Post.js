import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, Divider} from 'material-ui';
import moment from 'moment';
import Attachment from './Attachment';
import Comment from './Comment';
import Loading from './Loading';
import TrackVisibility from 'react-on-screen';
import AutoLinkText from 'react-autolink-text2';

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
        const {post} = this.props;
        const moreCommentAmount = post.comments ? Math.max(Math.min(post.comments.length - numberCommentsDisplayed, numberCommentsToShow), 0) : 0;
        return(
            <Card className="post">
                <CardHeader
                    title={<a className="author" target="_blank" href={'https://www.facebook.com/' + post.from_id}>{post.from_name}</a>}
                    subtitle={<a className="permalink" target="_blank" href={'https://www.facebook.com/' + post.id}>{moment(post.created_time).format('YYYY-MM-DD HH:mm')}</a>}
                    avatar={"https://graph.facebook.com/v2.12/" + post.from_id + "/picture?access_token"}
                />
                <CardText className="message">
                    <AutoLinkText text={post.message} linkProps={{target:'_blank'}} />
                    <Attachment post={post} />
                </CardText>
                <TrackVisibility once partialVisibility>
                    {({ isVisible }) => {
                        return isVisible 
                            ?
                            <CardActions className="post-footer">
                                {
                                    post.comments && post.comments.length > 0 
                                    ?
                                    <div className="number-of-comments">
                                    {post.comments.length} comments
                                    </div>
                                    :
                                    null
                                }
                                {
                                post.comments ? 
                                post.comments.slice(0, numberCommentsDisplayed).map(comment => {
                                    return(
                                    <Comment key={comment.id} comment={comment} />
                                    );
                                }) :
                                null
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