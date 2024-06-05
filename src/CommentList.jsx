import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/CommentList.css";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        { body: newComment }
      );
      setComments([response.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const startEditing = (id, text) => {
    setEditCommentId(id);
    setEditCommentText(text);
  };

  const updateComment = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${editCommentId}`,
        { body: editCommentText }
      );
      setComments(
        comments.map((comment) =>
          comment.id === editCommentId ? response.data : comment
        )
      );
      setEditCommentId(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="container">
      <div className="content-add-comment">
        <input
          className="add-comment-input"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add new comment"
        />
        <button className="add-comment-button" onClick={addComment}>
          Add Comment
        </button>
      </div>
      <ul className="comments">
        {comments.map((comment) => (
          <li className="comment" key={comment.id}>
            <div className="wrap">
              <div>{comment.id}</div>
              <div className="comment-text">
                {editCommentId === comment.id ? (
                  <input
                    className="edit-comment-input"
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                  />
                ) : (
                  comment.body
                )}
              </div>
              <div>
                {editCommentId === comment.id ? (
                  <button onClick={updateComment}>Save</button>
                ) : (
                  <button
                    onClick={() => startEditing(comment.id, comment.body)}
                  >
                    Update
                  </button>
                )}
              </div>
              <div>
                <button onClick={() => deleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
