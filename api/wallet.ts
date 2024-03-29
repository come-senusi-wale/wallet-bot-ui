// import { axiosInstance } from "./axios"

// export const baseUrl = 'http://localhost:7000/api'
export const baseUrl = 'https://build-africa-wallet-server.vercel.app/api'

// export const createWallet = (body: any) => {
//     return axiosInstance().post("/create_account", body);
// }

export const network = 'testnet'

export const createNewWallet = async(body: any) => {
    const response = await fetch(`${baseUrl}/create_account`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const checkAccount = async(body: any) => {
    const response = await fetch(`${baseUrl}/check_account`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const exportAccount = async(body: any) => {
    const response = await fetch(`${baseUrl}/export_account`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const checkValidAccount = async(body: any) => {
    const response = await fetch(`${baseUrl}/check_validity_account`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const getAccountNearBalance = async(body: any) => {
    const response = await fetch(`${baseUrl}/get_account_near_balance`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const sendNearToken = async(body: any) => {
    const response = await fetch(`${baseUrl}/send_near_token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}
