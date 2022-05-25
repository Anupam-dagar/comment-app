import React from "react";
import Comment from "./Comment";

const CommentRow = ({ comment }) => {
  const { user, subComments, ...commentData } = comment;

  return (
    <div className="position-relative d-flex flex-row align-items-start mt-5">
      {subComments.length > 0 && <div className="thread-border" />}
      <div>
        <img
          className="rounded-circle"
          style={{ width: "41px" }}
          src={user.photoUrl}
        />
      </div>
      <Comment
        subComments={subComments}
        comment={commentData}
        userName={user.name}
        parentId={commentData.parentId}
      />
    </div>
  );
};

export default CommentRow;
