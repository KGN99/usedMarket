import React from "react";
import { useSelector } from "react-redux";
import { useAxios } from "api";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "utils/storage/Cookie";
import { API_HOST } from "utils/Constants";
import "scss/Profile.scss";

export default function Profile() {
  const params = useParams();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.token);
  const logedUserPk = getUserData();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data: userProfileData, loading, error }, refetch] = useAxios({
    url: `/accounts/profile/${params.id}`,
    headers,
  });

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
                        navigate(`/accounts/profile/${logedUserPk}/update`)
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
      </div>
    );
  }
}
