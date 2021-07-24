import { List, Avatar, Badge, Popconfirm } from "antd";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

export default function ItemPodcast({ onDeleteItem, setDrawer, item }) {
  return (
    <Badge.Ribbon text={item.type}>
      <List.Item
        key={item.id}
        actions={[
          <Popconfirm
            title="Are you sure to delete this podcast?"
            onConfirm={() => onDeleteItem(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>,
          <a
            href="#"
            onClick={() => setDrawer({ selected: item, visible: true })}
          >
            View
          </a>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.cover} />}
          title={<a href="https://ant.design/index-cn">{item.title}</a>}
          actions={<a href="https://ant.design/index-cn">{item.title}</a>}
          description={
            <div>
              <p>{item.description}</p>
              <Badge
                status="processing"
                text={moment(new Date(item.date.seconds * 1000)).format(
                  "Do MMMM YYYY"
                )}
              />
              <div style={{ width: 100 }} />
              <Badge
                status="processing"
                text={`Duration ${String(item.time / 60).slice(0, 3)} Mins`}
              />
            </div>
          }
        />
      </List.Item>
    </Badge.Ribbon>
  );
}
