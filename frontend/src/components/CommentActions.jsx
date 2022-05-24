import React, { useContext, useState } from "react";
import config from "../constants/config";
import AuthContext from "../store/AuthContext";

const CommentActions = ({ id, hasUpvoted, totalUpvotes }) => {
  const [upvotesCount, setUpvotesCount] = useState(totalUpvotes);
  const [isCommentUpvoted, setIsCommentUpvoted] = useState(hasUpvoted);
  const authContext = useContext(AuthContext);

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

  return (
    <div className="d-flex flex-row align-items-start">
      <ul className="nav">
        <li className="nav-item btn-upvote" onClick={handleUpvote}>
          <a className="nav-link nav-link-focus nav-link-btn c-text-secondary">
            <i className="bi bi-caret-up-fill"></i>{" "}
            <span className="totalUpvotes">{upvotesCount}</span>{" "}
            <span className="upvoteText">{getUpvoteText()}</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-link-focus nav-link-btn c-text-secondary">
            Reply
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CommentActions;
