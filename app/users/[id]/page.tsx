import React from "react";

interface UserDetailsProps {
  params: { id: number };
}

const UserDetail = (props: UserDetailsProps) => {
  return <div>{props.params.id}</div>;
};

export default UserDetail;
