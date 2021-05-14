import React from 'react'
import styled from '@emotion/styled'

export const TagContainer = ({children}) => {

    return <WrapperTagContainer>
        {children}
    </WrapperTagContainer>
}

const WrapperTagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`
