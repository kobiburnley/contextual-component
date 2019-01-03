import {ComponentType, ReactNode} from "react"

export interface ConsumerLikeProps<T> {
  children: (value: T) => ReactNode
}

export type ConsumerLike<T> = ComponentType<ConsumerLikeProps<T>>
