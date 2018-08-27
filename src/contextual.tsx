import * as React from "react"

export interface ContextualProps<T> {
  context?: T
}

export function contextual<T>(initialValue: T) {
  return function <P extends ContextualProps<T>, S>(
    WrappedComponent: React.ComponentClass<P>
  ) {
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
