import { makeStyles, TextField, Button } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useMotos } from "../../contexts/MotoContext";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';
import './assets/MotoComments.css'

const MotoComments = () => {
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState();
  const [editingComment, setEditingComment] = useState();
  const [curId,setCurId] = useState()
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { MotoDetails, toggleComment } = useMotos();

  const {isAdmin,currentUser } = useContext(AuthContext)

  const sendComment = async (comment) => {
    if (comment.trim()) {
      const createdComment = {
        authorMail: currentUser.email,
        date: new Date().toString().slice(0, 21),
        text: comment,
        id: Date.now(),
        isChanged: null,
      };
      MotoDetails.comments.push(createdComment);
      console.log(MotoDetails);
      toggleComment(MotoDetails.id, MotoDetails);
    } else {
      alert("Comment cannot be empty");
    }
  };

  const deleteComment = async (removableComment) => {
    const newComments = MotoDetails.comments.filter(
      (comment) => comment.id != removableComment.id
    );
    MotoDetails.comments = newComments;
    toggleComment(MotoDetails.id, MotoDetails);
  };

  const saveEditedComment = async (id) => {
    if (editingComment.trim()) {
      const newComments = MotoDetails.comments.map((comment) => {
        if (comment.id == id) {
          if (!comment.isChanged) {
            return {
              ...comment,
              text: editingComment,
              authorNickname: comment.authorNickname,
              isChanged: " (changed)",
            };
          }
          return {
            ...comment,
            text: editingComment,
            authorNickname: comment.authorNickname,
          };
        }
        return comment;
      });
      MotoDetails.comments = newComments;
      console.log(MotoDetails);
      toggleComment(MotoDetails.id, MotoDetails);
      setIsEditing(false);
    } else {
      alert("Comment cannot be empty");
    }
  };

  return (
      <div className='commentsContainer'>
        <div className='comments'>
          <h5 className='inpColor'>Comments:</h5>
          <div className='inputDiv'>
            <div className='inpAndArrowDiv'>
              {isAdding ? (
                <>
                  <TextField
                    error
                    className='inps'
                    value={addingComment}
                    onChange={(e) => {
                      setAddingComment(e.target.value);
                    }}
                    id="outlined-basic"
                    label="Add Comment"
                    variant="outlined"
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <ArrowForwardRoundedIcon
                    className='arrow'
                    onClick={(e) => {
                      sendComment(newComment, e);
                      setIsAdding(!isAdding);
                    }}
                  />
                </>
              ) : (
                <>
               {currentUser ? 
                <Button
                onClick={() => setIsAdding(true)}
                className='addComment'
              >
                Add Comment
              </Button> : null}
              </>
              )}
            </div>

            {MotoDetails?.comments?.length > 0
              ? MotoDetails?.comments?.map((comment) => {
                  return (
                    <div className='usersComment'>
                      <h5><img style={{width: '40px',borderRadius:'5px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FtKo2b7J9sTMaHjlXmoQyYz-m9twTw8PuA&usqp=CAU" alt="" /> {comment.authorMail}</h5>
                      <div className='secondaryText'>
                        {comment.isChanged}
                      </div>
                      <div className='secondaryText'>
                        {comment.date}
                      </div>
                      {isEditing && curId == comment.id ? (
                        <>
                          <input
                            className='editInput'
                            type="text"
                            value={editingComment}
                            onChange={(e) => {
                              setEditingComment(e.target.value);
                            }}
                          />
                          <br />
                          <HighlightOffIcon
                            className='editIcon'
                            onClick={() => setIsEditing(false)}

                          />
                          <SaveIcon 
                            className='editIcon'
                            onClick={() => saveEditedComment(comment.id)}
                          />
                        </>
                      ) : (
                        <>
                          <div className='comment'>
                            {comment.text}
                          </div>
                          {currentUser &&
                            isAdmin ||
                          (currentUser &&
                            currentUser.email ==
                              comment.authorMail) ? (
                              <DeleteIcon
                              className='editIcon'         
                               onClick={() => {
                                deleteComment(comment);
                              }}
                              />
                          ) : null}
                          {currentUser &&
                          currentUser.email ==
                            comment.authorMail ? (
                              <EditIcon
                              className='editIcon'

                              onClick={() => {
                                setIsEditing(true);
                                  setEditingComment(comment.text);
                                  setCurId(comment.id);
                              }}
                            />
                          ) : null}
                        </>
                      )}
                    </div>
                  );
                })
              : <h2 style={{marginLeft: '40%',lineHeight:'300px'}} >No comments yet...</h2>}
          </div>
        </div>
      </div>
  );
};

export default MotoComments;
