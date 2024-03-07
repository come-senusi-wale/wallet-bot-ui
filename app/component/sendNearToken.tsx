"use client"
import Image from 'next/image';
import nearLogo from "@/public/image/near.jpeg";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/sendNearToken.css";


export const SendNearToken = () => {


    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">from</label>
                    <input type="text" placeholder='from'/>
                </div>
                <div id='to-input'>
                    <label htmlFor="">to</label>
                    <input type="text" placeholder='account ID'/>
                    <p>incorrect account</p>
                </div>
                <div id='amount-input'>
                    <label htmlFor="">amount</label>
                    <input type="number" placeholder='near token'/>
                    <p>incorrect amount</p>
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        <Image src={nearLogo} alt="" className='img'/>
                        </div>
                        <h2>Near</h2>
                    </div>
                    <p>30</p>
                </div>
                <div id='submit-btn'>
                    <button type='button'>send</button>
                </div>
            </div>
        </section>
    </>)
}