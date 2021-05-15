import React from 'react'
import styled from '@emotion/styled'
import { css as emotionCss, Global } from '@emotion/core'
import parse from 'html-react-parser'
import Toggle from '../components/Toggle'
import Switch from '../components/Switch'
import CodeRenderer from '../components/CodeRenderer'

const master = require('../cssfiles/master.json')

const RenderElement = ({ id }) => {
  const [toggle, setToggle] = React.useState(true)
  const [linesSwitch, setLinesSwitch] = React.useState(false)
  const { html, css } = master[id]
  const htmlParsed = parse(html)

  const handleToggle = () => {
    setToggle((e) => !e)
  }

  const handleSwitch = () => {
    setLinesSwitch((e) => !e)
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
          <WrapperToggle top={20} right={40}>
            <Toggle
              labels={['HTML', 'CSS']}
              onClick={handleToggle}
              toggleValue={toggle}
            />
          </WrapperToggle>
          <WrapperToggle top={70} right={40}>
            <Switch
              onClick={handleSwitch}
              switchValue={linesSwitch}
              label="Lines"
            />
          </WrapperToggle>
          <CodeRenderer
            html={html}
            css={css}
            toggle={toggle}
            linesSwitch={linesSwitch}
          />
        </WrapperSyntax>
      </WrapperElement>
    </WrapperPage>
  )
}

const WrapperToggle = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  right: ${(props) => `${props.right}px`};
`

const WrapperPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const WrapperElement = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const WrapperAnim = styled.div`
  margin: 10px 5px 10px 10px;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`

const WrapperSyntax = styled.div`
  margin: 10px 10px 10px 5px;
  height: 100%;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: #1e1e1e;
`

export default RenderElement
