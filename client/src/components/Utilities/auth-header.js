export const authHeader = () => {
    // return authorization header with jwt token
    let data = JSON.parse(localStorage.getItem('treatmeUser'));

    if (data) {
        return { 'Authorization': 'Bearer ' + data.token };
    } else {
        return {};
    }
}
