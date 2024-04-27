import jwt from 'jsonwebtoken'
import { encryptPassword, comparePassword } from './passwordUtils';

const JWT_KEY = process.env.JWT_KEY || 'SECRET';

const generateToken = (userId: string): string => {
    const token = jwt.sign({userId}, JWT_KEY, {expiresIn: '1d'});
    return token;
}

const generateAdminToken = (adminId: string): string => {
    const token = jwt.sign({adminId}, JWT_KEY, {expiresIn: '1d'});
    return token;
}


function convertToHumanFriendlyDate(dateString: any) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }


export {
    generateToken,
    generateAdminToken,
    encryptPassword,
    comparePassword,
    convertToHumanFriendlyDate,
}