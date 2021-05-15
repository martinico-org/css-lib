import React from 'react'
import styled from '@emotion/styled'
import colors from '../utils/colors'

const Tag = ({
  label,
  onClick,
  height,
  fontSize,
  customMargin,
  tag,
  active,
}) => (
  <WrapperTag onClick={onClick} customMargin={customMargin}>
    <TagContent height={height} active={active}>
      {tag ? (
        <TagLogo src="/assets/app/tag.svg" alt="Tag logo" />
      ) : (
        <TagLogo
          src={`/assets/app/${active ? 'minus' : 'category'}.svg`}
          alt="Tag logo"
        />
      )}
      <Label fontSize={fontSize}>{label}</Label>
    </TagContent>
  </WrapperTag>
)

const WrapperTag = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  transition: all 300ms ease-in-out;
  will-change: transform;
  margin: ${(props) =>
    props?.customMargin ? `${props?.customMargin}px` : '15px'};
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

const TagContent = styled.div`
  position: relative;
  padding: 5px 10px;
  transition: all 300ms ease-in-out;
  background-color: ${(props) =>
    props?.active ? colors.greenPalo : colors.grey};
  height: ${(props) => (props?.height ? `${props?.height}px` : '25px')};
  display: flex;
  flex-direction: row;
  border-radius: 18px;
  justify-content: space-around;
  align-items: center;
`

const Label = styled.span`
  color: ${colors.classicBlack};
  font-size: ${(props) => (props?.fontSize ? `${props?.fontSize}px` : '16px')};
`

const TagLogo = styled.img`
  height: 80%;
  object-fit: contain;
  margin-right: 5px;
`

export default Tag
