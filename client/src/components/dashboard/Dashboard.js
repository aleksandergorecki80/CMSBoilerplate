import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';


const Dashboard = ( { getCurrentProfile, auth, profile } ) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return ( 
        <Fragment>
            Dashboard
        </Fragment>
     );
}
 
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired, 
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);