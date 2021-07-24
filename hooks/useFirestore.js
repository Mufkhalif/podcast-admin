import { useState, useEffect } from "react";
import { store } from "../fire/fire";
import { message } from "antd";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [isMounted, setMounted] = useState(true);

  useEffect(() => {
    getData();
    return () => setMounted(false);
  }, []);

  const getData = async () => {
    setMounted(true);
    await store.collection("popular").onSnapshot(function (snapshot) {
      let firestore = [];

      snapshot.forEach(function (childSnapshot) {
        firestore.push({ ...childSnapshot.data(), id: childSnapshot.id });
      });

      isMounted && setData(firestore);
    });
  };

  const onDeleteItem = (id) => {
    store.collection("popular").doc(id).delete();
    message.success("Berhasil menghapus podcast");
  };

  return { data, onDeleteItem };
};
