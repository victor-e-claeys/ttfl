import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Divider} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import jsonQuery from 'json-query';
import AppBar from 'material-ui/AppBar';
import './App.css';

const data = {
  comments: require('./data/comment.json'),
  posts: require('./data/post.json')
};

const numberCommentsToShow = 100;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="The Tender For Law"
        />
        <div className="App container">
        {
          data.posts.slice(0, 10).map(post => {
            return(
              <Post post={post} comments={jsonQuery('comments[*post_id=' + post.id + ']', {data:data})} />
            );
          })
        }
        </div>
      </MuiThemeProvider>
    );
  }
}

class Post extends Component{
  constructor(props){
    super(props);
    this.state = {
      numberCommentsDisplayed: 2
    };
  }
  showMoreComments(){
    this.setState({
      numberCommentsDisplayed: this.state.numberCommentsDisplayed + numberCommentsToShow
    });
  }
  render(){
    const post = this.props.post;
    const moreCommentAmount = Math.max(Math.min(this.props.comments.value.length - this.state.numberCommentsDisplayed, numberCommentsToShow), 0);
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
        <CardActions className="post-footer">
          <div className="number-of-comments">
            {this.props.comments.value.length} comments
          </div>
          {
            this.props.comments.value.sort((a,b) => {
              return moment(a.created_time).valueOf() > moment(b.created_time).valueOf() ? -1 : 1;
            }).slice(0, this.state.numberCommentsDisplayed).map(comment => {
              return(
                <Comment comment={comment} />
              );
            })
          }
          
          <Divider />
          <a className="showMoreComments" onClick={this.showMoreComments.bind(this)}>Show {moreCommentAmount} more comments</a>
        </CardActions>
      </Card>
    );
  }
}

class Comment extends Component{
  render(){
    const comment = this.props.comment;
    return(
      <div class="comment-wrapper">
        <div className="comment">
          <div className="author" title={moment(comment.created_time).format('YYYY-MM-DD HH:mm')}>{comment.from_name}</div>
          <div className="message">{comment.message}</div>
        </div>
      </div>
    );
  }
}

export default App;
