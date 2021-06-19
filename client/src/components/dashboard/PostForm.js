import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { Form, Button } from 'react-bootstrap';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const formData = { text, title };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setText('');
    setTitle('');
  };
  return (
    <div>
      <h3>Add a new post</h3>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group>
          <Form.Label>Post title</Form.Label>
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
                margin: '10px 0 0 0 '
            }}
        >
          <Form.Label>Post tekst</Form.Label>
          <Form.Control as="textarea" 
            rows={10}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Form.Group>
        <Button variant="success mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
