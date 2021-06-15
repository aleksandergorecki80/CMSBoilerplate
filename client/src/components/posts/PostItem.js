import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postActions';

const PostItem = ({
  auth,
  post: { _id, user, userName, avatar, title, text, likes, comments, date },
  addLike, 
  removeLike, 
  deletePost,
  showActions
}) => {
  return (
    <Fragment>
      <h3><Link to={`posts/${_id}`}>{title}</Link></h3>
      <p>{text}</p>
      <div>
        Posted on: <Moment format="YYYY/MM/DD">{date}</Moment> by:{' '}
        <span>{userName}</span>
        {auth.user && !auth.loading && user === auth.user._id && (
          <button onClick={e => deletePost(_id)}>DELETE</button>
        )}
      </div>
      <div>
        Likes: {likes.length}
        <button onClick={e => addLike(_id)}>Add Like</button>
        <button onClick={e => removeLike(_id)}>Remove Like</button>
      </div>
      <div>{comments.length > 0 && <p>Comments: {comments.length}</p>}</div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
