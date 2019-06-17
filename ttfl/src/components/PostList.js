import React, { Component } from 'react';
import {Paper, Button, TextField} from '@material-ui/core';
import moment from 'moment';
import Post from './Post';
import fullTextSearch from 'full-text-search';
import queryString from 'query-string';


export default class PostList extends Component {
    constructor(props){
        super(props);
        this.searchEngine = new fullTextSearch({
            ignore_case: true,
            index_amount: 3,
            minimum_chars: 3
        });
        const query = queryString.parse(window.location.hash);
        this.state = {
            page: 0,
            numberPosts: props.postsPerPage,
            search: query.search ? query.search : null,
            sortby: 'created_time',
            posts: [],
            post: query.post ? query.post : null,
            comment: query.comment ? query.comment : null
        }
    }
    componentWillMount(){
        const {posts} = this.props;
        for(var i = 0; i < posts.length; i++)
            this.searchEngine.add(posts[i], this.searchEngineFilter);
        this.getPosts();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.numberPosts !== this.state.numberPosts){
            this.getPosts();
        }
    }
    getPosts = () =>{
        const {numberPosts, page} = this.state;
        const {posts} = this.props;
        this.setState({
            posts: this.sortPosts(posts).slice(numberPosts * page, numberPosts)
        });
    }
    sortPosts(posts){
        const {sortby, post} = this.state;
        return posts.filter(function(currentPost){
            return post ? currentPost.id === post : true;
        }).sort(function(a, b){
            return moment(a[sortby]).valueOf() < moment(b[sortby]).valueOf() ? 1 : -1;
        });
    }
    clearSearch = (e) => {
        this.setState({
            search: ''
        });
        this.getPosts();
    }
    onSearchChange = (e) => {
        this.setState({
            search: e.target.value
        });
    }
    searchEngineFilter(key, value){
        return key === 'message';
    }
    search = () =>{
        const {search} = this.state;
        this.setState({
            posts: this.searchEngine.search(search)
        });
    }
    nextPage = () => {
        const {postsPerPage} = this.props;
        const {numberPosts} = this.state;
        this.setState({
            numberPosts: numberPosts + postsPerPage
        });
    }
    render() {
        const {posts, search, comment} = this.state;
      return (
        <div className="post-list-wrapper">
            <Paper style={{padding:8,overflow:'hidden'}}>
                <div style={{float:'right'}}>
                    <TextField 
                        hintText="Enter your query" 
                        value={search} 
                        onChange={this.onSearchChange} 
                        onKeyDown={(e) => {
                            console.log(e, e.key);
                            if(e.key === 'Enter'){
                                this.onSearchChange(e);
                                this.search();
                            }
                        }} 
                    />
                    <Button variant="contained" style={{margin: '0 8px'}} color="primary" onClick={this.search}>Search</Button>
                    <Button variant="contained" onClick={this.clearSearch}>Clear</Button>
                </div>
            </Paper>
            <div className="post-list">
            {
            posts.map(post => {
                return(
                    <Post key={post.id} post={post} search={search} comment={comment} />
                );
            })
            }
            </div>
            {
                search === '' && this.props.posts.length > posts.length ?
                <a className='load-more' onClick={this.nextPage.bind(this)}>Load more</a> :
                null
            }
            <Button variant="contained" color="primary" onClick={this.nextPage}>
                View more
            </Button>
        </div>
      );
    }
  }