import React from 'react'
import styled from '@emotion/styled'
import { Global, css as emotionCss } from '@emotion/core'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import beautify from 'js-beautify'
import parse from 'html-react-parser'
import Toggle from '../components/Toggle'

const master = require('../cssfiles/master.json')

const Project = ({ id }) => {
  const [toggle, setToggle] = React.useState(true)
  const [lines, setLines] = React.useState(false)
  const { html, css } = master[id]
  const htmlParsed = parse(html)

  const handleToggle = () => {
    setToggle((e) => !e)
  }

  return (
    <WrapperPage>
      <Global
        styles={emotionCss`
          ${css}
        `}
      />
      <WrapperElement>
        <WrapperAnim>{htmlParsed}</WrapperAnim>
      </WrapperElement>
      <WrapperElement>
        <WrapperSyntax>
          <WrapperToggle>
            <Toggle
              labels={['HTML', 'CSS']}
              onClick={handleToggle}
              toggleValue={toggle}
            />
          </WrapperToggle>

          <ButtonLines onClick={() => setLines((e) => !e)}>LINES</ButtonLines>
          {toggle ? (
            <SyntaxHighlighter
              language="html"
              wrapLines
              showLineNumbers={lines}
              style={vscDarkPlus}
              customStyle={{ margin: 0 }}
            >
              {beautify.html(html, {
                end_with_newline: true,
              })}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter
              language="css"
              wrapLines
              style={vscDarkPlus}
              showLineNumbers={lines}
              customStyle={{ margin: 0 }}
            >
              {beautify.css(css, {
                end_with_newline: true,
              })}
            </SyntaxHighlighter>
          )}
        </WrapperSyntax>
      </WrapperElement>
    </WrapperPage>
  )
}

const WrapperToggle = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`

export const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

export const WrapperElement = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const WrapperAnim = styled.div`
  margin: 10px 5px 10px 10px;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`

export const WrapperSyntax = styled.div`
  margin: 10px 10px 10px 5px;
  height: 100%;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: #1e1e1e;
`

export const ButtonToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const ButtonLines = styled.button`
  position: absolute;
  top: 50px;
  right: 20px;
`

export default Project
