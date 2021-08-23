import { makeStyles, TextField, Button } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useMotos } from "../../contexts/MotoContext";
import './assets/MotoComments.css'

// const useStyles = makeStyles(() => ({
//   commentsInnerContainer: {
//     maxWidth: "1000px",
//     minHeight: "500px",
//   },

//   inps: {
//     margin: "10px 0",
//     borderBottom: "1px white solid",
//   },
//   comments: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     height: "100%",
//   },
//   inputDiv: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     marginBottom: 0,
//     flexDirection: "column",
//     width: "100%",
//   },
//   inpColor: {
//     color: "white",
//   },
//   secondaryText: {
//     color: "grey",
//     lineHeight: "20px",
//     fontSize: "14px",
//   },
//   commentDelete: {
//     border: "0",
//     borderRadius: "5px",
//     backgroundColor: "red",
//     color: "white",
//   },
//   commentEdit: {
//     backgroundColor: "inherit",
//     color: "white",
//     border: "1px white solid",
//     borderRadius: "5px",
//     marginLeft: "10px",
//   },
//   commmentSave: {
//     backgroundColor: "inherit",
//     color: "green",
//     border: "1px white solid",
//     borderRadius: "5px",
//     marginLeft: "10px",
//   },
//   commentClose: {
//     backgroundColor: "inherit",
//     color: "red",
//     border: "1px white solid",
//     borderRadius: "5px",
//   },
//   usersComment: {
//     color: "white",
//     width: "100%",
//     wordWrap: "break-word",
//   },
//   editInput: {
//     marginBottom: "10px",
//   },
//   arrow: {
//     color: "white",
//     marginLeft: "10px",
//   },
//   inpAndArrowDiv: {
//     display: "flex",
//     alignItems: "center",
//   },
//   addComment: {
//     backgroundColor: "inherit",
//     backgroundColor: "green",
//     borderRadius: "5px",
//     marginBottom: "10px",
//     color: "white",
//   },
// }));

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
        date: new Date().toString().slice(0, 24),
        text: comment,
        id: Date.now(),
        isChanged: null,
      };
      MotoDetails.comments.push(createdComment);
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
      const newComments = await MotoDetails.comments.map((comment) => {
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
      await toggleComment(MotoDetails.id, MotoDetails);
      setIsEditing(false);
    } else {
      alert("Comment cannot be empty");
    }
  };

  return (
    <div className='commentsOuterContainer'>
      <div className='commentsInnerContainer'>
        <div className='comments'>
          <h5 className='inpColor'>Comments:</h5>
          <div className='inputDiv'>
            <div className='inpAndArrowDiv'>
              {isAdding ? (
                <>
                  <TextField
                    InputProps={{
                      className: 'inpColor',
                    }}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                    className='inps'
                    value={addingComment}
                    onChange={(e) => {
                      setAddingComment(e.target.value);
                    }}
                    id="outlined-basic"
                    label="Add Comment"
                    variant="filled"
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
                <Button
                  onClick={() => setIsAdding(true)}
                  className='addComment'
                >
                  Add Comment
                </Button>
              )}
            </div>

            {MotoDetails?.comments?.length > 0
              ? MotoDetails?.comments?.map((comment) => {
                  return (
                    <div className='usersComment'>
                      <h5>{comment.authorMail}</h5>
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
                          <Button
                            className='commentClose'
                            onClick={() => setIsEditing(false)}
                          >
                            Close
                          </Button>
                          <Button
                            className='commmentSave'
                            onClick={() => saveEditedComment(comment.id)}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className='usersComment'>
                            {comment.text}
                          </div>
                          {currentUser &&
                            isAdmin ||
                          (currentUser &&
                            currentUser.email ==
                              comment.authorMail) ? (
                            <Button
                              className='commentDelete'
                              onClick={() => {
                                deleteComment(comment);
                              }}
                            >
                              DELETE
                            </Button>
                          ) : null}
                          {currentUser &&
                          currentUser.email ==
                            comment.authorMail ? (
                            <Button
                              className='commentEdit'
                              onClick={() => {
                                setIsEditing(true);
                                setEditingComment(comment.text);
                                setCurId(comment.id);
                              }}
                            >
                              EDIT
                            </Button>
                          ) : null}
                        </>
                      )}
                      <hr size="10px" color="grey" width="100%" />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotoComments;
