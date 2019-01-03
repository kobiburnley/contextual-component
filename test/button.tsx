import * as React from "react"
import {ButtonHTMLAttributes} from "react"
import * as assert from "assert"
export interface ButtonContext {
  theme: {
    color: string
  }
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  context?: ButtonContext
}

export class Button extends React.PureComponent<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props)
    assert(props.context != null)
  }

  get ctx() {
    return this.props.context!
  }

  render() {
    const {context, ...props} = this.props
    return <button style={{backgroundColor: this.ctx.theme.color}} {...props} />
  }
}
