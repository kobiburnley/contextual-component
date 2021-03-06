import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {contextual} from "../src/contextual"
import {contextualHook} from "../src/contextualHook"
import {Button} from "./button"
import {createLinkComponent, LinkContext} from "./link"

export const MyButton = contextual()(Button)

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

    const Context = React.createContext(service)
    Link.Context = Context as any
    MyButton.Consumer = Context.Consumer

    class App extends React.PureComponent {
      render() {
        return <Context.Provider value={service}>
          <Link path="/where-to">
            <MyButton>
              One
            </MyButton>
          </Link>
          <MyButton>
            Two
          </MyButton>
        </Context.Provider>
      }
    }

    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof Button)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.props.context).to.eq(service)
    expect(buttonInstances.every(e => e.instance.props.context === service)).to.eq(true)
  })

  it("should throw in render if context not set", () => {
    const WrappedLink = createLinkComponent()
    const Link = contextualHook<LinkContext>()(WrappedLink)

    const Context = React.createContext(service)
    MyButton.Consumer = Context.Consumer

    class App extends React.PureComponent {
      render() {
        return <Context.Provider value={service}>
          <Link path="/where-to">
            <MyButton>
              One
            </MyButton>
          </Link>
          <Button>
            Two
          </Button>
        </Context.Provider>
      }
    }

    expect(() => create(<App/>)).to.throw("Context must be set from outside")
  })
})
