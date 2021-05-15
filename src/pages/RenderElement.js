import React from 'react'
import styled from '@emotion/styled'
import { css as emotionCss, Global } from '@emotion/core'
import parse from 'html-react-parser'
import { navigate, useLocation } from '@reach/router'
import { parse as queryParser } from 'query-string'
import Toggle from '../components/Toggle'
import Switch from '../components/Switch'
import CodeRenderer from '../components/CodeRenderer'

const cssComponents = require('../master.json')

const RenderElement = ({ id }) => {
  const location = useLocation()
  const searchParams = queryParser(location.search)
  const fullScreen = searchParams?.fullscreen || null
  const inApp = searchParams?.inApp || null
  const [toggle, setToggle] = React.useState(true)
  const [linesSwitch, setLinesSwitch] = React.useState(false)
  const { html, css } = cssComponents[id]
  const htmlParsed = parse(html)

  const handleToggle = () => {
    setToggle((e) => !e)
  }

  const handleSwitch = () => {
    setLinesSwitch((e) => !e)
  }

  return (
    <WrapperPage>
      {!fullScreen && (
        <WrapperToggle top={25} left={25}>
          <BackButton
            src="/assets/app/arrow.svg"
            alt="back button"
            onClick={() => navigate(`/`)}
          />
        </WrapperToggle>
      )}
      {inApp && (
        <WrapperToggle top={25} right={25}>
          <CloseButton
            src="/assets/app/close.svg"
            alt="back button"
            onClick={() => navigate(`/viewer/${id}`)}
          />
        </WrapperToggle>
      )}
      <Global
        styles={emotionCss`
          ${css}
        `}
      />
      <WrapperElement fullScreen={fullScreen}>
        <WrapperAnim fullScreen={fullScreen}>{htmlParsed}</WrapperAnim>
        {!fullScreen && (
          <WrapperToggle bottom={20} right={20}>
            <FullscreenButton
              src="/assets/app/fullscreen.svg"
              alt="fullscreen"
              onClick={() =>
                navigate(`/viewer/${id}?fullscreen=true&inApp=true`)
              }
            />
          </WrapperToggle>
        )}
      </WrapperElement>
      {!fullScreen && (
        <WrapperElement>
          <WrapperSyntax>
            <WrapperToggle top={20} right={40}>
              <Toggle
                labels={['HTML', 'CSS']}
                onClick={handleToggle}
                toggleValue={toggle}
              />
            </WrapperToggle>
            <WrapperToggle top={70} right={40}>
              <Switch
                onClick={handleSwitch}
                switchValue={linesSwitch}
                label="Lines"
              />
            </WrapperToggle>
            <CodeRenderer
              html={html}
              css={css}
              toggle={toggle}
              linesSwitch={linesSwitch}
            />
          </WrapperSyntax>
        </WrapperElement>
      )}
    </WrapperPage>
  )
}

const FullscreenButton = styled.img`
  width: 30px;
  height: 30px;
  transition: all 300ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const BackButton = styled.img`
  width: 40px;
  height: 40px;
  transform: rotate(-90deg);
  transition: all 300ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1) rotate(-90deg);
  }
`

const CloseButton = styled.img`
  width: 40px;
  height: 40px;
  transition: all 300ms ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const WrapperToggle = styled.div`
  position: absolute;
  top: ${(props) => (props.bottom ? 'unset' : `${props.top}px`)};
  bottom: ${(props) => (props.top ? 'unset' : `${props.bottom}px`)};
  right: ${(props) => (props.left ? 'unset' : `${props.right}px`)};
  left: ${(props) => (props.right ? 'unset' : `${props.left}px`)};
  z-index: 1;
`

const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const WrapperElement = styled.div`
  position: relative;
  width: ${(props) => (props?.fullScreen ? '100%' : '50%')};
  height: 100%;
  display: flex;
  flex-direction: column;
`

const WrapperAnim = styled.div`
  margin: ${(props) => (props?.fullScreen ? '0' : '10px 5px 10px 10px')};
  height: 100%;
  border-radius: ${(props) => (props?.fullScreen ? '0' : '5px')};
  overflow: hidden;
`

const WrapperSyntax = styled.div`
  margin: 10px 10px 10px 5px;
  height: 100%;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: #1e1e1e;
`

export default RenderElement
