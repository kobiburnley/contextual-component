import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {contextualHook} from "../src/contextualHook"
import {Button, ButtonIO} from "./button"
import {createLinkComponent, LinkContext} from "./link"

const service = {
  navTo: (path: string) => {
    console.log("path changed to", path)
  },
  theme: {
    color: "#13fda3"
  }
}

describe("contextualHook.test", function () {
  it("should hook", () => {
    const WrappedLink = createLinkComponent()
    const Link = contextualHook<LinkContext>()(WrappedLink)

    const {Consumer, Provider} = React.createContext(service)
    Link.Consumer = Consumer
    Button.Consumer = Consumer

    class App extends React.PureComponent {
      render() {
        return <Provider value={service}>
          <Link path="/where-to">
            <Button>
              One
            </Button>
          </Link>
          <Button>
            Two
          </Button>
        </Provider>
      }
    }

    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof ButtonIO)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.props.context).to.eq(service)
    expect(buttonInstances.every(e => e.instance.props.context === service)).to.eq(true)
  })
})
