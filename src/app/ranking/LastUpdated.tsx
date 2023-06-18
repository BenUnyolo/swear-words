"use client";

import formatRelative from "date-fns/formatRelative";

interface ILastUpdatedProps {
  updatedDate: Date;
}

export const LastUpdated: React.FC<ILastUpdatedProps> = ({ updatedDate }) => {
  const currentDate = new Date();

  console.log("currentDate: ", currentDate);
  console.log("updatedDate: ", updatedDate);

  return (
    <>
      <div>child: {updatedDate.toTimeString()}</div>
      <div>current date: {currentDate.toTimeString()}</div>
      Last updated {formatRelative(updatedDate, currentDate)}
    </>
  );
};
