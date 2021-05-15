import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { keyframes } from '@emotion/core'
import colors from '../utils/colors'
import useScreenDimensions from '../hooks/useScreenDimensions'
import URL from '../utils/const'

const cssComponents = require('../master.json')

const CssComponentContainer = () => {
  const { height } = useScreenDimensions()
  const components = Object.values(cssComponents || {})
  const [cssCompsLoads, setCssCompsLoads] = React.useState([])

  const handleOnLoad = (event, id) => {
    event.preventDefault()
    setCssCompsLoads((e) => [...e, id])
  }

  return (
    <WrapperCssComponentContainer>
      {!!height &&
        components.map((comp, index) => {
          const size = height / 4
          const scaleValue = size / 1920
          const compLoaded = cssCompsLoads.includes(comp?.id)
          return (
            <WrapperComp
              key={`${index}CompCSS`}
              load={compLoaded}
              size={height / 4}
            >
              {!compLoaded && (
                <CompLoader src="./assets/app/loader.svg" alt="loader comp" />
              )}
              <IFrame
                title="css comp"
                displayed={compLoaded}
                scrolling={0}
                frameBorder={0}
                onLoad={(e) => handleOnLoad(e, comp?.id)}
                size={size}
                scaleValue={scaleValue}
                src={`${URL}/${comp?.id}?fullscreen=true`}
              />
              <OverlayClickable onClick={() => navigate(`/${comp?.id}`)} />
            </WrapperComp>
          )
        })}
    </WrapperCssComponentContainer>
  )
}

const loaderRotation = keyframes`
  0%{
    transform: translateX(-50%) translateY(-50%) scale(0.3) rotate(0deg);
  }
  100%{
    transform: translateX(-50%) translateY(-50%) scale(0.3) rotate(360deg);
  }
`

const CompLoader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translateX(-50%) translateY(-50%) scale(0.3);
  will-change: transform;
  transform-style: preserve-3d;
  transition: all 300ms ease-in-out;
  animation: ${loaderRotation} 2500ms linear infinite;
`

const OverlayClickable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 2;
`

const IFrame = styled.iframe`
  position: absolute;
  opacity: ${(props) => (props?.displayed ? 1 : 0)};
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
  transform: scale(${(props) => props?.scaleValue});
  will-change: transform;
  transform-style: preserve-3d;
  transition: all 300ms ease-in-out;
`

const WrapperComp = styled.div`
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size / 1.7777778}px`};
  background-color: ${(props) =>
    props?.load ? 'transparent' : colors.greySuperLight};
  border-radius: 5px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    will-change: transform;
    transform-style: preserve-3d;
  }
`

const WrapperCssComponentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default CssComponentContainer
