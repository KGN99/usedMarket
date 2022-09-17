import React, { useEffect, useState } from "react";
import { Alert, Pagination } from "antd";
import { useAxios } from "api";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ProductView from "components/ProductView";
import "scss/ProductList.scss";

export default function ProductSearch() {
  const [productList, setProductList] = useState();
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 20;
  const location = useLocation();
  const query = queryString.parse(location.search);
  const pageOnChange = (value) => {
    setPage(value);
  };
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data: originProductList, loading, error }, refetch] = useAxios({
    url: `/contents/products/?search=${query.search}`,
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
