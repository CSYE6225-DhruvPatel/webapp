import bcrypt from 'bcrypt';
const saltRounds = 5;

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const validatePassword = async (password, hashedPassword) => {
    console.log(password, hashedPassword)
    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        console.log(isValid)
        return isValid;
    } catch (error) {
        console.log(error);
    }
}