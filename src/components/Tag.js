import React from 'react'
import styled from '@emotion/styled'
import colors from '../utils/colors'

const Tag = ({ label, onClick }) => (
  <WrapperTag onClick={onClick}>
    <TagContent>
      <TagLogo src="assets/app/tag.svg" alt="Tag logo" />
      <Label>{label}</Label>
    </TagContent>
  </WrapperTag>
)

const WrapperTag = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  transition: all 300ms ease-in-out;
  will-change: transform;
  margin: 15px;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

const TagContent = styled.div`
  position: relative;
  padding: 5px 10px;
  background-color: ${colors.grey};
  height: 25px;
  display: flex;
  flex-direction: row;
  border-radius: 18px;
  justify-content: space-around;
  align-items: center;
`

const Label = styled.span`
  color: ${colors.classicBlack};
  font-size: 16px;
`

const TagLogo = styled.img`
  height: 80%;
  object-fit: contain;
  margin-right: 5px;
`

export default Tag
