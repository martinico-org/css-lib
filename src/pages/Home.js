import React from 'react'
import styled from '@emotion/styled'
import Tag from '../components/Tag'
import TagContainer from '../components/TagContainer'
import CssComponentContainer from '../components/CssComponentContainer'
import colors from '../utils/colors'
import useScreenDimensions from '../hooks/useScreenDimensions'
import toSentenceCase from '../utils/functions'

const cssComponents = require('../master.json')

export const Home = () => {
  const cssElements = Object.values(cssComponents || {})
  const { mobile } = useScreenDimensions()
  const [categories, setCategories] = React.useState([])
  const [selectedCategories, setSelectedCategories] = React.useState([])

  React.useEffect(() => {
    const flatCategories = cssElements
      .map((v) => toSentenceCase(v?.category))
      .reduce((acc, v) => {
        if (acc.includes(v)) return acc
        acc.push(v)
        return acc
      }, [])
    setCategories(flatCategories)
  }, [])

  const handleCategory = (event, category) => {
    event.preventDefault()
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((e) => [...e, category])
    } else {
      const categoriesSelectedCopy = [...selectedCategories].filter(
        (v) => v !== category
      )
      setSelectedCategories(categoriesSelectedCopy)
    }
  }

  return (
    <WrapperPage>
      <Header>
        <PalmTree src="/assets/app/palmtree.svg" alt="404 palmtree" />
        <Title mobile={mobile}>CSS Lib</Title>
      </Header>
      <HomeContent>
        <TagContainer>
          {categories.map((category, index) => (
            <Tag
              key={`${index} category`}
              label={category}
              onClick={(event) => handleCategory(event, category)}
              active={selectedCategories.includes(category)}
              customMargin={mobile ? '5px 15px' : '10px 15px'}
            />
          ))}
        </TagContainer>
        <CssComponentContainer
          selectedCategories={selectedCategories}
          comps={cssElements}
        />
      </HomeContent>
    </WrapperPage>
  )
}

export const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.greySuperLight};
`

const HomeContent = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  color: ${colors.classicBlack};
  font-size: ${(props) => (props?.mobile ? '2.5em' : '5em')};
  text-align: center;
`

const PalmTree = styled.img`
  height: 80%;
  object-fit: contain;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  padding: 20px 10px 10px 10px;
  height: 10%;
`
