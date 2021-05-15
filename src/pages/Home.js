import React from 'react'
import styled from '@emotion/styled'
import Tag from '../components/Tag'
import TagContainer from '../components/TagContainer'
import CssComponentContainer from '../components/CssComponentContainer'
import colors from '../utils/colors'

export const Home = () => (
  <WrapperPage>
    <WrapperLogo>
      <LogoApp src="assets/app/logo.png" alt="logo app" />
    </WrapperLogo>
    <HomeContent>
      <TagContainer>
        <Tag label="Culture" />
        <Tag label="Culture" />
        <Tag label="Culture" />
        <Tag label="Culture" />
      </TagContainer>
      <CssComponentContainer />
    </HomeContent>
  </WrapperPage>
)

export const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.purpleBlue};
`

const WrapperLogo = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`

const HomeContent = styled.div`
  width: 100%;
  height: 85%;
  justify-content: center;
  align-items: center;
`

const LogoApp = styled.img`
  height: 90%;
  object-fit: contain;
`
