import * as React from "react"
import {ConsumerLike} from "./consumerLike"

export interface ContextualProps<T> {
  context?: T
}

export function contextual<T>(initialValue: T, localContext = false) {
  return function <P extends ContextualProps<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {

    const {Provider, Consumer} = localContext ? React.createContext(initialValue) : {
      Provider: undefined,
      Consumer: undefined
    }

    const ClassComponent = class extends React.PureComponent<P> {
      static Provider = Provider
      static Consumer: ConsumerLike<T> | undefined = Consumer

      render() {
        if (ClassComponent.Consumer == null) {
          throw new TypeError("Consumer must be set from outside")
        }
        return <ClassComponent.Consumer>
          {(context: T) => <WrappedComponent context={context} {...this.props}/>}
        </ClassComponent.Consumer>
      }
    }

    return ClassComponent
  }
}
