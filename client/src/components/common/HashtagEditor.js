import styled from 'styled-components';
import { useState, useRef } from 'react';

const HashtagEditorStyle = styled.div`
  width: ${props => props.width || 'auto'};
  border: solid 1px #000;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: text;

  > ul {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;

    > li {
      padding: 5px 0;
      margin-left: 5px;
    }
  }
`;

const Tag = styled.div`
  height: 100%;
  font-size: 0.8rem;
  border: solid 1px #000;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  > .delete-btn {
    background-color: rgba(0, 0, 0, 0);
    color: #d0d0d0;
    border: none;
    cursor: pointer;

    &.delete-btn:hover {
      color: #ff0000;
    }

    &.delete-btn:active {
      color: #bd0000;
    }
  }
`;

const TagInputForm = styled.form`
  > input {
    font-size: 0.8rem;
    width: 180px;
    padding: 5px;
    outline: none;
    border: ${props => (props.isError ? 'solid 1px #ff0000' : 'solid 1px rgba(0, 0, 0, 0)')};
    border-radius: 5px;
  }
`;

/*
  props = {
    tagList:[{
      id: id,
      name: tag이름,
    }],
    addTag: (tag) => {
      //tag를 배열에 추가하는 동작
    },
    width: 옵션 (기본값=auto),
  }
*/

const HashtagEditor = ({ tagList = [], updateTagList, width }) => {
  const [inputTag, setInputTag] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputBox = useRef();

  const placeholderList = [
    '입력 후 enter를 눌러주세요.',
    '이미 등록된 태그입니다.',
    '한글자 이상 입력해야합니다.',
  ];

  if (typeof updateTagList !== 'function') {
    const error = new Error(
      'props로 받은 "updateTagList"가 함수가 아닙니다. "updateTagList"는 함수여야 합니다.',
    );
    updateTagList = () => {
      console.error(error);
    };
  }

  const addTag = tag => {
    const newTagList = [...tagList, tag];
    updateTagList(newTagList);
  };

  const removeTag = tag => {
    const newTagList = tagList.filter(tagInList => {
      return tagInList.name !== tag.name;
    });
    updateTagList(newTagList);
  };

  const focusInputBox = () => {
    inputBox.current.focus();
  };

  const onChange = e => {
    if (placeholderIndex !== 0) {
      setPlaceholderIndex(0);
    }
    setInputTag(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    //입력값 없음
    if (inputTag.length <= 0) {
      setPlaceholderIndex(2);
      return;
    }

    //중복된 태그
    const alreadyTag = tagList.find(tag => tag.name === inputTag);
    if (alreadyTag !== undefined) {
      setPlaceholderIndex(1);
      setInputTag('');
      return;
    }

    //태그 추가
    addTag({ id: -1, name: inputTag });
    setInputTag('');
  };

  return (
    <HashtagEditorStyle width={width} onClick={focusInputBox}>
      <ul>
        {tagList.map(tag => {
          return (
            <li key={tag.name}>
              <Tag>
                #{tag.name}{' '}
                <button className="delete-btn" onClick={() => removeTag(tag)}>
                  x
                </button>
              </Tag>
            </li>
          );
        })}
        <li>
          <TagInputForm onSubmit={onSubmit} isError={placeholderIndex !== 0}>
            <input
              type="text"
              value={inputTag}
              placeholder={placeholderList[placeholderIndex]}
              onChange={onChange}
              ref={inputBox}
            />
          </TagInputForm>
        </li>
      </ul>
    </HashtagEditorStyle>
  );
};

export default HashtagEditor;
