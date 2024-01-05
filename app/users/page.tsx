import React, { Suspense, use } from "react";
import UsersList from "./UsersList";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users </h1>
      <UsersList sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;
