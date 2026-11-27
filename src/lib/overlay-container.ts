import { createContext, useContext } from 'react'

export const OverlayContainerContext = createContext<HTMLElement | null>(null)

export const useOverlayContainer = () => {
  return useContext(OverlayContainerContext)
};
