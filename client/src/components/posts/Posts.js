import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/postActions';

const Posts = ({ getPosts, post: { posts, loading }, match}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <Spinner /> : (
        <Fragment>
                {posts.map((post) => {
                    return (
                        <PostItem key={post._id} post={post} match={match}/>
                    )
                })}
        </Fragment>
    );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts })(Posts);
