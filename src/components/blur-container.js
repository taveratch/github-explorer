import React, { PropTypes } from 'react';
import _ from 'lodash';

const BlurContainer = (props) => {
  const style = { transition: '1s', height: '100vh' };
  let additionalStyle = {};
  additionalStyle = props.blur ?
    { filter: 'blur(5px)' } : {};
  _.merge(style, additionalStyle);

  return (
    <div style={style}>
      {
        props.children
      }
    </div>
  );
};

BlurContainer.propTypes = {
  blur: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default BlurContainer;
