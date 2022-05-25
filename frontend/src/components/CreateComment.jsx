import React, { useContext, useState } from "react";
import config from "../constants/config";
import AuthContext from "../store/AuthContext";
import CommentsContext from "../store/CommentsContext";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const commentsContext = useContext(CommentsContext);
  const authContext = useContext(AuthContext);
  const defaultImage = "https://ui-avatars.com/api/?background=random&name=";

  const createComment = async (event) => {
    event.preventDefault();
    const user = authContext.user;
    let response;
    try {
      response = await fetch(`${config.backendUrl}/api/comments`, {
        method: "POST",
        headers: {
          user: user.id,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      response = await response.json();
    } catch (error) {
      alert(`Error upvoting comment. Please try again.`);
      return;
    }

    const newComment = {
      comment,
      user,
      hasUpvoted: false,
      id: response.id,
      createdBy: user.id,
      createdAt: response.createdAt,
      totalUpvotes: 0,
    };

    commentsContext.setComments((prevComments) => [
      ...prevComments,
      newComment,
    ]);
    setComment("");
  };

  const getUserImage = () => {
    return authContext.user ? authContext.user.photoUrl : defaultImage;
  };

  return (
    <div className="d-flex flex-row align-items-center border-bottom pb-5 mt-5">
      <div>
        <img
          id="current-user"
          className="rounded-circle"
          style={{ width: "41px" }}
          src={getUserImage()}
        />
      </div>
      <div className="flex-fill">
        <form className="d-flex flex-row" id="create-comment">
          <div className="flex-fill px-3">
            <input
              type="text"
              className="form-control"
              id="comment"
              placeholder="What are your thoughts?"
              maxLength="255"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex-shrink-1">
            <button
              type="submit"
              id="create-comment-button"
              className="btn btn-primary c-btn-primary"
              disabled={comment.length === 0}
              onClick={createComment}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
