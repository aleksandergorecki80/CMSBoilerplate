import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Progress = ({ percentage }) => {
    return (
<div>
  <ProgressBar striped animated variant="success" now={percentage} label={`${percentage} %`} />
</div>
    )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default Progress
