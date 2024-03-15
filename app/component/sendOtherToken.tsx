"use client"
import Image from 'next/image';
import nearLogo from "@/public/image/near.jpeg";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/sendOtherToken.css";
import { checkValidAccount, getAccountNearBalance, sendNearToken } from "@/api/wallet";

export const SendOtherToken = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';
    const accountId = queryParams ? queryParams.get('account') : '';

    const [showToAccountErr, setShowToAccountErr] = useState(false)
    const [accountCurrect, setAccountCurrect] = useState(false)
    const [amoutError, setAmoutError] = useState(false)

    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [amount, setAmount] = useState('')
    const [tokenBalance, setTokenBalance] = useState(0)

    const toAccountInputHandler = async (e: any) => {
        if(!toAccount) {
            setAccountCurrect(false)
            return
        }

        const api = await checkValidAccount({
            accountId: toAccount,      
        })

        const response = await api.json()
        const responseStatus = response.status

        if (!responseStatus) {
            setAccountCurrect(true)
            setShowToAccountErr(true)
            return;
        }
        setAccountCurrect(true)
        setShowToAccountErr(false)
    }

    const amoutInputHandler = async (e: any) => {
        if(!amount) {
            setAmoutError(false)
            return;
        }

        if (parseFloat(amount) > tokenBalance) {
            setAmoutError(true)
            return;
        }

        setAmoutError(false)
    }

    useEffect( () =>{
        setFromAccount(accountId!)
    }, [])


    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">from</label>
                    <input type="text" value={fromAccount}  readOnly/>
                </div>
                <div id='to-input'>
                    <label htmlFor="">to</label>
                    <input className={`${accountCurrect? showToAccountErr? 'outline-none border-b-2 border-red-500 text-red-500' : 'outline-none border-b-2 border-blue-500 text-blue-500' : ''}`} type="text" placeholder='account ID' value={toAccount} onChange={(e) => setToAccount(e.target.value)} onKeyUp={toAccountInputHandler}/>
                    {accountCurrect? 
                        showToAccountErr? 
                            <p className='text-red-600'>invalid account</p> : 
                            ''
                        : 
                    ''}
                </div>
                <div id='amount-input'>
                    <label htmlFor="">amount</label>
                    <input type="number" placeholder='near token' value={amount} onChange={(e) => setAmount(e.target.value)} onKeyUp={amoutInputHandler}/>
                    {amoutError? <p className='text-red-600'>insufficient balance</p> : ''}
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        <Image src={nearLogo} alt="" className='img'/>
                        </div>
                        <h2>Near</h2>
                    </div>
                    <p>80</p>
                </div>
                <div id='submit-btn'>
                    <button type='button'>send</button>
                </div>
            </div>
        </section>
    </>)
}