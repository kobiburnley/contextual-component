import {FunctionComponent} from "react"
import * as React from "react"

export interface ContextualProps<T> {
  context?: T
}

export type ContextualFunctionComponent<P, T> = React.FunctionComponent<P> & { Consumer?: React.Consumer<T> }

export function contextualHook<T>() {
  return function <P extends ContextualProps<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {
    const FunctionComponent: ContextualFunctionComponent<P, T> = function (props: P) {
      if (FunctionComponent.Consumer == null) {
        throw new TypeError("Consumer must be set from outside")
      }
      return <FunctionComponent.Consumer>
        {(context: T) => <WrappedComponent context={context} {...props}/>}
      </FunctionComponent.Consumer>
    }

    return FunctionComponent
  }
}
