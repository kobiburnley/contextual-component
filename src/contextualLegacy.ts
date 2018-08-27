import * as propTypes from "prop-types"
import * as React from "react"

export function contextualLegacy(name: string) {
  return function <P>(WrappedComponent: React.ComponentClass<P>) {
    WrappedComponent.contextTypes = WrappedComponent.contextTypes || {}
    WrappedComponent.contextTypes[name] = propTypes.any
    Object.defineProperty(WrappedComponent.prototype, "ctx", {
      get() {
        return this.context[name]
      }
    })
    return WrappedComponent
  }
}
