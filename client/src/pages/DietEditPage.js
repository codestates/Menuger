import styled from 'styled-components';
import React, { useState } from 'react';
import DragDataProvider from '../utils/drag';
import axios from 'axios';
import useToast from '../hooks/toast/useToast';
import { useHistory } from 'react-router';

//import components
import DietColumnContainer from '../components/diet/DietColumnContainer';
import StandardButton from '../components/common/buttons/StandardButton';
import HashtagEditor from '../components/common/HashtagEditor';
import useModal from '../hooks/useModal';
import ServiceReady from '../components/common/ServiceReady';

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
  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [dietColumnList, setDietColumnList] = useState([]);
  const [content, setContent] = useState('');
  const [hashTagList, setHashTagList] = useState([]);

  const displayToast = useToast();
  const history = useHistory();

  const modalConfig = { width: 50, height: 45, padding: 2.5, overflow: 'hidden' };
  const { showModal, ModalContainer } = useModal(modalConfig);

  const updateTagList = tagList => {
    setHashTagList(tagList);
  };

  const updateColumnList = columnList => {
    setDietColumnList([...columnList]);
  };

  const verifyInput = () => {
    if (title.trim().length <= 0) {
      displayToast({
        mode: 'error',
        message: '제목을 입력해주세요.',
      });
      return false;
    }

    if (subtitle.trim().length <= 0) {
      displayToast({
        mode: 'error',
        message: '식단 소개를 작성해주세요.',
      });
      return false;
    }

    if (dietColumnList.length <= 0) {
      displayToast({
        mode: 'error',
        message: '작성된 식단이 없습니다.',
      });
      return false;
    }

    if (content.trim().length <= 0) {
      displayToast({
        mode: 'error',
        message: '본문을 작성해주세요.',
      });
      return false;
    }

    return true;
  };

  const write = async () => {
    if (verifyInput() === false) {
      return;
    }

    const data = {
      title,
      subtitle,
      dietColumnList,
      content,
      hashtags: hashTagList,
    };

    try {
      const {
        data: {
          message,
          data: { postId },
        },
      } = await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/diets`, data, {
        withCredentials: true,
      });
      displayToast({ message, delay: 1000 }, () => {
        history.push({
          pathname: '/diets',
          search: '?sort=dd',
          state: { postId },
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeTitle = e => setTitle(e.target.value);
  const onChangeSubTitle = e => setSubTitle(e.target.value);
  const onChangeContent = e => setContent(e.target.value);

  return (
    <DragDataProvider>
      <DietEditPageStyle>
        <input
          id="input-title"
          type="text"
          placeholder="제목"
          value={title}
          onChange={onChangeTitle}
        />
        <input
          id="input-description"
          type="text"
          placeholder="식단 소개"
          value={subtitle}
          onChange={onChangeSubTitle}
        />
        <DietColumnContainer dietColumnList={dietColumnList} updateColumnList={updateColumnList} />
        <textarea
          style={{ resize: 'none' }}
          cols="50"
          rows="10"
          placeholder="본문"
          value={content}
          onChange={onChangeContent}
        />
        <HashtagEditor tagList={hashTagList} updateTagList={updateTagList} />
        <div className="button-box">
          <StandardButton backgroundColor="#fc9f77" onClick={showModal}>
            임시저장
          </StandardButton>
          <StandardButton onClick={write}>작성</StandardButton>
        </div>
      </DietEditPageStyle>
      <ModalContainer>
        <ServiceReady />
      </ModalContainer>
    </DragDataProvider>
  );
};

export default DietEditPage;
