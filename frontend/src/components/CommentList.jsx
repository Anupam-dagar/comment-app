import React from "react";
import { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/comments`, {
      headers: {
        user: localStorage.getItem("id"),
      },
    })
      .then(async (data) => await data.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.log(
          `Error getting comments for user ${localStorage.getItem(
            "id"
          )}: ${error}`
        );
      });
  }, []);
  return (
    <>
      {comments.map((comment) => {
        return <CommentRow key={comment.id} comment={comment} />;
      })}
    </>
  );
};

export default CommentList;
