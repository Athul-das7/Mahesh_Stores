import React from 'react'
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import {auth} from '../fireconfig'
// import {useAuth} from './AuthContext'
// const auth = getAuth()

// function Test() {
//   const testval = useAuth()
//   return (
//     <div>{testval.working}</div>
//   )
// }


// export default Test

export function Authvalue(){
  const [currentUser, setCurrentUser] = useState()
  const [test,setTest] = useState('hello test')
  const [status,setStatus] = useState(-1)

  function login(email,password) {
    console.log(email,password)
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logout() {
    return signOut(auth)
  }

    // function checkUser(user){
    function changeuser(){
      auth.onAuthStateChanged(user=> {
        setCurrentUser(user);
      })
    }
    useEffect(() => {
      auth.onAuthStateChanged(user=> {
        setCurrentUser(user);
      })
    },[currentUser])

  return {working:'working',status,setStatus,currentUser, setCurrentUser,login,logout,changeuser}
}