// import { axiosInstance } from "./axios"

const baseUrl = 'http://localhost:5000/api'

// export const createWallet = (body: any) => {
//     return axiosInstance().post("/create_account", body);
// }

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