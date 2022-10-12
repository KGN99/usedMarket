import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAxios } from "api";
import { Alert, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "utils/storage/Cookie";
import { API_HOST } from "utils/Constants";
import ProductView from "components/ProductView";
import "scss/Profile.scss";

export default function Profile() {
  const [productList, setProductList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.token);
  const logedUserPk = getUserData();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data: userProfileData, loading, error }, refetch] = useAxios({
    url: `/accounts/${params.id}`,
    headers,
  });

  const [{ data: myProductsList }] = useAxios({
    url: `/contents/products/?writer=${params.id}`,
    headers,
  });

  useEffect(() => {
    setProductList(myProductsList);
  }, [myProductsList]);

  if (userProfileData) {
    const { email, username, avatar_url } = userProfileData;
    return (
      <div className="main">
        <hr style={{ width: "100%" }} size="1" color="#000000" />
        <div className="profileImage">
          <div style={{ display: "flex" }}>
            <div>
              <img
                src={API_HOST + avatar_url}
                alt={username}
                style={{ height: 300, width: 300 }}
              />
            </div>
            <div className="profile_related">
              <p>이메일 : {email}</p>
              <p>닉네임 : {username}</p>
              <div className="profile_related_button">
                {params.id === logedUserPk && (
                  <div>
                    <Button
                      style={{
                        marginTop: 20,
                        marginRight: 20,
                        backgroundColor: "#aaaaaa",
                        width: 180,
                        height: 53,
                        fontSize: 20,
                        color: "white",
                      }}
                      onClick={() =>
                        navigate(`/accounts/${logedUserPk}/update`)
                      }
                    >
                      회원정보 수정
                    </Button>

                    <Button
                      style={{
                        marginTop: 20,
                        backgroundColor: "#aaaaaa",
                        width: 180,
                        height: 53,
                        fontSize: 20,
                        color: "white",
                      }}
                      onClick={() => navigate("/accounts/password_change")}
                    >
                      비밀번호 변경
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr style={{ width: "100%" }} size="1" color="#000000" />
        <div className="myProducts">내 상품</div>
        <hr style={{ width: "100%" }} size="1" color="#bbbbbb" />
        <div className="product_list" style={{ marginBottom: 50 }}>
          {productList && productList.length === 0 && (
            <Alert type="warning" message="상품이 없습니다. :-(" />
          )}
          {productList &&
            productList.map((product) => (
              <ProductView product={product} key={product.id} />
            ))}
        </div>
      </div>
    );
  }
}
