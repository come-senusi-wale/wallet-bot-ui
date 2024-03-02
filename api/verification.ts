import { baseUrl } from "./wallet";

export const signup = async(body: any) => {
    const response = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify(body),
    });

    return response
}