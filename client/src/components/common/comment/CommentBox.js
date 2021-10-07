import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { lighten } from 'polished';

//import components
import CommentItem from './CommentItem';

const CommentBoxStyle = styled.div`
  font-size: 0.825rem;
  height: 400px;
  border: solid 1px #dadde6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  > .list-container {
    position: relative;
    flex-grow: 1;
    padding: 20px;
  }
`;

const CommentList = styled.ul`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 20px;
  right: 10px;
  overflow-y: auto;
  > li:not(:first-child) {
    margin-top: 20px;
  }

  > .more-btn {
    display: flex;
    justify-content: center;

    > button {
      border: none;
      background-color: #00000000;
      cursor: pointer;
    }
  }

  > .empty-comments {
    color: #8e8e8e;
  }
`;

const CommentInput = styled.form`
  display: flex;
  padding: 12px 20px;
  border-bottom: solid 1px #dadde6;

  > input {
    resize: none;
    border: none;
    outline: none;
    height: fit-content;
    flex-grow: 1;
  }

  > button {
    color: ${props => (props.submitable ? '#000' : '#dadde6')};
    border: none;
    cursor: ${props => (props.submitable ? 'pointer' : 'default')};
    display: block;
    width: fit-content;
    background-color: #00000000;

    &:hover {
      color: ${props => (props.submitable ? lighten(0.4, '#000') : '#dadde6')};
    }
  }

  > .disable {
    color: #8e8e8e;
  }
`;

const CommentBox = ({ postId, postType, setCommentsCount }) => {
  const [inputComment, setInputComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [isMoreComment, setIsMoreComment] = useState(false);
  const user = useSelector(state => state.user);
  const pageNumber = useRef(2);

  const getComments = async page => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/comments?page=${page}`,
      );

      const res = {
        comments: data.comments,
        commentsCount: data.data.commentsCount,
      };
      return res;
    } catch (e) {
      throw e;
    }
  };

  const initCommentList = (comments, commentsCount) => {
    setCommentList(comments);
    setCommentsCount(commentsCount);
    setIsMoreComment(comments.length < commentsCount);
    pageNumber.current = 2;
  };

  useEffect(() => {
    getComments(1).then(res => {
      initCommentList(res.comments, res.commentsCount);
    });
  }, [postId, postType]);

  const getMoreComments = async () => {
    try {
      const readRes = await getComments(pageNumber.current);
      const newCommentList = [...commentList, ...readRes.comments];
      setCommentList(newCommentList);
      setIsMoreComment(newCommentList.length < readRes.commentsCount);
      pageNumber.current++;
    } catch (e) {
      console.log(e);
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/comments/${commentId}`,
        {
          content,
        },
        { withCredentials: true },
      );
    } catch (e) {
      console.log(e);
    }
  };

  const removeComment = async commentId => {
    try {
      const deleteRes = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/comments/${commentId}`,
        { withCredentials: true },
      );

      if (deleteRes.status === 200) {
        const readRes = await getComments(1);
        initCommentList(readRes.comments, readRes.commentsCount);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = e => {
    setInputComment(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (inputComment.trim().length <= 0) {
      return;
    }
    try {
      const createRes = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/comments`,
        {
          content: inputComment,
        },
        {
          withCredentials: true,
        },
      );
      if (createRes.status === 201) {
        const readRes = await getComments(1);
        initCommentList(readRes.comments, readRes.commentsCount);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInputComment('');
    }
  };

  return (
    <CommentBoxStyle>
      <CommentInput onSubmit={onSubmit} submitable={inputComment.trim().length > 0}>
        {user.email ? (
          <>
            <input
              type="text"
              placeholder="댓글 입력.."
              size="1"
              value={inputComment}
              onChange={onChange}
            />
            <button>보내기</button>
          </>
        ) : (
          <div className="disable">로그인 후 댓글을 작성할 수 있습니다.</div>
        )}
      </CommentInput>
      <div className="list-container">
        <CommentList>
          {commentList.length === 0 ? (
            <li className="empty-comments">댓글이 없습니다.</li>
          ) : (
            commentList.map(comment => {
              return (
                <li key={comment._id}>
                  <CommentItem
                    comment={comment}
                    updateComment={updateComment}
                    removeComment={removeComment}
                  />
                </li>
              );
            })
          )}
          {isMoreComment && (
            <li className="more-btn">
              <button onClick={getMoreComments}>더보기</button>
            </li>
          )}
        </CommentList>
      </div>
    </CommentBoxStyle>
  );
};

export default CommentBox;
