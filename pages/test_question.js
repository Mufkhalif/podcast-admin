import { useEffect } from "react";
import { store, fire } from "../fire/fire";
import { uid } from "uid";
import firebase from "firebase/app";

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
  useEffect(() => {
    // addUserToRoom();
    addData();
    // getData();
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

      console.log(firestore);
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
    <div>
      <h1>Selamat datang</h1>
    </div>
  );
}
