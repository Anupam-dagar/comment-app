import React, { useContext, useState } from "react";
import config from "../constants/config";
import AuthContext from "../store/AuthContext";
import CreateComment from "./CreateComment";

const CommentActions = ({ id, hasUpvoted, totalUpvotes, parentId }) => {
  const [upvotesCount, setUpvotesCount] = useState(totalUpvotes);
  const [isCommentUpvoted, setIsCommentUpvoted] = useState(hasUpvoted);
  const authContext = useContext(AuthContext);

  const [isReplying, setIsReplying] = useState(false);

  const handleUpvote = async () => {
    const user = authContext.user;
    await fetch(`${config.backendUrl}/api/comments/upvote/${id}`, {
      method: "POST",
      headers: {
        user: user.id,
      },
    });
    setUpvotesCount((prevCount) => {
      return isCommentUpvoted ? prevCount - 1 : prevCount + 1;
    });
    setIsCommentUpvoted((previousState) => !previousState);
  };

  const getUpvoteText = () => {
    return isCommentUpvoted ? "Remove Upvote" : "Upvote";
  };

  const commentCreated = () => {
    setIsReplying(false);
  };

  return (
    <>
      <div className="d-flex flex-row align-items-start">
        <ul className="nav">
          <li className="nav-item btn-upvote" onClick={handleUpvote}>
            <a className="nav-link nav-link-focus nav-link-btn c-text-secondary">
              <i className="bi bi-caret-up-fill"></i>{" "}
              <span className="totalUpvotes">{upvotesCount}</span>{" "}
              <span className="upvoteText">{getUpvoteText()}</span>
            </a>
          </li>
          {!parentId && (
            <li className="nav-item">
              <a
                className="nav-link nav-link-focus nav-link-btn c-text-secondary"
                onClick={() => setIsReplying((prevValue) => !prevValue)}
              >
                Reply
              </a>
            </li>
          )}
        </ul>
      </div>
      {isReplying && (
        <CreateComment parentId={parentId} commentCreated={commentCreated} />
      )}
    </>
  );
};

export default CommentActions;
