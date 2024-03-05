// import { axiosInstance } from "./axios"

export const baseUrl = 'http://localhost:7000/api'

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
