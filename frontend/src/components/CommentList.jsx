import React, { useContext } from "react";
import { useEffect, useState } from "react";
import config from "../constants/config";
import AuthContext from "../store/AuthContext";
import CommentsContext from "../store/CommentsContext";
import CommentRow from "./CommentRow";
import io from "socket.io-client";

const CommentList = () => {
  const commentsContext = useContext(CommentsContext);
  const authContext = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUser();
    initialiseWebsocketConnection();
  }, []);

  useEffect(() => {
    if (!authContext.user) {
      return;
    }
    getComments();
  }, [authContext]);

  const initialiseWebsocketConnection = () => {
    const socket = io(config.backendUrl);
    socket.on("comments", (data) => {
      commentsContext.updateUpvote(data);
    });
  };

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
    try {
      let comments = await fetch(`${process.env.BACKEND_URL}/api/comments`, {
        headers: {
          user: authContext.user.id,
        },
      });
      comments = await comments.json();
      commentsContext.setComments(comments.comments);
    } catch (error) {
      console.log(
        `Error getting comments for user ${authContext.user.id}: ${error}`
      );
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
