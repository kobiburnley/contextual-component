import * as React from "react"
import {ConsumerLike} from "./consumerLike"

export interface ContextualProps<T> {
  context?: T
}

export function contextualLocal<T>(initialValue: T) {
  return function <P extends ContextualProps<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {

    const {Provider, Consumer} = React.createContext(initialValue)

    const ClassComponent = class extends React.PureComponent<P> {
      static Provider = Provider
      static Consumer: ConsumerLike<T> = Consumer

      render() {
        return <ClassComponent.Consumer>
          {(context: T) => <WrappedComponent context={context} {...this.props}/>}
        </ClassComponent.Consumer>
      }
    }

    return ClassComponent
  }
}
