import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import beautify from 'js-beautify'

const CodeRenderer = ({ toggle, linesSwitch, html, css }) => (
  <>
    {toggle ? (
      <SyntaxHighlighter
        language="html"
        wrapLines
        showLineNumbers={linesSwitch}
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
        showLineNumbers={linesSwitch}
        customStyle={{ margin: 0 }}
      >
        {beautify.css(css, {
          end_with_newline: true,
        })}
      </SyntaxHighlighter>
    )}
  </>
)

export default CodeRenderer
