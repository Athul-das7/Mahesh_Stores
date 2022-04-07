import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { FaBorderNone } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import HomeLayout from '../components/HomeLayout'
// import HModal from '../components/HModal'
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';
import dayjs from 'dayjs';
import { modal } from '@mantine/core';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';

function MaheshStoreHome() {
const initialDate = dayjs(new Date()).toDate();
const [value1, setValue1] = useState(initialDate);
const navigate = useNavigate()
const [value2, setValue2] = useState();
const [openmodal, setOpenModal] = useState(false);
const handleopen = () => setOpenModal(true);
const handleclose= () => {
  setOpenModal(false);
}
const [category, setCategory] = useState('');
const inputRef = useRef()
function getCategory(e) {
  // console.log(e.target.innerText)
  setCategory(e.target.innerText)
  handleclose()
  // console.log(category)
}
function sendValue() {
  navigate('/',{state:{start:value1,end:value2,category:category}})
  setCategory('')
}
  return (
    <HomeLayout>
        <header class="page-header big-banner">
          <div class="container pt-5">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-6">
                  <h1 >Check Abailability</h1>
                </div>
                <div class="col-md-6">
                  <form onSubmit={sendValue}>
                    <div class="container availbox contactform">
                        <div className="area1 arrow">
                          <label for="catname"><span type='button' onClick={handleopen} >Category of Components</span></label>
                          <Modal show={openmodal} onHide={handleclose} class="modalContainer">
                            <Modal.Header closeButton className='modalHeader'>
                              <Modal.Title>Select Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="catselect">
                              <div class="box btn categoryBox" role="button" onClick={getCategory} aria-pressed="false" tabindex="1" id="Embeded">
                                <h2>category</h2>
                              </div>

                            </Modal.Body>
                          </Modal>
                          <input value={category} onChange={setCategory} type='text' autoComplete='off' id='catname' name='catname'  maxLength={15}></input>
                        </div>

                        <div class="area2">
                            <form class="align-items-center" onSubmit={sendValue} >
                              <div class='parent'>
                                <div class='child'>
                                  <DatePicker id='startdate' clearable={false} placeholder="Start Date" 
                                  inputFormat="DD/MM/YYYY" 
                                  label="" required icon={<Calendar size={16} />}
                                  // value={value}
                                  onChange={setValue1}
                                  minDate={dayjs(new Date()).toDate()}
                                  // maxDate={dayjs(new Date()).add(30,'days').toDate()}

                                  ></DatePicker>
                                </div>

                                <div class='child linelft'>
                                  <DatePicker  id='enddate' clearable={false} placeholder="End Date"
                                  inputFormat='DD/MM/YYYY'
                                  label="" required icon={<Calendar size={16} />}
                                  minDate={dayjs(new Date()).toDate(value2)}
                                  onChange={setValue2}
                                  >

                                  </DatePicker>
                                </div>
                              </div> 
                            </form>
                          {/* <div class='parent'>
                                    <div class='child'>
                                      child 1
                                    </div>

                                    <div class='child linelft'>
                                      child 2
                                    </div>
                          </div> */}
                        </div>

                        <div class="area3">
                            <div class="col-md-12 col-12 col-sm-12" style={{margin: 0, border: 0,  textAlign: 'center', padding: 0}}>                                        
                            <button  type="submit" class="btn btn-success btn-block pad" id="submitbtn">
                                Submit</button>
                            </div>
                        </div>

                              
                          
                        
                    </div>
                  </form>
                </div>
            </div>
          </div>
        
        </header>
        
                                        
                     
    </HomeLayout>
       
  )
}

export default MaheshStoreHome
