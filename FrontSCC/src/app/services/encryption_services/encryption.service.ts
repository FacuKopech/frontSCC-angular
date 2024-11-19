import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private secretKey = '87654321';
  private iv = CryptoJS.enc.Utf8.parse('12345678');

  constructor() {}

  encryptPassword(password: string): string {
    const utf8Password = CryptoJS.enc.Utf8.parse(password);

    const encrypted = CryptoJS.AES.encrypt(utf8Password, CryptoJS.enc.Utf8.parse(this.secretKey), {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return encrypted;
  }
}
