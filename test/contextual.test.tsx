import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {CombineProviders, Providers} from "../src/combineProviders"
import {contextual} from "../src/contextual"
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

describe("contextual", function () {
  it("should pass context", () => {

    const WrappedLink = createLinkComponent()
    const Link = contextual<LinkContext>({
      navTo: () => {
      }
    })(WrappedLink)

    class App extends React.PureComponent {
      render() {
        return <CombineProviders providers={[Link.Provider, Button.Provider] as Providers<typeof service>}
                                 value={service}>
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

    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof ButtonIO)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.ctx).to.eq(service)
    expect(buttonInstances.every(e => e.instance.ctx === service)).to.eq(true)
  })

  it("consumer set from outside", () => {
    const WrappedLink = createLinkComponent()
    const Link = contextual<LinkContext>({
      navTo: () => {
      }
    }, false)(WrappedLink)

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
    expect(linkInstance.instance.ctx).to.eq(service)
    expect(buttonInstances.every(e => e.instance.ctx === service)).to.eq(true)
  })
})
