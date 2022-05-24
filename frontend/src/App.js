import React from "react";
import CommentList from "./components/CommentList";
import CreateComment from "./components/CreateComment";
import { AuthContextProvider } from "./store/AuthContext";
import { CommentsContextProvider } from "./store/CommentsContext";

const App = () => {
  return (
    <AuthContextProvider>
      <CommentsContextProvider>
        <div className="container my-5">
          <h3>Discussion</h3>
          <CreateComment />
          <CommentList />
        </div>
      </CommentsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
