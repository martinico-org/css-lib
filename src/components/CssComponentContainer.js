import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import colors from '../utils/colors'
import useScreenDimensions from '../hooks/useScreenDimensions'
import URL from '../utils/const'

const cssComponents = require('../master.json')

const CssComponentContainer = () => {
  const { height } = useScreenDimensions()
  const components = Object.values(cssComponents || {})
  return (
    <WrapperCssComponentContainer>
      {!!height &&
        components.map((comp, index) => {
          const size = height / 4
          const scaleValue = (size / 1920).toFixed(2)
          return (
            <WrapperComp key={`${index}CompCSS`} size={height / 4}>
              <IFrame
                title="css comp"
                scrolling={false}
                frameBorder={0}
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
  top: 0;
  left: 0;
  border-radius: 5px;
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
  transform: scale(${(props) => props?.scaleValue});
  will-change: transform;
  transform-style: preserve-3d;
`

const WrapperComp = styled.div`
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size / 1.77}px`};
  background-color: ${colors.grey};
  overflow: hidden;
  border-radius: 5px;
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
