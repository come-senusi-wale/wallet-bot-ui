import { baseUrl } from "./wallet";

export const tokeninfo = async(body: any) => {
    const response = await fetch(`${baseUrl}/token_info`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}

export const storeToken = async(body: any) => {
    const response = await fetch(`${baseUrl}/store_token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}