import { SHA256 } from 'crypto-js';

export function generateHash() : string {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return SHA256(current_date + random).toString();
}
