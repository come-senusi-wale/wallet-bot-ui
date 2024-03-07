"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/getPrivateKey.css";
import { FaRegCopy } from "react-icons/fa6";
import { exportAccount } from "@/api/wallet";

export const GetPrivateKey = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';
    const accountId = queryParams ? queryParams.get('account') : '';

    const [showPrivateKey, setShowPrivateKey] = useState(false)
    const [copied, setCopied] = useState(false);
    const [password, setPassword] = useState('')
    const [privateKey, setPrivateKey] = useState('')

    const handleCopy = () => {
        const textElement = document.getElementById('copyText');
        if (textElement) {
          const text = textElement.innerText;
          
          const tempInput = document.createElement('input');
          tempInput.value = text;
          document.body.appendChild(tempInput);
    
          tempInput.select();
          tempInput.setSelectionRange(0, 99999);
    
          document.execCommand('copy');
    
          document.body.removeChild(tempInput);
    
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }
    };

    const handleSubmit = async () => {
        if(!password) {
            toast.error("provide password", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const api = await exportAccount({
            accountId,
            token,
            password
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
        console.log('pe', response.data.data.privateKey)

        setPrivateKey(response.data.data.privateKey)
        setShowPrivateKey(true)
    }

    return(<>
        <section>
            <div id='importAccount' className={`${showPrivateKey ? 'hidden' : ''}`}>
                <div id='password-input'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={handleSubmit}>submit</button>
                </div>
            </div>
            <div id='secret-key' className={`${!showPrivateKey ? 'hidden' : ''}`}>
                <button onClick={handleCopy}><FaRegCopy /></button>
                <p id='copyText'>{privateKey}</p>
                {copied && <span>Private Key copied!</span>}
            </div>
        </section>
    </>)
}
