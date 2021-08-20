import { useEffect, useState } from "react";
import { store, fire } from "../../src/fire/fire";
import { uid } from "uid";
import firebase from "firebase/app";
import { Layout, Row, Col, Typography, Divider, Button, message } from "antd";
import { useRouter } from "next/router";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Detail() {
  const router = useRouter();
  const { pid } = router.query;
  const [detail, setDetail] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [listAnswer, setListAnswer] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [testQuestion, setTestQuestion] = useState([]);

  testQuestion.length != 0 && console.log(testQuestion[currentQuestion]);

  useEffect(() => {
    getDetail();
  }, [pid]);

  const getDetail = () => {
    const doc = store.collection("room_question").doc(pid);
    doc.onSnapshot(
      (docSnapshot) => {
        const listQuestion = Object.entries(
          docSnapshot.data() ? docSnapshot.data().list_question_new : []
        );

        const newListQuestion = [];

        listQuestion.map((item) => {
          const data = {
            id: item[0],
            ...item[1],
          };
          newListQuestion.push(data);
        });

        setTestQuestion(newListQuestion);
        setDetail(docSnapshot.data());
      },
      (err) => setDetail(null)
    );
  };

  useEffect(() => {
    if (detail) {
      const maxTimer = 0.1 * 60 * 1000; // 12 detik
      const infoQuestion = detail.list_question[currentQuestion];

      const current = testQuestion[currentQuestion].id;

      var usersUpdate = {};
      usersUpdate[`list_question_new.${current}.timer`] = time;

      store.collection(`room_question`).doc(pid).update(usersUpdate);
      // .then((e) => console.log(e))
      // .catch((e) => console.log(e));

      if (time == maxTimer) {
        if (listAnswer.length == 0) {
          setListAnswer([
            {
              id_question: infoQuestion.id_question,
              answer: selectedAnswer,
              point:
                selectedAnswer == infoQuestion.correct_answer
                  ? infoQuestion.point_correct
                  : infoQuestion.point_incorrect,
            },
          ]);
        } else {
          setListAnswer([
            ...listAnswer,
            {
              id_question: infoQuestion.id_question,
              answer: selectedAnswer,
              point:
                selectedAnswer == infoQuestion.correct_answer
                  ? infoQuestion.point_correct
                  : infoQuestion.point_incorrect,
            },
          ]);
        }

        const lasIndex = detail.list_question.length - 1;

        if (lasIndex != currentQuestion) {
          message.info("waktu telah habis, berpindah jawaban berikutnya");
          setIsPaused(true);

          // setCurrentQuestion(currentQuestion + 1);
        } else {
          message.info("ini adalah soal terakhir dan sudah selesai");
          setCurrentQuestion(currentQuestion);
          setIsPaused(true);
        }
      } else {
        // console.log("aa", infoQuestion.correct_answer);
        // console.log("bb", selectedAnswer);
      }
    }
  }, [time]);

  useEffect(() => {
    // if (listAnswer.length != 0) {
    //   console.log(listAnswer);
    // }
  }, [listAnswer]);

  useEffect(() => {
    if (currentQuestion != 0) {
      setSelectedAnswer(null);
      handleReset();
    }
  }, [currentQuestion]);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
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
    setTime(0);
  };

  const updateCurrentQuestion = () => {
    const current = testQuestion[currentQuestion].id;

    var usersUpdate = {};
    usersUpdate[`list_question_new.${current}.color`] = true;

    store
      .collection(`room_question`)
      .doc(pid)
      .update(usersUpdate)
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
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
                  style={{ padding: 10, textAlign: "center", margin: "0 auto" }}
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
                  </div>
                  {testQuestion.length != 0 &&
                    testQuestion[currentQuestion].timer}
                  ;
                </div>
                <Divider />
                <div className="quiz">
                  <ul>
                    {detail.list_question[currentQuestion].answer.map(
                      (item, key) => (
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
                      )
                    )}
                  </ul>
                  <br />
                  <br />
                  <Button
                    type="primary"
                    block
                    style={{ maxWidth: 960, margin: "0 auto" }}
                    onClick={
                      // () => updateCurrentQuestion()
                      () => (isActive ? handlePauseResume() : handleStart())
                    }
                  >
                    {isActive ? "Konfirmasi" : "Mulai"}
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
