import useModal from '../hooks/useModal';
import axios from 'axios';
import { useState } from 'react';

//import components
import DietPost from '../components/diet/DietPost';

const DietPage = () => {
  const { isVisible, showModal, hideModal, ModalContainer } = useModal({});
  const [dietPostInfo, setDietPostInfo] = useState({ diet: {}, comments: [] });

  const onGet = async id => {
    try {
      const postRes = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/diets/${id}`);
      const commentsRes = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/diets/${id}/comments`,
      );
      if (postRes.status === 200) {
        console.log(postRes.data.diet);
        setDietPostInfo({ diet: postRes.data.diet, comments: commentsRes.data.comments });
        showModal();
      }
    } catch (e) {
      console.error(e);
      console.log('catch함');
      showModal();
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          onGet('615697c3ddedfe0b6ac1f820');
        }}
      >
        임시 버튼 id='615697c3ddedfe0b6ac1f820'
      </button>
      <button
        onClick={() => {
          onGet('61569c1cddedfe0b6ac1f825');
        }}
      >
        임시 버튼 id='61569c1cddedfe0b6ac1f825'
      </button>
      <ModalContainer>
        <DietPost post={dietPostInfo.diet} comments={dietPostInfo.comments} />
      </ModalContainer>
      식단페이지
    </div>
  );
};

export default DietPage;
