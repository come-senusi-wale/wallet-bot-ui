"use client"
import React, { useState, useEffect } from 'react'
import  "../style/createNewAccount.css";
import  "../style/tailwind.css";
import { createNewWallet, checkAccount, network } from "@/api/wallet";
import { toast } from 'react-toastify'

export const CreateNewAccountId = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';

    const [accountId, setAccountId] = useState('')
    const [accountIdText, setAccountIdText] = useState('')
    const [accountstatus, setAccountStatus] = useState(false)
    const [openaAccountStatus, setOpenAccountStatus] = useState(false)

    const accountInputHandler = (e: any) => {
        if(!accountId || accountId == '') {
            setOpenAccountStatus(false)
        }

        const account = e.target.value
        let accountIdText = account

        const indexOfFullStop = account.indexOf('.');

        if (indexOfFullStop < 1) {
            accountIdText = `${account}.${network}`
        }else{
            // Get the first part of the word before the full stop
            const firstPart = account.substring(0, indexOfFullStop);
            accountIdText = `${firstPart}.${network}`
        }
        setAccountIdText(accountIdText)
        setAccountId(account)
    }

    const checkAccountExist = async () => {
        if(!accountId) {
            return;
        }

        setOpenAccountStatus(true)

        const api = await checkAccount({
            accountId: accountIdText
        })

        const response = await api.json()

        const responseStatus = response.status

        if (!responseStatus) {
            // toast.error(response.error[0].message, {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 8000
            // });
            setAccountStatus(false)
            return;
        }

        setAccountStatus(true)
        return;
    }

    const handleCreateAccount = async() => {
        if(!accountId) {
            toast.error("provide account ID", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const api = await createNewWallet({
            accountId: accountIdText, 
            token: token
        })

        const response = await api.json()

        const responseStatus = response.status

        if (!responseStatus) {
            toast.error(response.error[0].message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            });
            return;
        }

        toast.success('account created successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000
        });
        return;
    }

    return(<>
        <section>
            <div id='newAccount'>
                <h1>Reserve Account ID</h1>
                <p id='warning'>Enter an Account ID to use with your NEAR account. Your Account ID will be used for all NEAR operations, including sending and receiving assets.</p>
                <div id='accout-input'>
                    <label htmlFor="">Account ID</label>
                    <input type="text" placeholder='yourname.testnet' value={accountId} onChange={(e) => accountInputHandler(e)} onKeyUp={checkAccountExist}/>
                    {
                        openaAccountStatus? 
                        accountstatus? 
                        <p style={{ color: 'blue' }}>Congrats! {accountIdText} is available.</p>
                        :<p style={{ color: 'red' }}>{accountIdText} is taken. Try something else</p>
                        : ''
                    }
                    {/* <p>Congrats! wale.testnet is available.</p> */}
                </div>
                <div id='account-warning'>
                    <ul>
                        <p>Your account ID can contain any of the following:</p>
                        <li>Lowercase characters (a-z)</li>
                        <li>Digits (0-9)</li>
                        <li>Characters (_-) can be used as separators</li>
                    </ul>
                    <ul>
                        <p>Your account ID CANNOT contain::</p>
                        <li>Characters &quot;@&quot; or &quot;.&quot;</li>
                        <li>Fewer than 2 characters</li>
                        <li>More than 64 characters (including .testnet)</li>
                    </ul>
                </div>
                <div id='accout-btn'>
                    <button type='button' onClick={handleCreateAccount}>Reserve My Account ID</button>
                </div>
            </div>
        </section>
    </>)
}