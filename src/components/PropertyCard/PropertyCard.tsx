"use client";

import React from 'react';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  title: string;
  price: string;
  address: string;
  area: string;
  rooms: string;
  image: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  price,
  address,
  area,
  rooms,
  image
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.price}>{price}</h3>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.address}>{address}</p>
        <div className={styles.details}>
          <span className={styles.area}>{area}</span>
          <span className={styles.rooms}>{rooms}</span>
        </div>
        <button className={styles.viewButton}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 