export const validateAdminData = (data) => {
    const { username, password, fullname } = data;
    if (!username || !password || !fullname) {
        throw new Error('All fields are required');
    }
    if (username.length < 4) {
        throw new Error('Username must be at least 4 characters');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
};
