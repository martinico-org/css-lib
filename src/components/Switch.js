import React from 'react'
import styled from '@emotion/styled'
import colors from '../utils/colors'

const Switch = ({ label, onClick, switchValue }) => (
  <WrapperSwitch onClick={onClick}>
    <SwitchContainer>
      <SwitchButton backgroundColor={switchValue ? colors.green : colors.red} />
      <SwitchLabel
        color={switchValue ? colors.classicBlack : colors.classicBlackLight}
      >
        {label}
      </SwitchLabel>
    </SwitchContainer>
  </WrapperSwitch>
)

const WrapperSwitch = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  user-select: none;
  &:hover {
    span {
      color: ${colors.classicBlack};
    }
  }
`

const SwitchContainer = styled.div`
  position: relative;
  height: 30px;
  background-color: ${colors.grey};
  border-radius: 25px;
  padding: 3px;
  display: flex;
`

const SwitchButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  transition: all 300ms ease-in-out;
`

const SwitchLabel = styled.span`
  font-size: 18px;
  color: ${(props) => props?.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 300ms ease-in-out;
`

export default Switch
