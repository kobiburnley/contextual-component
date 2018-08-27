import * as React from "react"

export function contextual<T>(initialValue: T) {
  return function <P extends { context?: T }, S>(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P, S> {
    const {Provider, Consumer} = React.createContext(initialValue)

    Object.defineProperty(WrappedComponent.prototype, "ctx", {
      get() {
        return this.props.context
      }
    })

    return class extends React.PureComponent<P, S> {
      static Provider = Provider
      static Consumer = Consumer

      render() {
        return <Consumer>
          {(context: T) => <WrappedComponent context={context} {...this.props}/>}
        </Consumer>
      }
    }
  }
}
