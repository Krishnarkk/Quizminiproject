import React from "react";

const Category = ({ categories, selectCategory, setSelectCategory }) => {
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectCategory(selected === "All" ? "" : selected);
  };
  return (
    <div className="mt-4">
      <select
        id="categoryFilter"
        className="form-select"
        value={selectCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
