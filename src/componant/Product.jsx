import React, { useState, useEffect } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter and sort products based on search query and sort option
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

      <ul>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category:{product.category}</p>
            {/* <p>{product.image}</p> */}
            <p>rating{product.rating}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Product;
