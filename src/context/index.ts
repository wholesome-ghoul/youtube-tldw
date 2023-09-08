import {createContext} from 'react'

import {$CustomerInfoContext, $ThemeContext, $VideoInfoContext} from '../types'

const CustomerContext = createContext<$CustomerInfoContext>({
  customerInfo: null,
  setCustomerInfo: () => {}
})

const VideoContext = createContext<$VideoInfoContext>({
  videoInfo: null,
  setVideoInfo: () => {}
})

const ThemeContext = createContext<$ThemeContext>({
  theme: "dark",
  setTheme: () => {}
})

const Context = {
  CustomerContext, VideoContext, ThemeContext
}

export default Context
