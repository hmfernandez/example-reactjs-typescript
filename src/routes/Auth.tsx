

export const isAuthenticated = () => {
    let xauth = localStorage.getItem('auth-token');
    if (xauth) {
        return true;
    }
    return false;
};
