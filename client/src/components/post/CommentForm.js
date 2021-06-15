import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const formData = { text, title };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, formData);
    setText('');
  };
  return (
    <div>
      <h3>Add a comment</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <input type="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
