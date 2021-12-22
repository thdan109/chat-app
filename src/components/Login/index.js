import { Button, Col, Row, Typography } from "antd";
import React from "react";
import firebase, { auth } from "../../Firebase/config";
import { addDocument, generateKeywords } from "../../Firebase/services";
// import {useHistory} from 'react-router-dom'

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
  // const history = useHistory()
  const handleFbLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    addDocument("users", {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      uid: user.uid,
      providerID: additionalUserInfo.providerId,
      keywords: generateKeywords(user.displayName),
    });
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng GG
          </Button>
          <Button style={{ width: "100%" }} onClick={() => handleFbLogin()}>
            Đăng nhập bằng FB
          </Button>
        </Col>
      </Row>
    </div>
  );
}
