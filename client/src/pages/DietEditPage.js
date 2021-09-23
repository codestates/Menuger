import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedContainer } from '../modules/dietColumnContainer';
import { useEffect, useState } from 'react';

//import components
import DietColumnContainer from '../components/diet/DietColumnContainer';
import StandardButton from '../components/common/buttons/StandardButton';
import HashtagEditor from '../components/common/HashtagEditor';

//temporary import
import dummyData from '../components/diet/dummy_data';

const DietEditPageStyle = styled.div`
  max-width: 1160px;
  padding: 20px;
  border: solid 1px #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  > input {
    height: 30px;
    text-indent: 5px;
    border: solid 1px #000;
    border-radius: 5px;
    margin-bottom: 10px;
    &#input-title {
      width: 300px;
    }
    &#input-description {
      width: 500px;
    }
  }

  > textarea {
    height: 300px;
    border: solid 1px #000;
    border-radius: 5px;
    outline: none;
    padding: 10px;
    margin: 10px 0;
  }

  > .button-box {
    display: flex;
    justify-content: right;
    margin-top: 10px;

    button:last-child {
      margin-left: 7px;
    }
  }
`;

const DietEditPage = () => {
  const [tagList, setTagList] = useState([]);
  const dispatch = useDispatch();
  const columnList = useSelector(state => state.dietColumnContainer);

  useEffect(() => {
    dispatch(setSelectedContainer(dummyData));
  }, [dispatch]);

  const updateTagList = tagList => {
    setTagList(tagList);
  };
  return (
    <DietEditPageStyle>
      <input id="input-title" type="text" placeholder="제목" />
      <input id="input-description" type="text" placeholder="식단 소개" />
      <DietColumnContainer columnList={columnList} />
      <textarea style={{ resize: 'none' }} cols="50" rows="10" placeholder="본문" />
      <HashtagEditor tagList={tagList} updateTagList={updateTagList} />
      <div className="button-box">
        <StandardButton>임시저장</StandardButton>
        <StandardButton>작성</StandardButton>
      </div>
    </DietEditPageStyle>
  );
};

export default DietEditPage;
