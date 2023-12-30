/* eslint-disable react-hooks/rules-of-hooks */
import FileItem from "@/components/File/FileItem";
import { app } from "@/config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function trash() {
  const { data: session } = useSession();
  const [fileList, setFileList] = useState();

  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const db = getFirestore(app);
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/trash");
      getFileList();
      console.log(session.user);
    }
  }, [session, showToastMsg]);

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "Trash"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };
  return (
    <div
      className="bg-white mt-5 p-5
        rounded-lg"
    >
      <h2 className="text-[18px] font-bold">Recent Files</h2>

      <div
        className="grid grid-cols-1
            md:grid-cols-2 
            text-[13px] 
            font-semibold
            border-b-[1px]
            pb-2 mt-3
            border-gray-300
             text-gray-400"
      >
        <h2>Name</h2>
        <div className="grid grid-cols-3">
          <h2>Modified</h2>
          <h2>Size</h2>
          <h2></h2>
        </div>
      </div>
      {fileList &&
        fileList.map((item, index) => (
          <div key={index}>
            <FileItem file={item} ctype="trash" />
          </div>
        ))}
    </div>
  );
}

export default trash;
