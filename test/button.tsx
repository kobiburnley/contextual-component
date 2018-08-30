import * as React from "react"
import {ButtonHTMLAttributes} from "react"
import {contextual} from "../src/contextual"

export interface ButtonContext {
  theme: {
    color: string
  }
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  context?: ButtonContext
}

export class ButtonIO extends React.PureComponent<ButtonProps> {
  ctx!: ButtonContext

  render() {
    const {context, ...props} = this.props
    return <button style={{backgroundColor: this.ctx.theme.color}} {...props} />
  }
}

export const Button = contextual(null! as ButtonContext)(ButtonIO)
