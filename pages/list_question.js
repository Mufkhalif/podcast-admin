import { useEffect, useState } from "react";
import { store, fire } from "../src/fire/fire";
import { uid } from "uid";
import firebase from "firebase/app";
import { List, Avatar, Layout, Row, Col } from "antd";
import Link from "next/link";

const { Content } = Layout;

export default function ListQuestion() {
  const [listQuestionRoom, setListQuestionRoom] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    store.collection("room_question").onSnapshot(function (snapshot) {
      let firestore = [];

      snapshot.forEach(function (childSnapshot) {
        firestore.push({ ...childSnapshot.data(), id: childSnapshot.id });
      });

      setListQuestionRoom(firestore);
    });
  };

  return (
    <Layout style={{ overflow: "hidden", background: "white" }}>
      <Content style={{ height: "100vh" }}>
        <Row gutter={16}>
          <Col
            className="gutter-row"
            span={24}
            style={{ padding: 30, margin: "0 auto" }}
          >
            <div style={{ padding: 30, margin: "0 auto" }}>
              <List
                itemLayout="horizontal"
                dataSource={listQuestionRoom}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link href={`/question/${item.id}`}>
                        <a key="list-loadmore-edit">Masuk Room</a>
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.nama_room}</a>}
                      description="Air limbah yang berasal dari industri tekstil sangat berbahaya. Air itu mengandung racun. Racun tersebut bisa mengganggu kesehatan manusia."
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
