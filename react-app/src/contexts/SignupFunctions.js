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

  function login(email,password) {
    console.log(email,password)
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logout() {
    return signOut(auth)
  }

    // function checkUser(user){
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log('user',user.uid)
        setCurrentUser(user)
        // setLoading(false)
      })
      console.log('unsub',unsubscribe.uid)
      return unsubscribe
    },[])

  return {working:'working',test,setTest,currentUser, setCurrentUser,login,logout}
}