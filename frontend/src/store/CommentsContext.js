import React, { createContext, useState } from "react";

const CommentsContext = createContext(null);

export const CommentsContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addSubComment = (comment, parentId) => {
    setComments((prevComments) => {
      return prevComments.map((prevComment) => {
        if (prevComment.id === parentId) {
          prevComment.subComments.push(comment);
        }
        return prevComment;
      });
    });
  };

  const addComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const context = {
    comments,
    setComments,
    addComment,
    addSubComment,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
