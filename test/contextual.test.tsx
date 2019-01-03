import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {CombineProviders, Providers} from "../src/combineProviders"
import {contextual} from "../src/contextual"
import {createConsumer} from "../src/createConsumer"
import {ButtonContext, Button} from "./button"
import {createLinkComponent, LinkContext} from "./link"

export const MyButton = contextual(null! as ButtonContext, true)(Button)

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
    }, true)(WrappedLink)

    class App extends React.PureComponent {
      render() {
        return <CombineProviders providers={[Link.Provider, MyButton.Provider] as Providers<typeof service>}
                                 value={service}>
          <Link path="/where-to">
            <MyButton>
              One
            </MyButton>
          </Link>
          <MyButton>
            Two
          </MyButton>
        </CombineProviders>
      }
    }

    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof Button)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.ctx).to.eq(service)
    expect(buttonInstances.every(e => e.instance.ctx === service)).to.eq(true)
  })

  it("consumer set from outside", () => {
    const WrappedLink = createLinkComponent()
    const Link = contextual<LinkContext>({
      navTo: () => {
      }
    })(WrappedLink)

    const {Consumer, Provider} = React.createContext(service)
    Link.Consumer = Consumer
    MyButton.Consumer = Consumer

    class App extends React.PureComponent {
      render() {
        return <Provider value={service}>
          <Link path="/where-to">
            <MyButton>
              One
            </MyButton>
          </Link>
          <MyButton>
            Two
          </MyButton>
        </Provider>
      }
    }

    const renderer = create(<App/>)
    const linkInstance = renderer.root.findByType(WrappedLink)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof Button)
    expect(buttonInstances.length).to.eq(2)
    expect(linkInstance.instance.ctx).to.eq(service)
    expect(buttonInstances.every(e => e.instance.ctx === service)).to.eq(true)
  })

  it("should throw in render if consumer not set", () => {
    const WrappedLink = createLinkComponent()
    const Link = contextual<LinkContext>({
      navTo: () => {
      }
    }, false)(WrappedLink)

    const {Consumer, Provider} = React.createContext(service)

    class App extends React.PureComponent {
      render() {
        return <Provider value={service}>
          <Link path="/where-to">
            <MyButton>
              One
            </MyButton>
          </Link>
          <MyButton>
            Two
          </MyButton>
        </Provider>
      }
    }

    expect(() => create(<App/>)).to.throw("Consumer must be set from outside")
  })

  it("create consumer", () => {
    const {Consumer, Provider} = React.createContext(service)
    MyButton.Consumer = createConsumer(Consumer, value => ({theme: value.theme}))

    class App extends React.PureComponent {
      render() {
        return <Provider value={service}>
          <MyButton>
            Two
          </MyButton>
        </Provider>
      }
    }

    const renderer = create(<App/>)
    const buttonInstances = renderer.root.findAll(node => node.instance instanceof Button)
    expect(buttonInstances.every(e => e.instance.ctx.theme === service.theme)).to.eq(true)
  })
})
