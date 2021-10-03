import styled from 'styled-components';
import { darken, lighten } from 'polished';

const HashtagListStyle = styled.div``;
const HashtagStyle = styled.span`
  margin-right: 0.2em;
  color: #1044d2;
  font-weight: 200;
  &:hover {
    color: ${lighten(0.3, '#1044d2')};
  }
  cursor: pointer;
`;

const HashtagList = ({ onClick, imageSize, active }) => {
  const arr = ['김치', '밥', '볶음밥', '달걀', '치즈'];
  return (
    <HashtagListStyle>
      {arr.map((e, idx) => {
        if (idx < 5) {
          return <HashtagStyle onClick={onClick}>{'#' + e}</HashtagStyle>;
        }
      })}
    </HashtagListStyle>
  );
};

export default HashtagList;
