import React from 'react';
import thumb from './thumb.gif'

const ThumbIcon = ({ rotate }) => {
    return (
        <div>
            <img src={thumb} 
                style={{
                     transform: `rotate(${rotate}deg)`,
                     cursor: 'pointer',
                     width: '25px',
                     margin: '0 5px'
                    }}
                alt={'thumb'}
            />
        </div>
    )
}

ThumbIcon.defaultProps = {
    rotate: 0
  }

export default ThumbIcon;
