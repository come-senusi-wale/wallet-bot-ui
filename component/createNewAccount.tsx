"use client"
import React, { useState } from 'react'
import logo from "./../public/image/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from 'next/image';
import  "../style/createNewAccount.css";
import { createNewWallet } from "@/api/wallet";
import { toast } from 'react-toastify'
import { Console } from 'console';

export const CreateNewAccountId = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';

    const [accountId, setAccountId] = useState('')

    const handleCreateAccount = async() => {
        if(!accountId) {
            alert('empty')
            toast.error("provide account ID", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        const api = await createNewWallet({
            accountId: accountId, 
            token: token
        })

        console.log('ap1', api)

        const response = await api.json()

        const responseStatus = response.status

        if (!responseStatus) {
            alert(response.error[0].message)
            toast.error(response.error[0].message, {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        alert("account created successfully")
        toast.success('account created successfully', {
            position: toast.POSITION.TOP_RIGHT
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
                    <input type="text" placeholder='yourname.testnet' value={accountId} onChange={(e) => setAccountId(e.target.value)} />
                    <p>Congrats! wale.testnet is available.</p>
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
                        <li>Characters "@" or "."</li>
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