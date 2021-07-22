import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Layout,
  Upload,
  message,
} from "antd";
const { Content, Footer } = Layout;
import { UploadOutlined } from "@ant-design/icons";
import { store, storage } from "../fire/fire";
import ReactAudioPlayer from "react-audio-player";
import Header from "../components/header/header";

export default function AddPodcast() {
  const [componentSize, setComponentSize] = useState("default");
  const [fileUrl, setFileUrl] = useState("");
  const [form] = Form.useForm();
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  const customUpload = async ({ onError, onSuccess, file, onProgress }) => {
    setLoading(true);
    const refStorage = storage.ref(`/mp3/${file.uid}`);
    try {
      const image = refStorage.put(file, {
        customMetadata: { uploadedBy: "khalif", fileName: file.uid },
      });

      image.on(
        "state_changed",
        (snap) =>
          onProgress({
            percent: (snap.bytesTransferred / snap.totalBytes) * 100,
          }),
        (err) => onError(err),
        () => {
          onSuccess(null, image.metadata_);
          refStorage.getDownloadURL().then((response) => {
            form.setFieldsValue({ linkupload: response });
            setFileUrl(response);
          });
          setLoading(false);
        }
      );
    } catch (e) {
      onError(e);
      setLoading(false);
    }
  };

  const handleLoadMetadata = (meta) => {
    const { duration } = meta.target;
    setDuration(duration);
  };

  const onSubmit = (e) => {
    setLoading(true);

    store.settings({
      timestampsInSnapshots: true,
    });

    store
      .collection("popular")
      .add({
        title: e.title,
        album: e.album,
        cover: e.cover,
        type: e.type,
        date: new Date(e.date),
        time: duration,
        url: fileUrl,
        description: e.description,
      })
      .then((e) => console.log("response firebase", e));

    form.resetFields();

    setDuration(0);
    setFileUrl("");
    setLoading(false);

    message.success("Berhasil manambah data baru");
  };

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: componentSize }}
              size={"large"}
              onFinish={onSubmit}
              form={form}
            >
              <Form.Item label="Judul" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Link Cover" name="cover">
                <Input />
              </Form.Item>
              <Form.Item label="Album" name="album">
                <Input />
              </Form.Item>
              <Form.Item label="Category" name="type">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="podcast">Podcast</Select.Option>
                  <Select.Option value="sleep">Sleep</Select.Option>
                  <Select.Option value="motivation">Motivation</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tanggal" name="date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="File mp3" name="file">
                <Upload
                  customRequest={customUpload}
                  onChange={(e) => {
                    setFileUrl("");
                    form.setFieldsValue({ linkupload: "" });
                  }}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
              {fileUrl != "" && (
                <Form.Item label="File mp3" name="file">
                  <ReactAudioPlayer
                    src={fileUrl}
                    controls
                    onLoadedMetadata={handleLoadMetadata}
                  />
                </Form.Item>
              )}
              <Form.Item label="Link asset" name="linkupload">
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} htmlType="submit">
                  Button
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
