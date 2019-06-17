import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostList from './components/PostList';
import './App.css';
import FacebookProvider from 'react-facebook';

const posts = require('./data/posts.json');

export default class App extends Component {
  render() {
    return (
      <FacebookProvider appId='188252438624563'>
        <div className="App">
          <AppBar>
            <Toolbar>
              <Typography variant="h6" color="inherit">
              The Tender For Law
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="container">
            <PostList posts={posts} postsPerPage={10} />
          </div>
        </div>
      </FacebookProvider>
    );
  }
}