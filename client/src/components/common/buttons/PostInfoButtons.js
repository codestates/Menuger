import styled from 'styled-components';

import usePostInfoButton from '../../../hooks/usePostInfoButton';
import { BsBookmark, BsBell } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10%;
`;

const PostInfoButtons = ({ postId, postType, active, bookmarksCount = 0, likesCount = 0 }) => {
  const SubBtn = usePostInfoButton({ postId, postType, active });
  const BookmarkBtn = usePostInfoButton({ postId, postType, active, count: bookmarksCount });
  const LikeBtn = usePostInfoButton({ postId, postType, active, count: likesCount });
  const buttonSize = '25px';
  return (
    <Wrapper>
      <SubBtn>
        <BsBell size={buttonSize} />
      </SubBtn>
      <BookmarkBtn>
        <BsBookmark size={buttonSize} />
      </BookmarkBtn>
      <LikeBtn>
        <AiOutlineLike size={buttonSize} />
      </LikeBtn>
    </Wrapper>
  );
};

export default PostInfoButtons;
