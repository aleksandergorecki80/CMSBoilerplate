import React, { useEffect, Fragment} from 'react';

import PropTypes from 'prop-types'
import { editPost, getPost } from '../../actions/postActions';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostForm from '../dashboard/PostForm';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const EditPost = ({ getPost, editPost, match,  post: { post, loading }}) => {
    useEffect(() => {
        getPost(match.params.id);
     }, [getPost]); 
    return (
        loading || post === null ? <Spinner /> : (<Fragment>
            <PostForm post={post} showActions={true} match={match} editPost={editPost} editMode={true}/>
            <CommentForm postId={post._id} />
            <div>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>)
    )
}

EditPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost, editPost })(EditPost);
