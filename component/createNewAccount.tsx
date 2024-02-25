import React from 'react'
import logo from "./../public/image/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from 'next/image';
import  "../style/createNewAccount.css";

export const CreateNewAccountId = () => {

    return(<>
        <section>
            <div id='newAccount'>
                <h1>Reserve Account ID</h1>
                <p id='warning'>Enter an Account ID to use with your NEAR account. Your Account ID will be used for all NEAR operations, including sending and receiving assets.</p>
                <div id='accout-input'>
                    <label htmlFor="">Account ID</label>
                    <input type="text" placeholder='yourname.testnet' />
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
                    <button type='button'>Reserve My Account ID</button>
                </div>
            </div>
        </section>
    </>)
}