import {
    createContext
} from 'react'

const appContext = createContext('context')
export const ContextProvider = appContext.Provider
export const ContextConsumer = appContext.Consumer

export default appContext
