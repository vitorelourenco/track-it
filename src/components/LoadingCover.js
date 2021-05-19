import styled from 'styled-components';
import ThreeDots from './ThreeDots';

export default function LoadingCover(props){
  return (
    <CoverWrapper isInteractive={props.isInteractive} rgba={props.rgba}>
      <ThreeDots />
    </CoverWrapper>
  );
}

const CoverWrapper = styled.div`
  display: ${props=>props.isInteractive?"none":"initial"};
  position: absolute;
  border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props=>props.rgba};

  & > *{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
