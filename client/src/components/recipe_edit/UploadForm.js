import { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ProgressBar from './ProgressBar';
import useKeyPress from '../../hooks/useKeyPress';
import useToast from '../../hooks/toast/useToast';

const FILE_NUM_LIMIT = 5;
const PERCENT_TO_RATE_RATIO = 100;
const FILE_UPLOAD_MESSAGE = '이미지 파일을 업로드 해주세요';
const TOO_MANY_FILES_MESSAGE = '최대 5개의 이미지 파일만 올려주세요';
const { REACT_APP_MOBILE_WIDTH, REACT_APP_ENDPOINT_URL, REACT_APP_S3_URL } = process.env;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;

const FormWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => (width ? `${width}%` : '35%')};
  @media screen and (max-width: ${REACT_APP_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

const Form = styled.form``;

const FileDropper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  min-height: 200px;
  background-color: #f5f4f5;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #a4a3a7;
    transition: 0.3s;
    color: white;
  }
`;

const FileWrapper = styled.div`
  width: 50%;
`;

const FileName = styled.div`
  width: 100%;
  height: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  font-size: 1.5rem;
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #27ae61;
  &:hover {
    background-color: #229954;
    cursor: pointer;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
  @media screen and (max-width: ${REACT_APP_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

const UploadForm = ({ editorRef, width, setUploadModal, setImages }) => {
  const marginRef = useRef();
  const [files, setFiles] = useState(null);
  const [percents, setPercents] = useState([]);
  const [uploadedImages, setUploadedImages] = useState(null);
  const addMessage = useToast();

  const closeUploadModal = () => setUploadModal(false);
  useKeyPress('Escape', closeUploadModal);

  const handleClickMargin = ({ target }) => {
    if (target === marginRef.current) {
      closeUploadModal();
    }
  };

  const handleImageSelect = ({ target }) => {
    const fileNum = target.files.length;
    setUploadedImages(null);
    if (!fileNum) {
      return setFiles(null);
    }
    if (fileNum > FILE_NUM_LIMIT) {
      addMessage({ mode: 'warning', message: TOO_MANY_FILES_MESSAGE, delay: 2000 });
      return setFiles(null);
    }
    setFiles(target.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data: presignedData } = await axios.post(
        `${REACT_APP_ENDPOINT_URL}/recipes/presigned`,
        {
          contentTypes: [...files].map(file => file.type),
        },
      );

      await Promise.all(
        [...files].map((file, idx) => {
          const { presigned } = presignedData.data[idx];
          const formData = new FormData();

          for (const key in presigned.fields) {
            formData.append(key, presigned.fields[key]);
          }
          formData.append('Content-Type', file.type);
          formData.append('file', file);

          return axios.post(presigned.url, formData, {
            onUploadProgress: ({ loaded, total }) => {
              setPercents(prevPercents => {
                const newData = [...prevPercents];
                newData[idx] = Math.round((loaded / total) * PERCENT_TO_RATE_RATIO);
                return newData;
              });
            },
          });
        }),
      );

      const editorInstance = editorRef.current.getInstance();

      presignedData.data.forEach(({ imageKey }) => {
        editorInstance.insertText(`<img src=${REACT_APP_S3_URL}/raw/${imageKey} width="400" />\n`);
      });

      setImages([
        {
          imageKey: presignedData.data[0].imageKey,
          originalname: files[0].name,
        },
      ]);

      setUploadModal(false);
      addMessage({ message: '이미지 업로드 성공', delay: 2000 });
    } catch (err) {
      addMessage({ mode: 'error', message: '이미지 업로드 실패', delay: 2000 });
    }
  };

  return (
    <Overlay onClick={handleClickMargin} ref={marginRef}>
      <FormWrapper width={width}>
        <Form onSubmit={handleSubmit}>
          <FileDropper>
            {files &&
              [...files].map((file, idx) => (
                <FileWrapper key={idx}>
                  <FileName key={file.name}>{file.name}</FileName>
                  <ProgressBar percent={percents[idx]} />
                </FileWrapper>
              ))}
            {!files && FILE_UPLOAD_MESSAGE}
            <Input
              id="image"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={handleImageSelect}
            />
          </FileDropper>
          <Button type="submit" disabled={!files || uploadedImages}>
            URL 변환
          </Button>
        </Form>
      </FormWrapper>
    </Overlay>
  );
};

export default UploadForm;
