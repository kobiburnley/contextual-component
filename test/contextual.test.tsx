import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {contextual} from "../src/contextual"
import {createLinkComponent, LinkContext} from "./link"

const WrappedLink = createLinkComponent()

export const Link = contextual<LinkContext>({
  navTo: () => {
  }
})<{ path: string, context?: any }>(WrappedLink)

const service = {
  navTo: (path: string) => {
    console.log("path changed to", path)
  }
}

class App extends React.PureComponent {
  render() {
    return <Link.Provider value={service}>
      <Link path="/where-to">Link</Link>
    </Link.Provider>
  }
}

describe("contextual.test", function () {
  it("should pass context", () => {
    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink) as any
    expect(linkInstance.instance.ctx).to.eq(service)
  })
})
