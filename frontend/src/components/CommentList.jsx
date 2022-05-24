import React, { useContext } from "react";
import { useEffect, useState } from "react";
import config from "../constants/config";
import AuthContext from "../store/AuthContext";
import CommentsContext from "../store/CommentsContext";
import CommentRow from "./CommentRow";

const CommentList = () => {
  const commentsContext = useContext(CommentsContext);
  const authContext = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUser().then(() => getComments());
  }, []);

  const getUser = async () => {
    try {
      let user = await fetch(`${config.backendUrl}/api/users/login`);
      user = await user.json();
      authContext.setUser(user);
    } catch (error) {
      console.log({ error });
      alert(`Error getting user data. Please try again by refresing the page.`);
    }
  };

  const getComments = async () => {
    const user = authContext.user;
    try {
      let comments = await fetch(`${process.env.BACKEND_URL}/api/comments`, {
        headers: {
          user: user.id,
        },
      });
      comments = await comments.json();
      commentsContext.setComments(comments.comments);
    } catch (error) {
      console.log(`Error getting comments for user ${user.id}: ${error}`);
    }
  };

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
