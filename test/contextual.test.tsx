import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {combineProviders, CombineProviders, Providers} from "../src/combineProviders"
import {contextual} from "../src/contextual"
import {Button, ButtonIO} from "./button"
import {createLinkComponent, LinkContext} from "./link"
import {renderToStaticMarkup} from "react-dom/server"

const WrappedLink = createLinkComponent()

export const Link = contextual<LinkContext>({
  navTo: () => {
  }
})(WrappedLink)

const service = {
  navTo: (path: string) => {
    console.log("path changed to", path)
  },
  theme: {
    color: "#13fda3"
  }
}

class App extends React.PureComponent {
  render() {
    return <CombineProviders providers={[Link.Provider, Button.Provider] as Providers<typeof service>} value={service}>
      <Link path="/where-to">
        <Button>
          One
        </Button>
      </Link>
      <Button>
        Two
      </Button>
    </CombineProviders>
  }
}

describe("contextual.test", function () {
  it("should pass context", () => {
    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof ButtonIO)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.ctx).to.eq(service)
    expect(buttonInstances.every(e => e.instance.ctx === service)).to.eq(true)
  })
})
