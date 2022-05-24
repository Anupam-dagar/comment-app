import React from "react";
import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";

const Comment = ({ comment, userName }) => {
  const {
    id,
    createdAt,
    comment: commentText,
    hasUpvoted,
    totalUpvotes,
  } = comment;

  return (
    <div className="flex-fill">
      <CommentHeader
        commentCreatedAt={createdAt}
        comment={commentText}
        userName={userName}
      />
      <CommentActions
        id={id}
        hasUpvoted={hasUpvoted}
        totalUpvotes={totalUpvotes}
      />
    </div>
  );
};

export default Comment;
