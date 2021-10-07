import styled from 'styled-components';
import { BsExclamationCircle } from 'react-icons/bs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const IconContainer = styled.div`
  font-size: 5em;
  color: #f66d6d;
`;

const Title = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin: 15px auto;
`;

const Contents = styled.span`
  margin: 3px auto;
`;

const ServiceReady = () => {
  return (
    <Wrapper>
      <IconContainer>
        <BsExclamationCircle />
      </IconContainer>
      <Title>서비스 준비중입니다.</Title>
      <Contents>이용에 불편을 드려 죄송합니다.</Contents>
      <Contents>빠른 시일 내에 준비하여 찾아뵙겠습니다.</Contents>
    </Wrapper>
  );
};

export default ServiceReady;
