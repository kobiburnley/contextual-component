import {expect} from "chai"
import * as propsTypes from "prop-types"
import * as React from "react"
import {create} from "react-test-renderer"
import {contextualLegacy} from "../src/contextualLegacy"
import {createLinkComponent} from "./link"

const WrappedLink = createLinkComponent()
export const Link = contextualLegacy("service")(WrappedLink)

const service = {
  navTo: (path: string) => {
    console.log("path changed to", path)
  }
}

class App extends React.PureComponent {
  static childContextTypes = {
    service: propsTypes.any
  }

  getChildContext() {
    return {service}
  }

  render() {
    return <Link path="/where-to">Link</Link>
  }
}

describe("contextualLegacy.test", function () {
  it("should pass context", () => {
    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink) as any
    expect(linkInstance.instance.context.service).to.eq(service)
  })
})
