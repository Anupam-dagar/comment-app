import React, { useContext } from "react";
import { useEffect, useState } from "react";
import CommentsContext from "../store/CommentsContext";
import CommentRow from "./CommentRow";

const CommentList = () => {
  const commentsContext = useContext(CommentsContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/comments`, {
      headers: {
        user: localStorage.getItem("id"),
      },
    })
      .then(async (data) => await data.json())
      .then((data) => {
        commentsContext.setComments(data.comments);
      })
      .catch((error) => {
        console.log(
          `Error getting comments for user ${localStorage.getItem(
            "id"
          )}: ${error}`
        );
      });
  }, []);

  useEffect(() => {
    setComments(commentsContext.comments);
  }, [commentsContext]);

  return (
    <>
      {comments.map((comment) => {
        return <CommentRow key={comment.id} comment={comment} />;
      })}
    </>
  );
};

export default CommentList;
