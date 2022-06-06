import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';

function Rating(props) {
  const { value } = props;

  return (
    <p>
      <AiFillStar />
      {value.toFixed(1)}
    </p>
  );
}

Rating.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Rating;
