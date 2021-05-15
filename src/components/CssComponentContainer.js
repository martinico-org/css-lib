import React from 'react'
import styled from '@emotion/styled'

// const master = require('../cssfiles/master.json')

const CssComponentContainer = () => {
  console.log('css')
  return <WrapperCssComponentContainer />
}

const WrapperCssComponentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default CssComponentContainer
