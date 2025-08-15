import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₦{product.price.toLocaleString()}</p>
      <Link to={`/product/${product.id}`} className="view-btn">View</Link>
    </div>
  );
};

export default ProductCard;
