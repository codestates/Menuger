import styled from 'styled-components';

//import components
import DietColumnContainer from './DietColumnContainer';

//import temporary
import dummydata from './dummy_data';

const DietViewerStyle = styled.div`
  > textarea {
    resize: none;
    display: block;
    width: 100%;
    padding: 10px;
    border: solid 1px #000;
    border-radius: 5px;
    outline: none;
    cursor: default;
    margin-top: 20px;

    &:first-of-type {
      min-height: 60px;
    }

    &:last-of-type {
      min-height: 300px;
    }
  }
`;

const DietViewer = () => {
  return (
    <DietViewerStyle>
      <DietColumnContainer columnList={dummydata} readonly />
      <textarea readOnly>식단표 소개</textarea>
      <textarea readOnly>본문</textarea>
    </DietViewerStyle>
  );
};

export default DietViewer;
