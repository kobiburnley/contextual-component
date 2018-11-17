import * as React from "react"

export interface ContextualProps<T> {
  context?: T
}

export type ContextualFunctionComponent<P, T> = React.FunctionComponent<P> & { Context?: React.Context<T> }

export function contextualHook<T>() {
  return function <P extends ContextualProps<T>>(
    WrappedComponent: React.ComponentType<P>
  ) {
    const FunctionComponent: ContextualFunctionComponent<P, T> = function (props: P) {
      if (FunctionComponent.Context == null) {
        throw new TypeError("Context must be set from outside")
      }
      const context = React.useContext(FunctionComponent.Context)
      return <WrappedComponent context={context} {...props}/>
    }

    return FunctionComponent
  }
}
