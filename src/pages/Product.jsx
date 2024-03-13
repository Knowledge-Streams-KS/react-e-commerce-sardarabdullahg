import React, { useState, useEffect } from "react";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "ascPrice") {
        return a.price - b.price;
      } else if (sortOption === "descPrice") {
        return b.price - a.price;
      } else if (sortOption === "ascTitle") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "descTitle") {
        return b.title.localeCompare(a.title);
      } else {
        return 0; // No sorting
      }
    });

  return (
    <>
      <h1>Product</h1>

      <div>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="ascPrice">Price - Ascending</option>
          <option value="descPrice">Price - Descending</option>
          <option value="ascTitle">Title - Ascending</option>
          <option value="descTitle">Title - Descending</option>
        </select>
      </div>

      <div className="product-container">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <p>{product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.title} />
            <p>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .product-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .product-card {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        img {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </>
  );
}

export default Product;
