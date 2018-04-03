import React, { Component } from 'react';
import moment from 'moment';
import AutoLinkText from 'react-autolink-text2';

export default class Comment extends Component{
    render(){
      const comment = this.props.comment;
      return(
        <div className="comment-wrapper">
          <div className="comment">
            <div className="author" title={moment(comment.created_time).format('YYYY-MM-DD HH:mm')}>{comment.from_name}</div>
            <div className="message"><AutoLinkText text={comment.message} linkProps={{target:'_blank'}} /></div>
          </div>
        </div>
      );
    }
  }