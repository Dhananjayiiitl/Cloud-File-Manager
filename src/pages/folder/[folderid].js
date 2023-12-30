/* eslint-disable react-hooks/exhaustive-deps */
import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import { app } from "@/config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function FolderDetails() {
  const router = useRouter();
  const { name, id } = router.query;
  const [folderList, setFolderList] = useState();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { data: session } = useSession();
  const db = getFirestore(app);
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const [fileList, setFileList] = useState();

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };
  useEffect(() => {
    setParentFolderId(id);
    if (session) {
      getFolderList();
      getFileList();
    }
  }, [id, session, showToastMsg]);

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "Files"),
      where("parentFolderId", "==", id),
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
    <div className="p-5 bg-blue-100/40 h-screen">
      <SearchBar />
      <div className="text-[20px] font-bold mt-5">{name}</div>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}

export default FolderDetails;
