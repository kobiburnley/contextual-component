import * as React from "react"
import {Provider} from "react"

export type Providers<T> = Provider<Partial<T>>[]

export interface CombineProvidersProps<T> {
  providers: Providers<T>
  value: T
  children: React.ReactNode
}

export class CombineProviders<T> extends React.Component<CombineProvidersProps<T>> {
  render() {
    const {providers, value, children} = this.props
    return providers.reduce(
      (children, Provider) => {
        return <Provider value={value}>
          {children}
        </Provider>
      },
      children
    )
  }
}
