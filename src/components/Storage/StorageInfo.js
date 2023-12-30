import { app } from "@/config/FirebaseConfig";
import { ShowToastContext } from "@/context/ShowToastContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

function StorageInfo() {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session, showToastMsg]);

  const getAllFiles = async () => {
    const q = query(
      collection(db, "Files"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data()["size"]);
      const totalSize = doc.data()["size"];

      setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + "MB");
    });
  };
  return (
    <div className="mt-7">
      <h2
        className="text-[22px] 
       font-bold"
      >
        {totalSizeUsed}{" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 flex">
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[25%]"></div>
        <div className="bg-yellow-600 h-2.5 w-[25%]"></div>
      </div>
    </div>
  );
}

export default StorageInfo;
