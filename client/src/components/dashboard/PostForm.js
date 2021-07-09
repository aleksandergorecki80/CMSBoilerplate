import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PostForm = ({ addPost, editPost, post, editMode }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [filename, setFilename] = useState('Add a photo');
  const [submited, setSubmited] = useState(false);
  const formData = { text, title, filename };

  useEffect(() => {
    if (editMode) {
      setText(post.text);
      setTitle(post.title);
    }
  }, []);

  const fileSelectedHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append('postImg', photo, photo.name)
    try {
      const res = await axios.post('api/posts/upload', fd, {
        onUploadProgress: progressEvent => {
          console.log('progress: ' + progressEvent.loaded / progressEvent.total * 100)
        }
      });
      setFilename(res.data.filename);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editPost(post._id, formData);
    } else {
      addPost(formData);
    }
    setText('');
    setTitle('');
    setSubmited(true);
  };

  if (submited) {
    return editMode ? (
      <Redirect to={`/posts/${post._id}`} />
    ) : (
      <Redirect to="/posts" />
    );
  }

  return (
    <div>
      {editMode ? <h3>Edit the post</h3> : <h3>Add a new post</h3>}
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
            margin: '10px 0 0 0 ',
          }}
        >
          <Form.Label>Post tekst</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            id="postPhoto"
            onChange={fileSelectedHandler}
          />
          <Button variant="secondary mt-2" onClick={fileUploadHandler}>
            Upload
          </Button>

        </Form.Group>
        <Button variant="success mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

PostForm.defaultProps = {
  editMode: false,
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func,
  post: PropTypes.object,
};

export default connect(null, { addPost })(PostForm);
