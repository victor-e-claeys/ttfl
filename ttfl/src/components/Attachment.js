import React, { Component } from 'react';
import {CardMedia, Paper} from 'material-ui';
import {EmbeddedPost} from 'react-facebook';
import TrackVisibility from 'react-on-screen';

export default class Attachment extends Component{
    render(){
        const {post} = this.props;
        if(post.type === 'video' && post.source.indexOf('https://www.youtube.com/embed/') !== -1){
            return(
                <TrackVisibility partialVisibility once>
                    {({isVisible}) => {
                        return(
                            <Paper style={{marginTop:8}}>
                                <div className="flex-video">
                                    <iframe src={isVisible ? post.source : ''} frameBorder="0" />
                                </div>
                                <div style={{cursor:'pointer',padding:'4px 12px'}} onClick={e => {window.open(post.link)}}>
                                    <h3>{post.name}</h3>
                                    <p>{post.description}</p>
                                </div>
                            </Paper>
                        );
                    }}
                </TrackVisibility>
            );
        }else if(post.type === 'link'){
            return(
                <Paper style={{cursor:'pointer',marginTop:8}} onClick={e => {window.open(post.link)}}>
                    <div style={{padding:'4px 12px'}}>
                        <h3>{post.name}</h3>
                        <p>{post.description}</p>
                    </div>
                </Paper>
            );
        }else if(post.link){
            return (
                <EmbeddedPost href={post.link} />
            );
        }else{
            return null;
        }
    }
  }