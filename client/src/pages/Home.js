import ProductList from "components/ProductList";
import React from "react";
import "scss/Home.scss";

export default function Home() {
  return (
    <div className="app">
      <ProductList />
    </div>
  );
}
