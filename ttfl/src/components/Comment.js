import React, { Component } from 'react';
import {IconButton, Icon} from '@material-ui/core';
import moment from 'moment';
import AutoLinkText from 'react-autolink-text2';
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise"

export default class Comment extends Component{
    render(){
      const {comment, post} = this.props;
      return(
        <div className="comment-wrapper">
          <IconButton
            onClick={() => {
                clipboard.writeText(window.location.href + '#post=' + post.id + '&comment=' + comment.id );
            }}
            style={{
              float: 'right'
            }}
          >
            <Icon>link</Icon>
          </IconButton>
          <div className="comment">
            <div className="author" title={moment(comment.created_time).format('YYYY-MM-DD HH:mm')}>{comment.from_name}</div>
            <div className="message"><AutoLinkText text={comment.message} linkProps={{target:'_blank'}} /></div>
          </div>
        </div>
      );
    }
  }