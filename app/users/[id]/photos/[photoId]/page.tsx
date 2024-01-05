import React from "react";
interface Props {
  params: { id: number; photoId: number };
}
const page = (props: Props) => {
  return (
    <div>
      {props.params.id} - {props.params.photoId}
    </div>
  );
};

export default page;
