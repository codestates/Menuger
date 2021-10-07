import styled from 'styled-components';
import svgToComponent from '../../utils/svg';

const ProfileImageStyle = styled.div`
  width: ${props => props.size || '75px'};
  height: ${props => props.size || '75px'};
  background-color: #dadde6;
  border: solid 2px #00000000;
  border-radius: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border: solid 2px #ffc436;
  }

  > img {
    width: ${props => props.size || '75px'};
    height: ${props => props.size || '75px'};
  }

  @media screen and (max-width: 768px) {
    //(옵션 없으면 순서대로 적용)
    //mobileSize => size => 75px
    width: ${props => (props.mobileSize ? props.mobileSize : props.size || '75px')};
    height: ${props => (props.mobileSize ? props.mobileSize : props.size || '75px')};
  }
`;

const ProfileImage = ({ src, alt, size, mobileSize, iconSize, onClick }) => {
  const iconProps = {
    width: iconSize || '45%',
    height: iconSize || '45%',
  };
  return (
    <ProfileImageStyle size={size} mobileSize={mobileSize} onClick={onClick}>
      {src ? <img src={src} alt={alt} /> : svgToComponent({ svgName: 'chef', props: iconProps })}
    </ProfileImageStyle>
  );
};

export default ProfileImage;
