import styled from 'styled-components';

export default function Logo(props){
  const {logoWidth} = props;
  const logoScale = logoWidth/160;
  return (
    <LogoWrapper className="logo" logoScale={logoScale} logoWidth={logoWidth}>
      <svg className="bar-3" xmlns="http://www.w3.org/2000/svg" width="19" height="64" viewBox="0 0 19 64" fill="none">
        <path d="M0.239502 0V56.0479L18.2934 63.3233V0H0.239502Z" fill="#8FC549"/>
      </svg>
      <svg className="bar-2" xmlns="http://www.w3.org/2000/svg" width="19" height="43" viewBox="0 0 19 43" fill="none">
        <path d="M0.448975 0.0479126V35.0779L18.5029 42.3533V0.0479126H0.448975Z" fill="#E75766"/>
      </svg>
      <svg className="bar-1" xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
        <path d="M0.19751 0.401184V15.7605L18.2514 23.0359V0.401184H0.19751Z" fill="#8FC549"/>
      </svg>
      <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="153" height="50" viewBox="0 0 156 50" fill="none">
        <path d="M0.395264 30.1736V49.3054L37.3114 19.3952L107.102 49.3054L143.21 22.3593L146.443 30.1736L155.335 2.95806L127.85 7.5389L135.126 10.7724L107.102 31.2515L37.3114 0.802368L0.395264 30.1736Z" fill="#126BA5"/>
      </svg>
      <svg className="shadow" xmlns="http://www.w3.org/2000/svg" width="143" height="17" viewBox="0 0 143 17" fill="none">
        <ellipse cx="71.4671" cy="8.34129" rx="71.1377" ry="7.81437" fill="#E6E7E8"/>
      </svg>
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  transform: ${(props)=>`scale(${props.logoScale})`};
  height: 91px;
  width: 160px;
  position: relative;
  display: inline-block;

  & > svg {
    position: absolute;
  }

  & .bar-1 {
    top: 19px;
    left: 37px;
  }

  & .bar-2 {
    top: 10px;
    left: 61px;
  }

  & .bar-3 {
    top: 0;
    left: 87px;
  }

  & .arrow {
    top: 36px;
    left: 0;
  }

  & .shadow {
    top: 74px;
    left: 15px;
    z-index: -1;
  }
`