import styled from 'styled-components';

const Boundary = styled.div`
  margin-bottom: 0.5rem;
  height: 1rem;
  border-radius: 10px;
  background-color: #dcdfe1;
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #75b700;
  height: 1rem;
  border-radius: 10px;
  color: white;
  width: ${({ percent }) => percent}%;
  transition: 0.5s;
`;

const ProgressBar = ({ percent }) => {
  return <Boundary>{!!percent && <Progress percent={percent}>{percent}%</Progress>}</Boundary>;
};

export default ProgressBar;
