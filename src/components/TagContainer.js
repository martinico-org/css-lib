import React from 'react'
import styled from '@emotion/styled'

const TagContainer = ({ children }) => (
  <WrapperTagContainer>{children}</WrapperTagContainer>
)

const WrapperTagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export default TagContainer
