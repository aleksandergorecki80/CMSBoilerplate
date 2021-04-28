import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alertActions';

const Alert = ({ alerts, removeAlert }) => {
    return (alerts !== null && alerts.length > 0 && alerts.map((alert) => {
        return (<div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p>{ alert.msg } <button onClick={() => removeAlert(alert.id)}>X</button></p>
        </div>)
    })
   )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert)
