import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Skeleton,
  List,
  Avatar,
  Badge,
  Popconfirm,
  message,
  Drawer,
  Row,
  Col,
  Divider,
  Image,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
import { store } from "../fire/fire";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");
import Header from "../components/header/header";
import ReactAudioPlayer from "react-audio-player";
import ModalDetail from "../components/ModalDetail/ModalDetail";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function Home() {
  const [data, setData] = useState([]);
  const [isMounted, setMounted] = useState(true);
  const [drawer, setDrawer] = useState({ visible: false, selected: null });

  console.log(data);

  useEffect(() => {
    getData();

    return () => setMounted(false);
  }, []);

  const getData = async () => {
    setMounted(true);
    await store.collection("popular").onSnapshot(function (snapshot) {
      let firestore = [];

      snapshot.forEach(function (childSnapshot) {
        firestore.push({ ...childSnapshot.data(), id: childSnapshot.id });
      });

      isMounted && setData(firestore);
    });
  };

  const onDeleteItem = (id) => {
    store.collection("popular").doc(id).delete();
    message.success("Berhasil menghapus podcast");
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 50px", background: "white" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0", height: "100vh", background: "white" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
                <Menu.Item key="1">All</Menu.Item>
                <Menu.Item key="2">Podcast</Menu.Item>
                <Menu.Item key="3">Demo</Menu.Item>
                <Menu.Item key="4">Sleep</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px" }}>
            {data.length == 0 ? (
              <Skeleton />
            ) : (
              <List
                dataSource={data}
                // bordered
                renderItem={(item) => (
                  <Badge.Ribbon text={item.type}>
                    <List.Item
                      key={item.id}
                      actions={[
                        <Popconfirm
                          title="Are you sure to delete this podcast?"
                          onConfirm={() => onDeleteItem(item.id)}
                          onCancel={() => console.log("cancel")}
                          okText="Yes"
                          cancelText="No"
                        >
                          <a href="#">Delete</a>
                        </Popconfirm>,
                        <a
                          href="#"
                          onClick={() =>
                            setDrawer({ selected: item, visible: true })
                          }
                        >
                          View
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.cover} />}
                        title={
                          <a href="https://ant.design/index-cn">{item.title}</a>
                        }
                        actions={
                          <a href="https://ant.design/index-cn">{item.title}</a>
                        }
                        description={
                          <div>
                            <p>{item.description}</p>
                            <Badge
                              status="processing"
                              text={moment(
                                new Date(item.date.seconds * 1000)
                              ).format("Do MMMM YYYY")}
                            />
                            <div style={{ width: 100 }} />
                            <Badge
                              status="processing"
                              text={`Duration ${String(item.time / 60).slice(
                                0,
                                3
                              )} Mins`}
                            />
                          </div>
                        }
                      />
                    </List.Item>
                  </Badge.Ribbon>
                )}
              />
            )}
          </Content>
          <ModalDetail
            item={drawer.selected}
            visible={drawer.visible}
            onDismiss={() => setDrawer({ selected: null, visible: false })}
          />
        </Layout>
      </Content>
    </Layout>
  );
}
