import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText, Divider} from 'material-ui';
import moment from 'moment';
import Comment from './Comment';
import Loading from './Loading';
import TrackVisibility from 'react-on-screen';

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
        const moreCommentAmount = Math.max(Math.min(post.comments.length - numberCommentsDisplayed, numberCommentsToShow), 0);
        return(
            <Card className="post">
                <CardHeader
                    title={<a className="author" target="_blank" href={'https://www.facebook.com/' + post.from_id}>{post.from_name}</a>}
                    subtitle={moment(post.created_time).format('YYYY-MM-DD HH:mm')}
                    avatar={"https://graph.facebook.com/v2.12/" + post.from_id + "/picture?access_token"}
                />
                <CardText className="message">
                    {post.message}
                </CardText>
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
                                post.comments.slice(0, numberCommentsDisplayed).map(comment => {
                                    return(
                                    <Comment key={comment.id} comment={comment} />
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