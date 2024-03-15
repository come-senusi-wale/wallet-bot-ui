"use client"
import Image from 'next/image';
import nearLogo from "@/public/image/near.jpeg";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/importToken.css";
import { tokeninfo, storeToken } from "@/api/token";



export const ImportToken = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const token = queryParams ? queryParams.get('token') : '';
    const accountId = queryParams ? queryParams.get('account') : '';

    const [tokenContractId, setTokenContractId] = useState('')
    const [tokenSymbol, setTokenSymbol] = useState('')
    const [tokenDecimal, settokenDecimal] = useState(0)
    const [tokenBalance, setTokenBalance] = useState('')
    const [tokenName, setTokenName] = useState('')
    const [tokenImg, setTokenImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6LOrHvdptkLcBUVgJHMzlhTCxpC4SLmXyZpMglp_1Q&s')
    const [tokenErr, setTokenErr] = useState(false)

    const getTokenDetail = async() => {
        if(!tokenContractId) {
            setTokenErr(false)
            return;
        }

        const api = await tokeninfo({
            contractId: tokenContractId,
            accountId,
            token,
        })

        const response = await api.json()

        const responseStatus = response.status

        if (!responseStatus) {
            setTokenErr(true)
            return;
        }

        setTokenBalance(response.data.data.accountBalance)
        setTokenSymbol(response.data.data.tokenMetadata.symbol)
        settokenDecimal(response.data.data.tokenMetadata.decimals)
        setTokenImg(response.data.data.tokenMetadata.icon)
        setTokenName(response.data.data.tokenMetadata.name)
        setTokenErr(false)

    }

    const impotTokenHandler = async () => {
        if(!tokenContractId) {
            toast.error("provide token address", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const api = await storeToken({
            contractId: tokenContractId,
            accountId,
            token,
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

        toast.success('transaction in progress', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000
        });
        return;
    }

    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">contract address</label>
                    <input type="text" placeholder='token address' value={tokenContractId} onChange={(e) => setTokenContractId(e.target.value)} onKeyUp={getTokenDetail}/>
                    {tokenErr?  <p className='text-red-600'>unable to get token info</p> : ''}
                </div>
                <div id='to-input'>
                    <label htmlFor="">symbol</label>
                    <input className="" type="text" placeholder='token symbol' readOnly value={tokenSymbol} />
                </div>
                <div id='amount-input'>
                    <label htmlFor="">decimal</label>
                    <input type="number" placeholder='token decimal' readOnly value={tokenDecimal}/>
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        <img src={`${tokenImg}`} alt="" className='img'/>
                        </div>
                        <h2>{tokenName}</h2>
                    </div>
                    <p>{tokenBalance}</p>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={impotTokenHandler}>import</button>
                </div>
            </div>
        </section>
    </>)
}