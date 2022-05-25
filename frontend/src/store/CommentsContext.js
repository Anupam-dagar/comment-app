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

  const handleUpvoteDownvote = (comment, actionType) => {
    if (actionType === "UPVOTE") {
      comment.totalUpvotes += 1;
    } else {
      comment.totalUpvotes -= 1;
    }
  };

  const updateUpvote = (upvoteMessage) => {
    setComments((prevComments) => {
      return prevComments.map((prevComment) => {
        if (!upvoteMessage.parentId) {
          // handle comment upvote/downvote
          if (prevComment.id === upvoteMessage.commentId) {
            handleUpvoteDownvote(prevComment, upvoteMessage.type);
          }
        } else {
          // handle subComment upvote/downvote
          if (prevComment.id === upvoteMessage.parentId) {
            prevComment.subComments.map((prevComment) => {
              if (prevComment.id === upvoteMessage.commentId) {
                handleUpvoteDownvote(prevComment, upvoteMessage.type);
              }
            });
          }
        }

        return prevComment;
      });
    });
  };

  const context = {
    comments,
    setComments,
    addComment,
    addSubComment,
    updateUpvote,
  };

  return (
    <CommentsContext.Provider value={context}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
