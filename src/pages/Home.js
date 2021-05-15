import React from 'react'
import styled from '@emotion/styled'
import Tag from '../components/Tag'
import TagContainer from '../components/TagContainer'
import CssComponentContainer from '../components/CssComponentContainer'
import colors from '../utils/colors'

const cssComponents = require('../master.json')

export const Home = () => {
  const cssElements = Object.values(cssComponents || {})
  const [categories, setCategories] = React.useState([])
  const [selectedCategories, setSelectedCategories] = React.useState([])

  React.useEffect(() => {
    const flatCategories = cssElements.map((v) => v?.category)
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
      <WrapperLogo>
        <LogoApp src="/assets/app/logo.png" alt="logo app" />
      </WrapperLogo>
      <HomeContent>
        <TagContainer>
          {categories.map((category, index) => (
            <Tag
              key={`${index} category`}
              label={category}
              onClick={(event) => handleCategory(event, category)}
              active={selectedCategories.includes(category)}
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
