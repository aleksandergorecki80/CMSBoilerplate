import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteComment, getCommentToEdition } from '../../actions/postActions';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

const CommentItem = ({
  postId,
  comment: { _id, date, user, userName, title, text },
  deleteComment,
  auth,
  getCommentToEdition,
}) => {
  return (
    <div className="mb-2">
      <Fragment>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              {title}
              {!auth.loading && auth.token && user === auth.user._id && (
                <div>
                  <Button
                    onClick={(e) => getCommentToEdition(_id, title, text)}
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                  onClick={(e) => deleteComment(postId, _id)}
                  variant="danger"
                >
                  Delete
                </Button>
                </div>
              )}
            </Card.Title>
            <Card.Text>{text}</Card.Text>
            <footer className="blockquote-footer author-footer">
              Added by: {userName} on{' '}
              <Moment format="DD/MM/YYYY">{date}</Moment>
            </footer>
          </Card.Body>
        </Card>
      </Fragment>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getCommentToEdition: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getCommentToEdition, deleteComment })(CommentItem);
