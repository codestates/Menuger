import styled from 'styled-components';

//import components
import DietColumnContainer from './DietColumnContainer';
import StandardButton from '../common/buttons/StandardButton';

//import temporary
import dummydata from './dummy_data';

const DietViewerStyle = styled.div`
  border: solid 1px #000;
  border-radius: 5px;
  padding: 20px;
`;

const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  display: flex;
  margin-top: 20px;

  > :first-child {
    flex-basis: 70%;
  }

  > :last-child {
    margin-left: 20px;
    flex-basis: 30%;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > :first-child {
      flex-basis: 1;
    }

    > :last-child {
      margin-left: 0;
      margin-top: 20px;
      flex-basis: 1;
    }
  }
`;

const Contents = styled.div`
  > textarea {
    resize: none;
    display: block;
    width: 100%;
    padding: 10px;
    border: solid 1px #000;
    border-radius: 5px;
    outline: none;
    cursor: default;

    &:first-of-type {
      min-height: 60px;
    }

    &:last-of-type {
      margin-top: 20px;
      min-height: 300px;
    }
  }
`;

//temp
const TempComponent = styled.div`
  border: solid 1px #000;
  border-radius: 5px;
  padding: 10px;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const DietViewer = () => {
  return (
    <DietViewerStyle>
      <ViewerHeader>
        <h1>제목</h1>
        <StandardButton>수정</StandardButton>
      </ViewerHeader>
      <Section>
        <DietColumnContainer columnList={dummydata} readonly />
        <TempComponent>정보 컴포넌트</TempComponent>
      </Section>
      <Section>
        <Contents>
          <textarea readOnly>식단표 소개</textarea>
          <textarea readOnly>본문</textarea>
        </Contents>
        <TempComponent>댓글 컴포넌트</TempComponent>
      </Section>
    </DietViewerStyle>
  );
};

export default DietViewer;
