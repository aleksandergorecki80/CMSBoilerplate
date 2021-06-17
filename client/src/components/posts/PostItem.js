import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postActions';
import { Button } from 'react-bootstrap';
import ThumbIcon from '../layout/Thumb';

const PostItem = ({
  auth,
  post: { _id, user, userName, avatar, title, text, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showLink,
  showActions,
}) => {
  return (
    <Fragment>
      {showLink ? (
        <h3>
          <Link to={`posts/${_id}`}>{title}</Link>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}

      <p>{text}</p>
      <div>
        Posted on: <Moment format="YYYY/MM/DD">{date}</Moment> by:{' '}
        <span>{userName}</span>
        {showActions &&
          auth.user &&
          !auth.loading &&
          user === auth.user._id && (
            <button onClick={(e) => deletePost(_id)}>DELETE</button>
          )}
      </div>
      <div>
        Likes: {likes.length}
        {showActions && (
          <Fragment>
            <div onClick={(e) => addLike(_id)}>
              <ThumbIcon onClick={(e) => addLike(_id)} />
            </div>
            <div onClick={(e) => removeLike(_id)}>
              <ThumbIcon rotate={180} onClick={(e) => removeLike(_id)} />
            </div>
          </Fragment>
        )}
      </div>
      <div>{comments.length > 0 && <p>Comments: {comments.length}</p>}</div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showLink: true,
  showActions: false,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  showLink: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
