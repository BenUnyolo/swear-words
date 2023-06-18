"use client";

import formatRelative from "date-fns/formatRelative";

interface ILastUpdatedProps {
  updatedDate: Date;
}

export const LastUpdated: React.FC<ILastUpdatedProps> = ({ updatedDate }) => {
  const currentDate = new Date();
  return <>Last updated {formatRelative(updatedDate, currentDate)}</>;
};
