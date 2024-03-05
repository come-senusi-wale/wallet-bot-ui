"use client"
import React, { useState, useEffect } from 'react'
import  "../style/signup.css";
import { signup } from "@/api/verification";
import { toast } from 'react-toastify'

export const SignUp = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        if(!email) {
            toast.error("provide email", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        if(!password) {
            toast.error("provide password", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("provide a valid email", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const api = await signup({
            email,
            password,
            token
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

        toast.success('verification link sent to your email', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000
        });
        return;
    }

    return(<>
        <section>
            <div id='newAccount'>
                <div id='email-input'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div id='password-input'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={handleSubmit}>submit</button>
                </div>
            </div>
        </section>
    </>)
}