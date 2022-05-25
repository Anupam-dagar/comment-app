import React from "react";
import Comment from "./Comment";

const SubCommentRow = ({ comment }) => {
  const { user, ...commentData } = comment;

  return (
    <div className="d-flex flex-row align-items-start mt-5 px-2">
      <div>
        <img
          className="rounded-circle"
          style={{ width: "41px" }}
          src={user.photoUrl}
        />
      </div>
      <Comment
        comment={commentData}
        userName={user.name}
        userPhoto={user.photoUrl}
      />
    </div>
  );
};

export default SubCommentRow;
