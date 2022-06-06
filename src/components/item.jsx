import React from 'react';
import PropTypes from 'prop-types';
import { AiFillGift, AiOutlinePercentage } from 'react-icons/ai';

import Rating from './rating';

import './item.css';


function Item(props) {
  const {
    name, rating, img, time, isNew, promotion,
  } = props;

  return (
    <div className="item">
      {promotion === 'gift' && (
        <span className="icon green">
          <AiFillGift />
        </span>
      )}
      {promotion === '1+1' && (
        <span className="icon blue">
          {' '}
          <div>1+1</div>
        </span>
      )}
      {promotion === 'discount' && (
        <span className="icon pink">
          <AiOutlinePercentage />
        </span>
      )}

      <img src={img} alt={name} className="loading" />
      <span className="item-name">{name}</span>
      <span>
        <Rating value={rating} />
      </span>
      <span>
        <p>{`${time[0]} - ${time[1]} min`}</p>
      </span>
      {isNew && (
        <span>
          <p style={{ color: '#1ac29d' }}>New</p>
        </span>
      )}
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  time: PropTypes.arrayOf(PropTypes.number).isRequired,
  isNew: PropTypes.bool.isRequired,
  promotion: PropTypes.string.isRequired,
};

export default Item;
