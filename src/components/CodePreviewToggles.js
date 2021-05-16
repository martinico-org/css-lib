import React from 'react'
import styled from '@emotion/styled'
import Toggle from './Toggle'
import Switch from './Switch'
import useScreenDimensions from '../hooks/useScreenDimensions'

const CodePreviewToggles = ({
  displayedTogglesAction,
  handleToggle,
  toggle,
  handleSwitch,
  linesSwitch,
  displayedCopyIndicator,
  handleCopyCode,
}) => {
  const { mobile } = useScreenDimensions()
  return (
    <>
      <WrapperToggle
        top={20}
        right={mobile ? 25 : 40}
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
        right={mobile ? 25 : 40}
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
        right={mobile ? 25 : 40}
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

const WrapperToggle = styled.div`
  position: absolute;
  display: ${(props) => (props?.displayed ? 'unset' : 'none')};
  transition: all 300ms ease-in-out;
  top: ${(props) => (props.bottom ? 'unset' : `${props.top}px`)};
  bottom: ${(props) => (props.top ? 'unset' : `${props.bottom}px`)};
  right: ${(props) => (props.left ? 'unset' : `${props.right}px`)};
  left: ${(props) => (props.right ? 'unset' : `${props.left}px`)};
  z-index: 2;
`

export default CodePreviewToggles
