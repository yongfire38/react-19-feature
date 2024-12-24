'use client'

import { createContext } from 'react'

export type Color = 'blue' | 'red' | 'green' | 'purple'

// React 19에서도 현재는 createContext를 사용
export const ColorContext = createContext<Color>('blue')
