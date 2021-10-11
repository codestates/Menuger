import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import calcDateDiffToString from '../../../utils/date';
import { darken } from 'polished';

//import components
import ProfileImage from '../ProfileImage';
import { decreaseCount } from '../../../modules/list';

const CommentItemStyle = styled.div`
  font-size: 0.875rem;
  display: grid;
  grid-template:
    'image content'
    'image other'
    / fit-content(100%) 1fr;
  column-gap: 10px;
`;

const ProfileImageArea = styled.section`
  grid-area: image;
`;

const ContentArea = styled.section`
  grid-area: content;
  line-height: 1.2rem;

  > .nickname {
    display: ${props => props.editable && 'block'};
    color: #000;
    font-weight: bold;
    text-decoration: none;
    margin-right: 0.5rem;
  }

  > textarea {
    height: 3rem;
    resize: none;
    outline: none;
    border: solid 1px #dadde6;
    border-radius: 5px;
    padding: 3px 5px;
  }
`;

const OtherArea = styled.section`
  grid-area: other;
  color: #8e8e8e;
  margin-top: 5px;

  > span,
  button {
    margin-right: 0.4rem;
  }

  > button {
    padding: 0;
    border: none;
    color: inherit;
    font-size: inherit;
    background-color: #00000000;
    cursor: pointer;

    &:hover {
      color: ${darken(0.2, '#8e8e8e')};
    }

    &:active {
      color: ${darken(0.5, '#8e8e8e')};
    }

    &.remove-yes-btn:hover {
      color: #f66d6d;
    }

    &.remove-yes-btn:active {
      color: ${darken(0.2, '#f66d6d')};
    }
  }
`;

const CommentItem = ({ comment = {}, updateComment, removeComment, postId: _postId }) => {
  const { _id: id, user = {}, content, post: postId, createdAt } = comment;
  const [otherRenderType, setOtherRenderType] = useState('default');
  const [contentForDisplay, setContentForDisplay] = useState(content);
  const [inputContent, setInputContent] = useState(content);
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onEditMode = () => setOtherRenderType('edit');
  const offEditMode = () => {
    setOtherRenderType('default');
    setInputContent(contentForDisplay);
  };
  const onRemoveMode = () => setOtherRenderType('remove');
  const offRemoveMode = () => setOtherRenderType('default');

  const onChange = e => setInputContent(e.target.value);
  const onRemove = () => {
    removeComment(id);
    dispatch(decreaseCount({ _id: _postId, type: 'comments' }));
  };
  const onUpdate = () => {
    updateComment(id, inputContent);
    setContentForDisplay(inputContent);
    setOtherRenderType('default');
  };

  const renderOther = (type = 'default') => {
    switch (type) {
      case 'edit':
        return (
          <>
            <button onClick={onUpdate}>확인</button>
            <button onClick={offEditMode}>취소</button>
          </>
        );
      case 'remove':
        return (
          <>
            <span>삭제하시겠습니까?</span>
            <button className="remove-yes-btn" onClick={onRemove}>
              확인
            </button>
            <button onClick={offRemoveMode}>취소</button>
          </>
        );
      default:
        return (
          <>
            <span>{calcDateDiffToString(createdAt)}</span>
            {user.email === currentUser.email && (
              <>
                <button onClick={onEditMode}>수정</button>
                <button onClick={onRemoveMode}>삭제</button>
              </>
            )}
          </>
        );
    }
  };

  return (
    <CommentItemStyle>
      <ProfileImageArea>
        <ProfileImage src={user.src} size="40px" />
      </ProfileImageArea>
      <ContentArea editable={otherRenderType === 'edit'}>
        <a className="nickname" href="#">
          {user.nickname}
        </a>
        {otherRenderType === 'edit' ? (
          <textarea onChange={onChange} value={inputContent} spellCheck="false"></textarea>
        ) : (
          contentForDisplay
        )}
      </ContentArea>
      <OtherArea className="other-area">{renderOther(otherRenderType)}</OtherArea>
    </CommentItemStyle>
  );
};

export default CommentItem;
