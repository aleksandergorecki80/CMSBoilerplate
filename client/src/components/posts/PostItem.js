import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postActions';
import { Button, Card } from 'react-bootstrap';

import ThumbIcon from '../layout/Thumb';

const PostItem = ({
  auth,
  post: { _id, user, userName, avatar, title, text, likes, comments, date, filename },
  addLike,
  removeLike,
  deletePost,
  showLink,
  showActions,
  match
}) => {


 return (
    <Fragment>
      <Card className="mb-3 mt-3">
      <Card.Img variant="top" src={`/uploads/${filename}`} className="post-img"/>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {showLink ? (
              <h3>
                <Link
                  to={`posts/${_id}`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  {title}
                </Link>
              </h3>
            ) : (
              <h3>{title}</h3>
            )}
        {showActions && auth.user && !auth.loading && user === auth.user._id && (

          <div>
            <Link to={`edit/${_id}`} className="btn btn-warning">Edit</Link> 
            <Button onClick={(e) => deletePost(_id)} variant="danger">
              DELETE
            </Button>
          </div>
        )}
          </Card.Title>
          <Card.Text>
            {showLink ? `${text.substr(0, 100)} ... ` : text}  
            {showLink && (
              <Link to={`posts/${_id}`}>Read more</Link> 
          )}
          </Card.Text>
          <footer className="blockquote-footer author-footer">
            Posted on: <Moment format="YYYY/MM/DD">{date}</Moment> by:
            <span> {userName}</span>
          </footer>
        </Card.Body>
        <Card.Footer className="text-muted d-flex">
          
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
          <span className="me-4">Likes: {likes.length} </span>
          <span>Comments: {comments.length}</span>
        </Card.Footer>
      </Card>
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
