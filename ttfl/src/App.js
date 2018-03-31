import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
  componentDidMount(){
    console.log(this.props.comments);
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
      <Card>
        <CardHeader
          title={post.from_name}
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
            this.props.comments.value.slice(0, this.state.numberCommentsDisplayed).map(comment => {
              return(
                <div class="comment-wrapper">
                  <div className="comment">
                    <div className="author">{comment.from_name}</div>
                    <div className="message">{comment.message}</div>
                  </div>
                </div>
              );
            })
          }
          <a className="showMoreComments" onClick={this.showMoreComments.bind(this)}>Show {moreCommentAmount} more comments</a>
        </CardActions>
      </Card>
    );
  }
}

export default App;
