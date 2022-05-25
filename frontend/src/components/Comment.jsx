import React from "react";
import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";
import SubCommentRow from "./SubCommentRow";

const Comment = ({ comment, userName, subComments }) => {
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
      {subComments &&
        subComments.map((subComment) => {
          return <SubCommentRow key={subComment.id} comment={subComment} />;
        })}
    </div>
  );
};

export default Comment;
