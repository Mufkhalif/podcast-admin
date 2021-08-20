import React from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
export default class Header extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          <Link href="/addPodcast">Tambah Podcast baru</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
