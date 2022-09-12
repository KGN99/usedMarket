import React, { useEffect, useState } from "react";
import { Alert, Pagination } from "antd";
import { useAxios } from "api";
import { useSelector } from "react-redux";
import { getUserData } from "utils/storage/Cookie";
import ProductView from "./ProductView";
import "scss/ProductList.scss";

export default function ProductList() {
  const [productList, setProductList] = useState();
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 20;

  const pageOnChange = (value) => {
    setPage(value);
  };
  const { accessToken } = useSelector((state) => state.token);
  const logedUserPk = getUserData();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data: originProductList, loading, error }, refetch] = useAxios({
    url: "/contents/products/",
    headers,
  });

  useEffect(() => {
    setProductList(originProductList);
  }, [originProductList]);
  return (
    <div className="product_list_main">
      <div className="product_list">
        {productList && productList.length === 0 && (
          <Alert type="warning" message="상품이 없습니다. :-(" />
        )}
        {productList &&
          productList
            .slice(offset, offset + 20)
            .map((product) => (
              <ProductView product={product} key={product.id} />
            ))}
      </div>
      {productList && (
        <div className="product_list_pagination">
          <Pagination
            style={{ marginTop: 50 }}
            current={page}
            pageSize={20}
            total={productList.count}
            onChange={pageOnChange}
          />
        </div>
      )}
    </div>
  );
}
