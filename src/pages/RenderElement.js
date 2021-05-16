import React from 'react'
import styled from '@emotion/styled'
import { css as emotionCss, Global } from '@emotion/core'
import parse from 'html-react-parser'
import { navigate, useLocation } from '@reach/router'
import { parse as queryParser } from 'query-string'
import { NotAvailable } from './NotAvailable'
import Toggle from '../components/Toggle'
import Switch from '../components/Switch'
import CodeRenderer from '../components/CodeRenderer'
import useScreenDimensions from '../hooks/useScreenDimensions'

const cssComponents = require('../master.json')

const RenderElement = ({ id }) => {
  const location = useLocation()
  const { mobile } = useScreenDimensions()
  const searchParams = queryParser(location.search)
  const fullScreen = searchParams?.fullscreen || null
  const inApp = searchParams?.inApp || null
  const [toggle, setToggle] = React.useState(true)
  const [linesSwitch, setLinesSwitch] = React.useState(false)
  const [displayedCopyIndicator, setDisplayedCopyIndicator] =
    React.useState(false)
  const [displayedTogglesAction, setDisplayedTogglesAction] =
    React.useState(true)
  const [content, setContent] = React.useState({
    html: null,
    css: null,
    htmlParsed: null,
  })

  const handleToggle = () => {
    setToggle((e) => !e)
  }

  const handleSwitch = () => {
    setLinesSwitch((e) => !e)
  }

  React.useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(cssComponents, id)) {
      setContent({
        html: cssComponents[id].html,
        css: cssComponents[id].css,
        htmlParsed: parse(cssComponents[id].html),
      })
    }
  }, [])

  React.useEffect(() => {
    if (!mobile && !displayedTogglesAction) {
      setDisplayedTogglesAction(true)
    }
  }, [mobile])

  const handleTogglesAction = () => {
    if (!mobile) return
    setDisplayedTogglesAction((e) => !e)
  }

  const handleCopyCode = async () => {
    setDisplayedCopyIndicator(true)
    await navigator.clipboard
      .writeText(toggle ? content.html : content.css)
      .then(() => setTimeout(() => setDisplayedCopyIndicator(false), 600))
  }

  return (
    <>
      {content.html ? (
        <WrapperPage mobile={mobile}>
          {!fullScreen && (
            <WrapperToggle top={25} left={25} displayed>
              <BackButton
                src="/assets/app/arrow.svg"
                alt="back button"
                onClick={() => navigate(`/`)}
              />
            </WrapperToggle>
          )}
          {inApp && (
            <WrapperToggle top={25} right={25} displayed>
              <CloseButton
                src="/assets/app/close.svg"
                alt="back button"
                onClick={() => navigate(`/viewer/${id}`)}
              />
            </WrapperToggle>
          )}
          <Global
            styles={emotionCss`
          ${content.css}
        `}
          />
          <WrapperElement fullScreen={fullScreen} mobile={mobile}>
            <WrapperAnim fullScreen={fullScreen} mobile={mobile}>
              {content.htmlParsed}
            </WrapperAnim>
            {!fullScreen && (
              <WrapperToggle bottom={20} right={20} displayed>
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
            <WrapperElement mobile={mobile}>
              <WrapperSyntax mobile={mobile}>
                {mobile && <OverlayClickable onClick={handleTogglesAction} />}
                <WrapperToggle
                  top={20}
                  right={mobile ? 15 : 40}
                  displayed={displayedTogglesAction}
                >
                  <Toggle
                    labels={['HTML', 'CSS']}
                    onClick={handleToggle}
                    toggleValue={toggle}
                  />
                </WrapperToggle>
                <WrapperToggle
                  top={70}
                  right={mobile ? 15 : 40}
                  displayed={displayedTogglesAction}
                >
                  <Switch
                    onClick={handleSwitch}
                    switchValue={linesSwitch}
                    label="Lines"
                  />
                </WrapperToggle>
                <WrapperToggle
                  top={120}
                  right={mobile ? 15 : 40}
                  displayed={displayedTogglesAction}
                >
                  <WrapperButtonToCopy>
                    <CheckIndicator
                      displayed={displayedCopyIndicator}
                      src="/assets/app/check.svg"
                      alt="check 404"
                    />
                    <ButtonToCopy
                      src="/assets/app/copy.svg"
                      alt="copy button 404"
                      onClick={handleCopyCode}
                    />
                  </WrapperButtonToCopy>
                </WrapperToggle>
                <CodeRenderer
                  html={content.html}
                  css={content.css}
                  toggle={toggle}
                  linesSwitch={linesSwitch}
                />
              </WrapperSyntax>
            </WrapperElement>
          )}
        </WrapperPage>
      ) : (
        <NotAvailable />
      )}
    </>
  )
}

const CheckIndicator = styled.img`
  position: absolute;
  top: 50%;
  left: -30px;
  width: 20px;
  height: 20px;
  transition: all 300ms ease-out;
  transform: translateY(-50%);
  opacity: ${(props) => (props?.displayed ? 1 : 0)};
`

const WrapperButtonToCopy = styled.div`
  position: relative;
`

const ButtonToCopy = styled.img`
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

const OverlayClickable = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`

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
  display: ${(props) => (props?.displayed ? 'unset' : 'none')};
  transition: all 300ms ease-in-out;
  position: absolute;
  top: ${(props) => (props.bottom ? 'unset' : `${props.top}px`)};
  bottom: ${(props) => (props.top ? 'unset' : `${props.bottom}px`)};
  right: ${(props) => (props.left ? 'unset' : `${props.right}px`)};
  left: ${(props) => (props.right ? 'unset' : `${props.left}px`)};
  z-index: 2;
`

const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props?.mobile ? 'column' : 'row')};
`

const WrapperElement = styled.div`
  position: relative;
  width: ${(props) => (props?.fullScreen || props?.mobile ? '100%' : '50%')};
  height: ${(props) => (props?.mobile && !props?.fullScreen ? '50%' : '100%')};
  display: flex;
  flex-direction: column;
`

/* eslint-disable */

const WrapperAnim = styled.div`
  margin: ${(props) =>
    props?.mobile && !props?.fullScreen
      ? '10px 10px 5px 10px'
      : props?.fullScreen
      ? '0'
      : '10px 5px 10px 10px'};
  height: 100%;
  border-radius: ${(props) => (props?.fullScreen ? '0' : '5px')};
  overflow: hidden;
`

/* eslint-enable */

const WrapperSyntax = styled.div`
  position: relative;
  margin: ${(props) =>
    props?.mobile ? '5px 10px 10px 10px' : '10px 10px 10px 5px'};
  height: 100%;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: #1e1e1e;
`

export default RenderElement
