import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Layout, Menu, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
import { store } from "../fire/fire";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");
import Header from "../components/header/header";

const defaultProfile =
  "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  const getData = async () => {
    await store.collection("popular").onSnapshot(function (snapshot) {
      let firestore = [];

      snapshot.forEach(function (childSnapshot) {
        firestore.push(childSnapshot.data());
      });

      setData(firestore);
    });
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0", height: "100vh" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
                <Menu.Item key="1">Popular</Menu.Item>
                <Menu.Item key="2">Recomended</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {data.length == 0 ? (
              <Skeleton />
            ) : (
              <>
                {data.map((item, key) => {
                  return (
                    <Card {...{ key }}>
                      <Duration>
                        {String(item.time / 60).slice(0, 3)} Mins
                      </Duration>
                      <Delete
                        whileHover={{
                          opacity: 1,
                          transition: { duration: 0.4 },
                        }}
                      >
                        Delete
                      </Delete>
                      <img src={item.cover} alt="wave" />
                      <ImgProfile>
                        <img src={defaultProfile} alt="wave" />
                      </ImgProfile>
                      <CardTitle>
                        <p>{item.title}</p>
                      </CardTitle>
                      <CardDesc>
                        Tips to playing skateboard on the ramp
                      </CardDesc>
                      <CardInfo>
                        {moment(new Date(item.date.seconds * 1000)).format(
                          "Do MMMM YYYY"
                        )}{" "}
                        • Waskito
                      </CardInfo>
                    </Card>
                  );
                })}
              </>
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

const Card = styled(motion.div)`
  background-color: #252836;
  display: inline-block;
  margin: 8px;
  max-width: ${960 / 3.2 + "px"};
  perspective: 1000;
  position: relative;
  text-align: left;
  transition: all 0.3s 0s ease-in;
  width: ${960 / 3.2 + "px"};
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;

  img {
    max-width: ${960 / 3.2 + "px"};
  }
`;

const CardTitle = styled.div`
  position: relative;
  z-index: 0;
  font-family: poppins;
  background-color: #252836;
  padding: 15px;
  color: #b7b9d2;
`;

const CardDesc = styled.div`
  background-color: #252836;
  padding: 0px 15px 20px;
  font-family: poppins;
  color: #fff;
  font-size: 14px;
`;

const CardInfo = styled.div`
  background-color: #252836;
  padding: 0px 15px 20px;
  font-family: poppins;
  color: #808191;
  font-size: 14px;
`;

const Duration = styled.div`
  background: red;
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 5px 10px;
  font-family: poppins;
  font-size: 12px;
  background: #242730;
  opacity: 0.5;
  color: #fff;
  border-radius: 8px;
`;

const Delete = styled(motion.div)`
  cursor: pointer;
  background: red;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 10px;
  font-family: poppins;
  font-size: 12px;
  background: red;
  opacity: 0.5;
  color: #fff;
  border-radius: 8px;
`;

const ImgProfile = styled.div`
  width: 50px;
  height: 50px;
  right: 10px;
  top: 120px;
  position: absolute;
  border-radius: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    margin-left: auto;
  }
`;
