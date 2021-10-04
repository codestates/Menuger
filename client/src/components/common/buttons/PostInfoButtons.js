import styled from 'styled-components';

import usePostInfoButton from '../../../hooks/usePostInfoButton';
import { BsBookmark, BsBell } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 15%;
`;

const PostInfoButtons = ({ postId, postType, active, bookmarksCount = 0, likesCount = 0 }) => {
  const SubBtn = usePostInfoButton({ postId, postType, active });
  const BookmarkBtn = usePostInfoButton({ postId, postType, active, count: bookmarksCount });
  const LikeBtn = usePostInfoButton({ postId, postType, active, count: likesCount });

  return (
    <Wrapper>
      <SubBtn>
        <BsBell size="100%" />
      </SubBtn>
      <BookmarkBtn>
        <BsBookmark size="100%" />
      </BookmarkBtn>
      <LikeBtn>
        <AiOutlineLike size="100%" />
      </LikeBtn>
    </Wrapper>
  );
};

export default PostInfoButtons;
