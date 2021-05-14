import React from 'react'
import styled from '@emotion/styled'

export const TagContainer = ({children}) => {

    return <WrapperTagContainer>
        {children}
    </WrapperTagContainer>
}

const WrapperTagContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
`
