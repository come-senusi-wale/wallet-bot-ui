"use client"
import Image from 'next/image';
import nearLogo from "@/public/image/near.jpeg";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/importToken.css";



export const ImportToken = () => {

    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">contract address</label>
                    <input type="text" placeholder='token address'/>
                </div>
                <div id='to-input'>
                    <label htmlFor="">symbol</label>
                    <input className="" type="text" placeholder='token symbol' />
                </div>
                <div id='amount-input'>
                    <label htmlFor="">decimal</label>
                    <input type="number" placeholder='token decimal'/>
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        <Image src={nearLogo} alt="" className='img'/>
                        </div>
                        <h2>Near</h2>
                    </div>
                    <p>39.00</p>
                </div>
                <div id='submit-btn'>
                    <button type='button' >import</button>
                </div>
            </div>
        </section>
    </>)
}