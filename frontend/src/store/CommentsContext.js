import React, { createContext, useState } from "react";

const CommentsContext = createContext(null);

export const CommentsContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const context = {
    comments,
    setComments,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
