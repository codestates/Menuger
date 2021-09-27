import { useRef } from 'react';
import styled from 'styled-components';

import RecipeEditor from '../components/recipe_edit/RecipeEditor';
import extractThumbnail from '../utils/thumbnail';

const { REACT_APP_MOBILE_WIDTH, REACT_APP_WEB_MAX_WIDTH } = process.env;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${REACT_APP_WEB_MAX_WIDTH};
`;

const RecipeTitleInput = styled.input`
  border: none;
  width: 30%;
  height: 50px;
  padding-left: 0.5rem;
  font-size: 1.5rem;
  margin: 1rem 0;
  &:focus {
    padding-top: 2px;
    outline: none;
    border-bottom: 1px solid #cdc5bf;
  }
  @media screen and (max-width: ${REACT_APP_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

const HashTagInput = styled.input`
  border: none;
  width: 100%;
  height: 30px;
  padding-left: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  &:focus {
    padding-top: 2px;
    outline: none;
    border-bottom: 1px solid #cdc5bf;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: ${REACT_APP_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

//TODO: replace with STANDARD_BUTTON
const TempSaveBtn = styled(Button)`
  background-color: #8b8682;
`;
//TODO: replace with STANDARD_BUTTON
const SaveBtn = styled(Button)`
  margin-left: 0.5rem;
  background-color: #27ae61;
`;

const RecipeEditPage = () => {
  const editorRef = useRef();

  const onClickTempSave = () => {};
  const onClickSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const recipeContent = editorInstance.getHTML();
    const thumbnail = extractThumbnail(recipeContent);
    //TODO: save recipeContent and thumbnail
  };

  return (
    <Wrapper>
      <RecipeTitleInput type="text" placeholder="제목" />
      <RecipeEditor editorRef={editorRef} />
      <HashTagInput type="text" placeholder="#해시태그" />
      <Buttons>
        <TempSaveBtn onClick={onClickTempSave}>임시저장</TempSaveBtn>
        <SaveBtn onClick={onClickSave}>저장</SaveBtn>
      </Buttons>
    </Wrapper>
  );
};

export default RecipeEditPage;
