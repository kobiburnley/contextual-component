import * as React from "react"
import {ConsumerLike, ConsumerLikeProps} from "./consumerLike"

export function createConsumer<T, E>(Consumer: ConsumerLike<E>, fn: (value: E) => T): ConsumerLike<T> {
  return (props: ConsumerLikeProps<T>) => <Consumer>
    {(value: E) => props.children(fn(value))}
  </Consumer>
}
