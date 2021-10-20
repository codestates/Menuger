import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { lighten } from 'polished';

//import components
import CommentItem from './CommentItem';
import ButtonSpinner from '../spinners/ButtonSpinner';
import { increaseCount } from '../../../modules/list';

const CommentBoxStyle = styled.div`
  font-size: 0.825rem;
  height: 400px;
  border: solid 1px #dadde6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${({ isDark }) => isDark && '#424656'};

  > .list-container {
    position: relative;
    flex-grow: 1;
    padding: 20px;
  }

  > .loading {
    margin: 10px 20px 0;
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
    &.isDark {
      background-color: transparent;
      color: white;
    }
  }

  > button {
    color: ${props => (props.submitable ? '#000' : '#dadde6')};
    border: none;
    cursor: ${props => (props.submitable ? 'pointer' : 'default')};
    display: block;
    width: fit-content;
    background-color: #00000000;

    &.isDark {
      color: ${props => (props.submitable ? 'white' : 'gray')};
      &:hover {
        color: ${props => (props.submitable ? '#DADDE2' : 'gray')};
      }
    }
    &:hover {
      color: ${props => (props.submitable ? lighten(0.4, '#000') : '#dadde6')};
    }
  }

  > .disable {
    color: #8e8e8e;
  }
`;

const CommentBox = ({ postId, postType, setCommentsCount, updatedCardsRef }) => {
  const [inputComment, setInputComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [isMoreComment, setIsMoreComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user);
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();
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
    setIsLoading(true);
    getComments(1)
      .then(res => {
        initCommentList(res.comments, res.commentsCount);
      })
      .catch(e => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId, postType]);

  const getMoreComments = async () => {
    try {
      setIsLoading(true);
      const readRes = await getComments(pageNumber.current);
      const newCommentList = [...commentList, ...readRes.comments];
      setCommentList(newCommentList);
      setIsMoreComment(newCommentList.length < readRes.commentsCount);
      pageNumber.current++;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      const deleteRes = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/comments/${commentId}`,
        { withCredentials: true },
      );

      if (deleteRes.status === 200) {
        updatedCardsRef.current.comment = {
          _id: postId,
          commentsCount: deleteRes.data.data.commentsCount,
        };
        const readRes = await getComments(1);
        initCommentList(readRes.comments, readRes.commentsCount);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = e => {
    if (isLoading) {
      return;
    }
    setInputComment(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (inputComment.trim().length <= 0 || isLoading) {
      return;
    }
    try {
      setIsLoading(true);
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
        updatedCardsRef.current.comment = {
          _id: postId,
          commentsCount: createRes.data.data.commentsCount,
        };
        const readRes = await getComments(1);
        initCommentList(readRes.comments, readRes.commentsCount);
        dispatch(increaseCount({ _id: postId, type: 'comments' }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInputComment('');
      setIsLoading(false);
    }
  };

  return (
    <CommentBoxStyle isDark={isDarkMode}>
      <CommentInput onSubmit={onSubmit} submitable={inputComment.trim().length > 0}>
        {user.email ? (
          <>
            <input
              type="text"
              placeholder="댓글 입력.."
              size="1"
              value={inputComment}
              onChange={onChange}
              className={isDarkMode ? 'isDark' : ''}
            />
            <button className={isDarkMode ? 'isDark' : ''}>보내기</button>
          </>
        ) : (
          <div className="disable">로그인 후 댓글을 작성할 수 있습니다.</div>
        )}
      </CommentInput>
      {isLoading && (
        <div className="loading">
          <ButtonSpinner />
        </div>
      )}
      <div className="list-container">
        <CommentList>
          {commentList.length === 0 ? (
            <li className="empty-comments">댓글이 없습니다.</li>
          ) : (
            commentList.map(comment => {
              return (
                <li key={comment._id}>
                  <CommentItem
                    postId={postId}
                    comment={comment}
                    updateComment={updateComment}
                    removeComment={removeComment}
                    updatedCardsRef={updatedCardsRef}
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
