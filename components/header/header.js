import { Layout, Menu } from "antd";
const { Header: Default } = Layout;
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [selected, setSelected] = useState("1");
  return (
    <Default className="header">
      <Menu theme="dark" mode="horizontal" selectedKeys={selected}>
        <Menu.Item key="1" onClick={() => setSelected("1")}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => setSelected("2")}>
          <Link href="/addPodcast">
            <a>Tambah</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Default>
  );
}
