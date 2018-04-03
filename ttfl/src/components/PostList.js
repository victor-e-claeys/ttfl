import React, { Component } from 'react';
import {IconButton, Paper, RaisedButton, TextField} from 'material-ui';
import {ActionSearch} from 'material-ui/svg-icons';
import moment from 'moment';
import Post from './Post';
import fullTextSearch from 'full-text-search';
import TrackVisibility from 'react-on-screen';

export default class PostList extends Component {
    constructor(props){
        super(props);
        this.searchEngine = new fullTextSearch({
            ignore_case: true,
            index_amount: 3,
            minimum_chars: 3
        });
        this.state = {
            page: 0,
            numberPosts: props.postsPerPage,
            search: '',
            sortby: 'created_time',
            posts: []
        }
        this.search = this.search.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
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
    getPosts(){
        const {numberPosts, page} = this.state;
        const {posts} = this.props;
        this.setState({
            posts: this.sortPosts(posts).slice(numberPosts * page, numberPosts)
        });
    }
    sortPosts(posts){
        const {sortby} = this.state;
        return posts.sort(function(a, b){
            return moment(a[sortby]).valueOf() < moment(b[sortby]).valueOf() ? 1 : -1;
        });
    }
    clearSearch(e){
        this.setState({
            search: ''
        });
        this.getPosts();
    }
    onSearchChange(e){
        this.setState({
            search: e.target.value
        });
    }
    searchEngineFilter(key, value){
        return key === 'message';
    }
    search(){
        const {search} = this.state;
        this.setState({
            posts: this.searchEngine.search(search)
        });
    }
    nextPage(){
        const {postsPerPage} = this.props;
        const {numberPosts} = this.state;
        this.setState({
            numberPosts: numberPosts + postsPerPage
        });
    }
    render() {
        const {numberPosts, page, posts, search} = this.state;
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
                    <RaisedButton style={{margin: '0 8px'}} label="Search" primary={true} onClick={this.search} />
                    <RaisedButton label="Clear" onClick={this.clearSearch} />
                </div>
            </Paper>
            <div className="post-list">
            {
            posts.map(post => {
                return(
                    <Post key={post.id} post={post} search={search} />
                );
            })
            }
            </div>
            {
                search === '' && this.props.posts.length > posts.length ?
                <a className='load-more' onClick={this.nextPage.bind(this)}>Load more</a> :
                null
            }
        </div>
      );
    }
  }