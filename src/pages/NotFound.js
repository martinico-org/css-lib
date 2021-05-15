import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import colors from '../utils/colors'

export const NotFound = () => (
  <WrapperPage>
    <HomeContent>
      <Container left>
        <PalmTree src="/assets/app/palmtree.svg" alt="404 palmtree" />
      </Container>
      <Container>
        <Text alt="404 palmtree">404 Not Found</Text>
        <TextLink alt="404" palmtree onClick={() => navigate('/')}>
          Back to homepage
        </TextLink>
      </Container>
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
  background-color: white;
`

const HomeContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.left ? `flex-end` : 'flex-start')};
  padding: ${(props) => (props.left ? `0 20px 0 0` : '0 0 0 20px')};
  flex-direction: column;
`

const Text = styled.div`
  color: ${colors.classicBlack};
  font-size: 50px;
  text-align: center;
  width: 100%;
`

const TextLink = styled(Text)`
  &:hover {
    cursor: pointer;
    color: ${colors.classicBlackLight};
  }
`

const PalmTree = styled.img`
  height: 200px;
`
