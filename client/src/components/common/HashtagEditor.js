import styled from 'styled-components';
import { useState, useRef } from 'react';
import { darken } from 'polished';

const HashtagEditorStyle = styled.div`
  width: ${props => props.width || 'auto'};
  border: solid 1px #dadde6;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: text;
  overflow-x: hidden;

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
  background-color: #dadde6;
  border-radius: 5px;
  padding: 5px 5px 5px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  > .delete-btn {
    background-color: rgba(0, 0, 0, 0);
    color: #5e5e5e;
    border: none;
    cursor: pointer;

    padding: 0 4px;

    &.delete-btn:hover {
      color: #f66d6d;
    }

    &.delete-btn:active {
      color: ${darken(0.2, '#f66d6d')};
    }
  }
`;

const TagInputForm = styled.form`
  > input {
    font-size: 0.8rem;
    width: 180px;
    padding: 5px;
    outline: none;
    border: ${props => (props.isError ? 'solid 1px #f66d6d' : 'solid 1px rgba(0, 0, 0, 0)')};
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
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
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
      return tagInList !== tag;
    });
    updateTagList(newTagList);
  };

  const focusInputBox = () => {
    inputBox.current.focus();
  };

  const onChange = e => {
    if (currentPlaceholder !== 0) {
      setCurrentPlaceholder(0);
    }
    setInputTag(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const trimedTag = inputTag.trim();
    //입력값 없음
    if (trimedTag.length <= 0) {
      setCurrentPlaceholder(2);
      setInputTag('');
      return;
    }

    //중복된 태그
    const alreadyTag = tagList.find(tag => tag === trimedTag);
    if (alreadyTag !== undefined) {
      setCurrentPlaceholder(1);
      setInputTag('');
      return;
    }

    //태그 추가
    addTag(trimedTag);
    setInputTag('');
  };

  return (
    <HashtagEditorStyle width={width} onClick={focusInputBox}>
      <ul>
        {tagList.map(tag => {
          return (
            <li key={tag}>
              <Tag>
                #{tag}
                <button className="delete-btn" onClick={() => removeTag(tag)}>
                  x
                </button>
              </Tag>
            </li>
          );
        })}
        <li>
          <TagInputForm onSubmit={onSubmit} isError={currentPlaceholder !== 0}>
            <input
              type="text"
              value={inputTag}
              placeholder={placeholderList[currentPlaceholder]}
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
