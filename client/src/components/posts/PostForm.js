import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

const PostForm = ({ addPost }) => {
    const [ text, setText ] = useState('');
    const [ title, setTitle ] = useState('');
    const formData = { text, title }

    const onSubmit = e => {
        e.preventDefault();
        addPost(formData);
        setText('');
        setTitle('');
    }
    return (
        <div>
            <h3>Add a new post</h3>
            <form onSubmit={e => onSubmit(e)}>
                <input 
                    type='text' 
                    name='title' 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
                <textarea
                    onChange={e => setText(e.target.value)}
                    value={text}
                ></textarea>
                <input type='Submit' />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
