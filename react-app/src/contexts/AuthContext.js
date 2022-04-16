import React,{createContext, useContext} from 'react'
import {Authvalue} from './SignupFunctions'
const AuthContext = createContext(null);

// const value = Authvalue()
// console.log(value.working)

export function useAuth(){
    return useContext(AuthContext) 
}

export function AuthProvider({children}) {
    const value = Authvalue()
  return (
    <AuthContext.Provider value={value}>
      {/* {value.working} */}
        {children}
    </AuthContext.Provider> 
  )
}

// export AuthContext