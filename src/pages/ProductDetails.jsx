import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { CartContext } from '../context/CartContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find(item => item.id === parseInt(id));

  if (!product) return <h2 style={{ textAlign: "center" }}>Product not found</h2>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="details-container">
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-info">
        <h2>{product.name}</h2>
        <p className="details-description">{product.description}</p>
        <p className="details-price">₦{product.price.toLocaleString()}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
