import { Drawer, Row, Col, Divider, Image, Spin } from "antd";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";
moment.locale("id");
import ReactAudioPlayer from "react-audio-player";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function ModalDetail({ visible, onDismiss, item }) {
  const [data, setData] = useState(null);

  if (item == null) {
    return <div></div>;
  }

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={() => {
        onDismiss();
        setData(null);
      }}
      visible={visible}
    >
      <Spin spinning={!data}>
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Detail
        </p>
        <p className="site-description-item-profile-p">Podcast</p>
        <Row>
          <Image
            width={400}
            src={item.cover}
            placeholder={
              <Image
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                width={200}
              />
            }
          />
        </Row>
        <br />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Judul" content={item.title} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Description" content={item.description} />
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Date"
              content={moment(new Date(item.date.seconds * 1000)).format(
                "Do MMMM YYYY"
              )}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Duration"
              content={`Duration ${String(item.time / 60).slice(0, 3)} menit`}
            />
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={12}>
            <ReactAudioPlayer
              src={item.url}
              controls
              onLoadedMetadata={(e) => {
                setData(e);
              }}
            />
          </Col>
        </Row>
        <Divider />
      </Spin>
    </Drawer>
  );
}
