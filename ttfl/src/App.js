import React, { Component } from 'react';
import {AppBar, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Divider} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostList from './components/PostList';
import './App.css';

const posts = require('./data/posts.json');

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="The Tender For Law"
          />
          <div className="container">
            <PostList posts={posts} postsPerPage={10} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}