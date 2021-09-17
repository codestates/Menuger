import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedContainer } from '../modules/dietColumnContainer';
import { useEffect } from 'react';

//import components
import DietColumnContainer from '../components/diet/DietColumnContainer';
import StandardButton from '../components/common/buttons/StandardButton';

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
    padding: 10px;
    margin: 10px 0;
  }

  > .button-box {
    display: flex;
    justify-content: right;

    button:last-child {
      margin-left: 7px;
    }
  }
`;

const DietEditPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedContainer(dummyData));
  }, []);

  const columnList = useSelector(state => state.dietColumnContainer);

  return (
    <DietEditPageStyle>
      <input id="input-title" type="text" placeholder="제목" />
      <input id="input-description" type="text" placeholder="식단 소개" />
      <DietColumnContainer columnList={columnList} />
      <textarea style={{ resize: 'none' }} cols="50" rows="10" placeholder="본문" />
      <input placeholder="(임시) ..tag작성" />
      <div className="button-box">
        <StandardButton>임시저장</StandardButton>
        <StandardButton>작성</StandardButton>
      </div>
    </DietEditPageStyle>
  );
};

export default DietEditPage;
