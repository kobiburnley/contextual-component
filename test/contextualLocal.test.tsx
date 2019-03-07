import {expect} from "chai"
import * as React from "react"
import {create} from "react-test-renderer"
import {CombineProviders, Providers} from "../src/combineProviders"
import {contextualLocal} from "../src/contextualLocal"
import {Button, ButtonContext} from "./button"
import {createLinkComponent, LinkContext} from "./link"

export const MyButton = contextualLocal(null! as ButtonContext)(Button)

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
    const Link = contextualLocal<LinkContext>({
      navTo: () => {
      }
    })(WrappedLink)

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
})
