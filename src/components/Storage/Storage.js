import React from "react";
import UserInfo from "./UserInfo";
import StorageInfo from "./StorageInfo";
import { useSession } from "next-auth/react";
import StorageDetailList from "./StorageDetailList";
import StorageUpgradeMsg from "./StorageUpgradeMsg";

function Storage() {
  const { data: session } = useSession();
  return (
    session && (
      <div>
        <UserInfo />
        <StorageInfo />
        <StorageDetailList />
        <StorageUpgradeMsg />
      </div>
    )
  );
}

export default Storage;
