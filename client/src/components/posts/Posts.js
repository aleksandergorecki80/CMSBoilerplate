import React, { Fragment, useEfect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEfect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div>
            posts
        </div>
    )
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts)
