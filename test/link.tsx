import * as React from "react"
import {contextual} from "../src/contextual"
import {contextualLegacy} from "../src/contextualLegacy"

export interface LinkContext {
  navTo: (path: string) => any
}

export interface LinkProps {
  path: string,
  context?: any
}

export function createLinkComponent() {
  return class Link extends React.PureComponent<LinkProps> {
    ctx!: LinkContext

    handleClick = () => {
    }

    render() {
      const {path, ...props} = this.props
      return <a href={path} onClick={this.handleClick} {...props}/>
    }
  }
}
