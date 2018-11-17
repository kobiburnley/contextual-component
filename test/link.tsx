import * as React from "react"
import {contextual} from "../src/contextual"
import {contextualLegacy} from "../src/contextualLegacy"

export interface LinkContext {
  navTo: (path: string) => any
}

export interface LinkProps {
  path: string,
  context?: LinkContext
}

export function createLinkComponent() {
  return class Link extends React.PureComponent<LinkProps> {
    get ctx() {
      return this.props.context!
    }

    handleClick = () => {
    }

    render() {
      const {path, context, ...props} = this.props
      return <a href={path} onClick={this.handleClick} {...props}/>
    }
  }
}
