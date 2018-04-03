import React, { Component } from 'react';
import moment from 'moment';

export default class Comment extends Component{
    render(){
      const comment = this.props.comment;
      return(
        <div className="comment-wrapper">
          <div className="comment">
            <div className="author" title={moment(comment.created_time).format('YYYY-MM-DD HH:mm')}>{comment.from_name}</div>
            <div className="message">{comment.message}</div>
          </div>
        </div>
      );
    }
  }