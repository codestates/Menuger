import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import RecipeEditor from '../components/recipe_edit/RecipeEditor';
import useToast from '../hooks/toast/useToast';
import StandardButton from '../components/common/buttons/StandardButton';
import HashTagEditor from '../components/common/HashtagEditor';

const { REACT_APP_MOBILE_WIDTH, REACT_APP_WEB_MAX_WIDTH } = process.env;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${REACT_APP_WEB_MAX_WIDTH};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RecipeTitleInput = styled.input`
  border: none;
  width: 30%;
  height: 50px;
  padding-left: 0.5rem;
  font-size: 1.5rem;
  margin: 1rem 0 0;
  &:focus {
    outline: none;
    border-bottom: 1px solid #dadde6;
  }
  @media screen and (max-width: ${REACT_APP_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const RecipeEditPage = () => {
  const editorRef = useRef();
  const titleRef = useRef();
  const [images, setImages] = useState();
  const [tagList, setTagList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const addMessage = useToast();
  const history = useHistory();

  const onClickSave = async () => {
    const title = titleRef.current.value;
    const editorInstance = editorRef.current.getInstance();
    const recipeContent = editorInstance.getHTML();

    if (!title.trim().length) {
      titleRef.current.focus();
      addMessage({ mode: 'info', message: '제목을 입력해주세요', delay: 1000 });
      return;
    }
    if (!recipeContent.trim().length) {
      editorInstance.mdEditor.el.childNodes[1].focus();
      addMessage({ mode: 'info', message: '본문을 입력해주세요', delay: 1000 });
      return;
    }
    setDisabled(true);
    try {
      const {
        data: {
          message,
          data: { postId },
        },
        status,
      } = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}/recipes`,
        {
          images,
          title,
          content: recipeContent,
          hashtags: tagList,
        },
        {
          withCredentials: true,
        },
      );
      if (status === 201) {
        addMessage({ message, delay: 1000 }, () => {
          history.push({
            pathname: '/RecipePage',
            state: { postId },
          });
        });
      } else {
        addMessage({ mode: 'error', message: '레시피 등록 중 오류가 발생하였습니다.' }, () => {
          history.push('/RecipePage');
        });
      }
    } catch (err) {
      addMessage({ mode: 'error', message: err.response.data.message }, () =>
        history.push('/RecipePage'),
      );
    }
  };

  return (
    <Wrapper>
      <RecipeTitleInput ref={titleRef} type="text" placeholder="제목" />
      <RecipeEditor editorRef={editorRef} setImages={setImages} />
      <HashTagEditor tagList={tagList} updateTagList={setTagList} width="100%" />
      <Buttons>
        <StandardButton
          backgroundColor="#fc9f77"
          padding="0.5rem 1rem"
          height="auto"
          onClick={() => alert('준비중인 서비스입니다')}
          disabled={disabled}
        >
          임시저장
        </StandardButton>
        <StandardButton
          padding="0.5rem 1rem"
          height="auto"
          onClick={onClickSave}
          disabled={disabled}
        >
          작성
        </StandardButton>
      </Buttons>
    </Wrapper>
  );
};

export default RecipeEditPage;
