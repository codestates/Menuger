import styled from 'styled-components';
import React, { useState } from 'react';
import DragDataProvider from '../utils/drag';

//import components
import DietColumnContainer from '../components/diet/DietColumnContainer';
import StandardButton from '../components/common/buttons/StandardButton';
import HashtagEditor from '../components/common/HashtagEditor';

//temporary import
import dummyData from '../components/diet/dummy_data';

const DietEditPageStyle = styled.div`
  max-width: 1130px;
  margin: 20px auto 20px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;

  > input {
    outline: none;
  }

  > #input-title {
    border: none;
    width: 350px;
    height: 3rem;
    text-indent: 0.5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #cdc5bf;
  }

  > #input-description {
    font-size: 1rem;
    height: 2.5rem;
    margin: 20px 0;
    text-indent: 0.8rem;
    border: solid 1px #dadde6;
    border-radius: 5px;
    width: 500px;
  }

  > textarea {
    height: 300px;
    border: solid 1px #dadde6;
    border-radius: 5px;
    outline: none;
    padding: 10px;
    margin: 10px 0;
    font-size: 1rem;
  }

  > .button-box {
    display: flex;
    justify-content: right;
    margin-top: 10px;

    button:last-child {
      margin-left: 7px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;

    > #input-title {
      width: 100%;
    }

    > #input-description {
      width: 100%;
    }
  }
`;

const DietEditPage = () => {
  const [tagList, setTagList] = useState([]);
  const [dietColumnList, setDietColumnList] = useState(dummyData);

  const updateTagList = tagList => {
    setTagList(tagList);
  };

  const updateColumnList = columnList => {
    setDietColumnList([...columnList]);
  };

  return (
    <DragDataProvider>
      <DietEditPageStyle>
        <input id="input-title" type="text" placeholder="제목" />
        <input id="input-description" type="text" placeholder="식단 소개" />
        <DietColumnContainer dietColumnList={dietColumnList} updateColumnList={updateColumnList} />
        <textarea style={{ resize: 'none' }} cols="50" rows="10" placeholder="본문" />
        <HashtagEditor tagList={tagList} updateTagList={updateTagList} />
        <div className="button-box">
          <StandardButton backgroundColor="#fc9f77">임시저장</StandardButton>
          <StandardButton>작성</StandardButton>
        </div>
      </DietEditPageStyle>
    </DragDataProvider>
  );
};

export default DietEditPage;
