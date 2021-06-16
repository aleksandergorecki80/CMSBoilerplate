import React, { Fragmant } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/postActions';
import { connect } from 'react-redux';

const CommentItem = ({ 
    postId, 
    comment: { _id, date, user, userName, title, text },
    deleteComment,
    auth
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
      <p>Added by: {userName} on <Moment format="DD/MM/YYYY">{date}</Moment></p>
      { !auth.loading && user === auth.user._id && (
          <button onClick={e => deleteComment(postId, _id)}>Delete</button>
      ) }
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment})(CommentItem);
