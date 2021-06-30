import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ postId, addComment, comment }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const formData = { text, title };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, formData);
    setTitle('');
    setText('');
  };

  useEffect(() => {
if(comment){
  setTitle(comment.title);
  setText(comment.text);
}
    console.log('ładuj')
  }, [comment])

  return (
    <div className="mb-3">
      <Fragment>
        <h4>Add a comment</h4>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group>
            <Form.Label>Comment title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group
            style={{
              margin: '10px 0 0 0 ',
            }}
          >
            <Form.Label>Comment tekst</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </Form.Group>
          <Button variant="success mt-2" type="submit">
            Submit
          </Button>
        </Form>
      </Fragment>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.post.post.comment_to_edition
})

export default connect(mapStateToProps, { addComment })(CommentForm);
