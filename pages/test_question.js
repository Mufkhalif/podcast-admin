import { useEffect, useState } from "react";
import { store, fire } from "../fire/fire";
import { uid } from "uid";
import firebase from "firebase/app";
import { Layout, Row, Col, Typography, Divider, Button, message } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const minutes = parseInt(
  (Math.floor(
    new Date(1629354906520).getTime() - new Date(1629354666521).getTime()
  ) /
    (1000 * 60)) %
    60
);

const increaseMinute = (minute = null) => {
  let timeObject = new Date();
  return timeObject.setTime(
    minute
      ? timeObject.getTime() + minute * 1000 * 60
      : timeObject.getTime() + 1
  );
};

const listQuestion = [
  {
    no: 1,
    id_question: uid(12),
    type: "inggris",
    question: "apa bahasa inggrisnya sepeda 2",
    answer: [
      {
        id: "A",
        label: "CAR",
      },
      {
        id: "B",
        label: "BIKECYCLE",
      },
      {
        id: "C",
        label: "BIKECYCLES",
      },
    ],
    correct_answer: "C",
    start_time: increaseMinute(),
    end_time: increaseMinute(2),
    point_correct: 10,
    point_incorrect: 0,
  },
  {
    no: 2,
    id_question: uid(12),
    type: "inggris",
    question: "apa bahasa inggrisnya apel",
    answer: [
      {
        id: "A",
        label: "APPLE",
      },
      {
        id: "B",
        label: "KING FRUIT",
      },
      {
        id: "C",
        label: "Grappe",
      },
    ],
    correct_answer: "A",
    start_time: increaseMinute(2),
    end_time: increaseMinute(4),
    point_correct: 10,
    point_incorrect: 0,
  },
];

const listUser = [
  {
    id_user: uid(5),
    username: "ahmad",
  },
  {
    id_user: uid(5),
    username: "juki",
  },
  {
    id_user: uid(5),
    username: "yayan",
  },
];

export default function TestQuestion() {
  const [detail, setDetail] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // console.log(minutes);

  // console.log("currentTime", time);
  // console.log("````");

  useEffect(() => {
    const maxTimer = 1 * 60 * 1000; // 1 minutes
    if (time == maxTimer) {
      handlePauseResume();
      message.info("waktu telah habis");
    } else {
      console.log("timer", time);
      console.log("maxTimer", maxTimer);
    }
  }, [time]);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      // interval = setInterval(() => setTime((time) => time + 10), 10);
      interval = setInterval(() => setTime((time) => time + 1000), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  // detail && console.log(detail.list_question);

  // console.log("endTime", increaseMinute(4));
  // console.log("startTime", increaseMinute());

  useEffect(() => {
    // addUserToRoom();
    // addData();
    getData();
  }, []);

  const addUserToRoom = () => {
    const questionRef = store
      .collection("room_question")
      .doc("0jA1a4N4TbMyoW0TeTTA");

    questionRef
      .update({
        list_user: firebase.firestore.FieldValue.arrayUnion({
          id_user: uid(5),
          username: "yayanss",
        }),
      })
      .then(() => {
        alert("User baru Berhasil ditambahkan");
      });
  };

  const getData = () => {
    store.collection("room_question").onSnapshot(function (snapshot) {
      let firestore = [];

      snapshot.forEach(function (childSnapshot) {
        firestore.push({ ...childSnapshot.data(), id: childSnapshot.id });
      });

      // console.log(firestore[0]);
      setDetail(firestore[0]);
    });
  };

  const addData = async () => {
    var questionRef = store.collection("room_question");
    questionRef
      .add({
        nama_room: "Bebas tapi sopan",
        list_user: listUser,
        list_question: listQuestion,
      })
      .then(() => alert("Berhasil ditambahkan"));
  };

  return (
    <Layout style={{ overflow: "hidden" }}>
      <Content style={{ height: "100vh" }}>
        <Row gutter={16}>
          <Col
            className="gutter-row"
            span={24}
            style={{ padding: 30, margin: "0 auto" }}
          >
            {detail && (
              <>
                <div
                  style={{ padding: 30, textAlign: "center", margin: "0 auto" }}
                >
                  <Title>
                    {detail.list_question[currentQuestion].question}
                  </Title>
                  <Paragraph>Answer List</Paragraph>
                  <div className="timer">
                    <span className="digits">
                      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className="digits">
                      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span>
                    {/* <span className="digits">
                      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className="digits">
                      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span> */}
                  </div>
                </div>
                <Divider />
                <div className="quiz">
                  <ul>
                    {detail.list_question[currentQuestion].answer.map(
                      (item, key) => {
                        return (
                          <li
                            key={key}
                            className={
                              selectedAnswer == item.id
                                ? "quiz-answer active"
                                : "quiz-answer"
                            }
                            onClick={() => setSelectedAnswer(item.id)}
                          >
                            <b>{item.id}.</b> {item.label}
                          </li>
                        );
                      }
                    )}
                  </ul>
                  <br />
                  <br />
                  <Button
                    type="primary"
                    block
                    style={{ maxWidth: 960, margin: "0 auto" }}
                    onClick={() =>
                      isActive ? handlePauseResume() : handleStart()
                    }
                  >
                    Primary
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
