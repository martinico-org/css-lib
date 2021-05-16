import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { keyframes } from '@emotion/core'
import colors from '../utils/colors'
import useScreenDimensions from '../hooks/useScreenDimensions'
import URL from '../utils/const'
import Tag from './Tag'
import toSentenceCase from '../utils/functions'

const CssComponentContainer = ({ comps, selectedCategories }) => {
  const { width, mobile } = useScreenDimensions()
  const [cssCompsLoads, setCssCompsLoads] = React.useState([])

  const handleOnLoad = (event, id) => {
    event.preventDefault()
    setCssCompsLoads((e) => [...e, id])
  }

  React.useEffect(() => {
    if (!selectedCategories.length) return
    const newCssCompsLoads = comps.reduce(
      (acc, v) => {
        if (!selectedCategories.includes(toSentenceCase(v?.category))) {
          acc = [...acc].filter((e) => e !== v?.id) // eslint-disable-line no-param-reassign
        }
        return acc
      },
      [...cssCompsLoads]
    )
    setCssCompsLoads(newCssCompsLoads)
  }, [selectedCategories])

  return (
    <WrapperCssComponentContainer>
      {!!width &&
        comps.map((comp, index) => {
          if (
            selectedCategories.length &&
            !selectedCategories.includes(toSentenceCase(comp.category))
          )
            return null
          const size = mobile ? width * 0.95 : width / 4.5
          const scaleValue = size / 1920
          const compLoaded = cssCompsLoads.includes(comp?.id)
          return (
            <WrapperComp
              key={`${index}CompCSS`}
              load={compLoaded}
              size={size}
              mobile={mobile}
            >
              {!compLoaded && (
                <CompLoader src="/assets/app/loader.svg" alt="loader comp" />
              )}
              <IFrame
                title="css comp"
                displayed={compLoaded}
                scrolling={0}
                frameBorder={0}
                onLoad={(e) => handleOnLoad(e, comp?.id)}
                size={size}
                scaleValue={scaleValue}
                src={`${URL}/viewer/${comp?.id}?fullscreen=true`}
              />
              <Overlay canDisplayedTags={compLoaded} mobile={mobile}>
                <WrapperTags>
                  <OverlayClickable
                    onClick={() => navigate(`/viewer/${comp?.id}`)}
                  />
                  <TagsIndicators displayed={compLoaded}>
                    {comp.tags.map((tag, i) => {
                      if (i >= 4) return null
                      return (
                        <Tag
                          key={`${i} tag preview`}
                          label={tag}
                          height={12}
                          customMargin="5px"
                          fontSize={12}
                          tag
                        />
                      )
                    })}
                  </TagsIndicators>
                </WrapperTags>
              </Overlay>
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
  z-index: 1;
`

const WrapperTags = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const TagsIndicators = styled.div`
  position: relative;
  transition: all 300ms ease-in-out;
  opacity: 0;
  z-index: 2;
  user-select: none;
`

const loaderRotation = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) scale(0.3) rotate(0deg);
  }
  100% {
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 5;
  div {
    opacity: ${(props) => props?.mobile && 1};
  }
  &:hover {
    div {
      opacity: ${(props) => props?.canDisplayedTags && 1};
    }
  }
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
  margin: ${(props) => (props?.mobile ? '15px' : '15px 0')};
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
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
