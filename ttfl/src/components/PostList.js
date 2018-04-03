import React, { Component } from 'react';
import {IconButton, Paper, TextField} from 'material-ui';
import {ActionSearch} from 'material-ui/svg-icons';
import moment from 'moment';
import Post from './Post';
import fullTextSearch from 'full-text-search';
import TrackVisibility from 'react-on-screen';

export default class PostList extends Component {
    constructor(props){
        super(props);
        this.searchEngine = new fullTextSearch({
            ignore_case: false,
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
            posts: posts.slice(numberPosts * page, numberPosts)
        });
    }
    sortPosts(){
        const {sortby, posts} = this.state;
        this.setState({
            posts: posts.sort(function(a, b){
                return moment(a[sortby]).valueOf() > moment(b[sortby]).valueOf() ? 1 : -1;
            })
        }) 
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
            <Paper style={{padding:8}}>
                <TextField hintText="Search" onChange={this.onSearchChange.bind(this)} />
                <IconButton touch={true} onClick={this.search.bind(this)}>
                    <ActionSearch />
                </IconButton>
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
            <a className='load-more' onClick={this.nextPage.bind(this)}>Load more</a>
        </div>
      );
    }
  }