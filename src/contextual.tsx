import * as React from "react"
import {Provider} from "react"
import {ConsumerLike} from "./consumerLike"

export interface ContextualProps<T> {
  context?: T
}

export function contextual<T>() {
  return function <P extends ContextualProps<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {

    const ClassComponent = class extends React.PureComponent<P> {
      static Provider: Provider<T>
      static Consumer: ConsumerLike<T> | undefined

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
