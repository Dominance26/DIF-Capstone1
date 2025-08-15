import React from "react";
import Slider from "react-slick";
import "../styles/Home.css";

const Home = () => {
  const heroSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const productSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="home">
      {/* Hero Slider with Jumia-style images */}
      <Slider {...heroSettings} className="hero-slider">
        <div className="hero-slide">
          <img
            src="https://picsum.photos/1200/300?random=101"
            alt="Electronics Deals"
          />
        </div>
        <div className="hero-slide">
          <img
            src="https://picsum.photos/1200/300?random=102"
            alt="Fashion Sale"
          />
        </div>
        <div className="hero-slide">
          <img
            src="https://picsum.photos/1200/300?random=103"
            alt="Groceries Promo"
          />
        </div>
      </Slider>

      {/* Category Cards */}
      <div className="categories">
        {["Electronics", "Fashion", "Home", "Supermarket", "Beauty"].map(
          (cat, idx) => (
            <div className="category-card" key={idx}>
              <img
                src={`https://picsum.photos/150/150?random=${200 + idx}`}
                alt={cat}
              />
              <p>{cat}</p>
            </div>
          ),
        )}
      </div>

      {/* Product Carousel */}
      <h2 className="section-title">Top Picks for You</h2>
      <Slider {...productSettings} className="product-carousel">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div className="product-card" key={num}>
            <img
              className="product-img"
              src={`https://picsum.photos/200/200?random=${300 + num}`}
              alt={`Product ${num}`}
            />
            <h3>Product {num}</h3>
            <p>₦{(Math.random() * 10000 + 1000).toFixed(0)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
