import * as propTypes from "prop-types"
import * as React from "react"

export function contextualLegacy(...names: string[]) {
  return function <P, S>(WrappedComponent: React.ComponentClass<P, S>) {
    WrappedComponent.contextTypes = WrappedComponent.contextTypes || {}
    for (const name of names) {
      WrappedComponent.contextTypes[name] = propTypes.any
    }
    return WrappedComponent
  }
}
