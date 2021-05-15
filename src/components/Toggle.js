import React from 'react'
import styled from '@emotion/styled'
import colors from '../utils/colors'

const Toggle = ({ labels, onClick, toggleValue }) => {
  const [maxItemWidth, setMaxItemWidth] = React.useState(null)
  const refs = {
    0: React.useRef(null),
    1: React.useRef(null),
  }

  React.useEffect(() => {
    if (!refs[0].current || !refs[1].current) return
    const firstItem = refs?.[0].current?.getBoundingClientRect()?.width
    const secondItem = refs?.[1].current?.getBoundingClientRect()?.width
    setMaxItemWidth(Math.max(firstItem, secondItem))
  }, [refs[0].current, refs[1].current])

  return (
    <WrapperToggle displayed={maxItemWidth}>
      <ContainerToggle onClick={onClick}>
        {!!maxItemWidth && <LabelActive translate={toggleValue} />}
        {labels.map((label, index) => (
          <LabelContainer
            width={maxItemWidth}
            ref={refs?.[index]}
            active={(toggleValue && !index) || (index && !toggleValue)}
            key={`${index}-toggle item`}
          >
            {label}
          </LabelContainer>
        ))}
      </ContainerToggle>
    </WrapperToggle>
  )
}

const WrapperToggle = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  transition: all 300ms ease-in-out;
  opacity: ${(props) => (props?.displayed ? 1 : 0)};
  cursor: pointer;
  user-select: none;
`

const ContainerToggle = styled.div`
  position: relative;
  height: 30px;
  background-color: ${colors.grey};
  border-radius: 25px;
  padding: 3px;
  display: flex;
`
const LabelContainer = styled.span`
  width: ${(props) => (props?.width ? `${props.width}px` : 'unset')};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) =>
    props?.active ? colors.classicBlack : colors.classicBlackLight};
  font-size: 18px;
  justify-content: center;
  margin: 0 15px;
  z-index: 1;
  transition: all 300ms ease-in-out;

  &:hover {
    color: ${colors.classicBlack};
  }
`

const LabelActive = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 30px;
  width: 48%;
  background-color: ${colors.white};
  border-radius: 25px;
  transition: all 300ms ease-in-out;
  will-change: transform;
  transform: translateY(-50%)
    translateX(${(props) => (props.translate ? '3px' : '104%')});
`

export default Toggle
