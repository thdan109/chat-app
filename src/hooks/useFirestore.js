import React from "react";

import { db } from "../Firebase/config";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef =  collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscibe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscibe;
  }, [condition, collection]);
  return documents;
};

export default useFirestore;
