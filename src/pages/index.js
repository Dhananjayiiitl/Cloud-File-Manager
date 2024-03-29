/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const [folderList, setFolderList] = useState();
  const [fileList, setFileList] = useState();

  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getFolderList();
      getFileList();
      console.log(session.user);
    }
    setParentFolderId(0);
  }, [session, showToastMsg]);

  const db = getFirestore(app);
  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };
  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "Files"),
      where("parentFolderId", "==", 0),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };
  const id = 0;
  return (
    <div className="p-5 bg-blue-100/40 h-screen">
      <SearchBar />
      <FolderList folderList={folderList} id={id} />
      <FileList fileList={fileList} />
    </div>
  );
}
