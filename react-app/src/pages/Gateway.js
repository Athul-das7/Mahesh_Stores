import React from 'react'
import '../stylesheets/gateway.css'
import { Navigate, useNavigate } from 'react-router-dom';
import db from '../fireconfig';
import {setDoc,addDoc,updateDoc,deleteDoc } from "firebase/firestore";
import  { useEffect, useState } from 'react'
import {getDoc,doc } from "firebase/firestore";  

function Gateway() {
    const [rollNo,setRollNo]=useState("");
    const handleChange = (e) => {
        setRollNo(e.target.value)
      };

    const navigate  = useNavigate();
    const paymentSubmit = async (v) => {
       
       deleteDoc(doc(db, "fines",rollNo)).then(
        alert('Payment successful'),
        navigate('/')
       )
      

        }

  return (
    <div>
        <div class="container1">
        <form action="">

            <div class="row1">

                <div class="col1">

                    <h3 class="title1">billing address</h3>

                    <div class="inputBox1">
                        <span>full name :</span>
                        <input type="text" placeholder="john deo"/>
                    </div>
                    <div class="inputBox1">
                        <span>Roll No :</span>
                        <input type="text" placeholder="1602-xx-xx-xxx"
                        value={rollNo}
                        onChange={handleChange}
                        id="rollNo"
                        name="rollNo"/>
                    </div>
                    <div class="inputBox1">
                        <span>email :</span>
                        <input type="email" placeholder="example@example.com"/>
                    </div>
                    <div class="inputBox1">
                        <span>address :</span>
                        <input type="text" placeholder="room - street - locality"/>
                    </div>
                    <div class="inputBox1">
                        <span>city :</span>
                        <input type="text" placeholder="mumbai"/>
                    </div>

                    <div class="flex1">
                        <div class="inputBox1">
                            <span>state :</span>
                            <input type="text" placeholder="india"/>
                        </div>
                        <div class="inputBox1">
                            <span>zip code :</span>
                            <input type="text" placeholder="123 456"/>
                        </div>
                    </div>

                </div>

                <div class="col1">

                    <h3 class="title1">payment</h3>

                    
                    <div class="inputBox1">
                        <span>name on card :</span>
                        <input type="text" placeholder="mr. john deo"/>
                    </div>
                    <div class="inputBox1">
                        <span>credit card number :</span>
                        <input type="text" placeholder="1111-2222-3333-4444"/>
                    </div>
                    <div class="inputBox1">
                        <span>exp month :</span>
                        <input type="text" placeholder="january"/>
                    </div>

                    <div class="flex1">
                        <div class="inputBox1">
                            <span>exp year :</span>
                            <input type="test" placeholder="2022"/>
                        </div>
                        <div class="inputBox1">
                            <span>CVV :</span>
                            <input type="text" placeholder="1234"/>
                        </div>
                    </div>

                </div>

            </div>
            <button onClick={paymentSubmit}>SUBMIT</button>
        </form>

</div>    
    </div>
    
  )
}

export default Gateway