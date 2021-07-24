import React, { useState } from "react";
import { Layout, Menu, Skeleton, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
import moment from "moment";
import "moment/locale/id";
moment.locale("id");
import Header from "../components/header/header";
import ModalDetail from "../components/ModalDetail/ModalDetail";
import ItemPodcast from "../components/Item/ItemPodcast";
import { useFirestore } from "../hooks/useFirestore";

export default function Home() {
  const { data, onDeleteItem } = useFirestore();
  const [drawer, setDrawer] = useState({ visible: false, selected: null });

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
                renderItem={(item) => (
                  <ItemPodcast {...{ item, setDrawer, onDeleteItem }} />
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
