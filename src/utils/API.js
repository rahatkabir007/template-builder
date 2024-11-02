export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

class API {
    // DEMO API CALLING STRUCTURE
    // static async login(token, email, fullName, avatar, tokenType) {
    //     console.log(token);
    //     console.log(API_ENDPOINT)
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //     const urlencoded = new URLSearchParams();
    //     urlencoded.append("token", token);
    //     urlencoded.append("tokenType", tokenType);
    //     urlencoded.append("email", email);
    //     urlencoded.append("fullName", fullName);
    //     urlencoded.append("avatar", avatar);
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: urlencoded,
    //         redirect: 'follow'
    //     };

    //     return await callFetch(`${API_ENDPOINT}/users/login`, requestOptions);
    // }
}


export default API;
