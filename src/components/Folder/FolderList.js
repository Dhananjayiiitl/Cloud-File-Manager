import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";

function FolderList({ folderList }) {
  // const folderList = [
  //   {
  //     id: 1,
  //     name: "Folder 1 to Test Big Text",
  //   },
  //   {
  //     id: 2,
  //     name: "Folder 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Folder 3",
  //   },
  //   {
  //     id: 4,
  //     name: "Folder 4",
  //   },
  //   {
  //     id: 5,
  //     name: "Folder 4",
  //   },
  // ];
  const router = useRouter();
  const [activeFolder, setActiveFolder] = useState();
  const onFolderClick = (index, folder) => {
    setActiveFolder(index);
    router.push({
      pathname: "/folder/" + folder.id,
      query: {
        name: folder.name,
        id: folder.id,
      },
    });
  };

  return (
    <div className="p-5 mt-5 rounded-lg bg-white max-h-[50%] overflow-auto no-scrollbar">
      <h2 className="text-[17px] font-bold items-center">
        Recent Folders
        <span className="float-right text-blue-400 font-normal text-[13px]">
          View All
        </span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 xl:grid-cols-5">
        {folderList &&
          folderList.map((item, index) => (
            <div key={index} onClick={() => onFolderClick(index, item)}>
              <FolderItem folder={item} activeFolder={activeFolder == index} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default FolderList;
