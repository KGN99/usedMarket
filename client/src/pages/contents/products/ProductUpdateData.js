import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAxios } from "api";
import ProductUpdate from "./ProductUpdate";

export default function ProductDetailData() {
  const params = useParams();
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data, loading, error }, refetch] = useAxios({
    url: `/contents/products/${params.id}/`,
    headers,
  });

  return <div>{data && <ProductUpdate data={data} />}</div>;
}
