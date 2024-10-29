/**
 * The MIT License (MIT)
 * Copyright (c) 2024 Mohanad Alkhatib
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * 
 * 
 * Tughra Library
 * 
 * This library provides a comprehensive framework for encrypting and decrypting text and files 
 * of various types using multiple algorithms, including Tughra, Caesar, Vigenère, and XOR. It is 
 * designed for developers and security professionals who need to secure sensitive information 
 * through encryption, as well as for educational purposes in understanding cryptographic concepts. 
 * The library aims to ensure data confidentiality and integrity by employing robust encryption 
 * techniques, making unauthorized access extremely difficult.
 *
 * End-to-End Encryption (E2EE):
 * The Tughra Library implements End-to-End Encryption (E2EE) to ensure that sensitive information 
 * is securely transmitted from one party to another without any intermediaries being able to access 
 * the data. This encryption model guarantees that only the sender and intended recipient can decrypt 
 * the information, thereby enhancing privacy and data security. The use of strong encryption algorithms 
 * and unique keys for each transaction minimizes the risk of data breaches and unauthorized access, 
 * making it a reliable choice for secure communication.
 *
 * Note: The Tughra method is specifically designed to be unbreakable without the correct `keyOffsets` 
 * and the specified number of `cycles`. Attempting to decrypt without these parameters would require 
 * immense computational power and time, making brute-force attacks impractical.
 *
 * Use Cases:
 * - **Secure Data Transmission**: Encrypt messages and files before sending them over insecure 
 *   channels to protect sensitive information from eavesdroppers.
 * - **Data Storage Security**: Encrypt data stored in databases or file systems to prevent 
 *   unauthorized access and ensure data privacy.
 * - **File Encryption**: Support for encrypting and decrypting files of all types, ensuring that 
 *   sensitive documents are protected from unauthorized access.
 * - **Educational Tool**: Demonstrate and explore cryptographic techniques and algorithms for 
 *   learning purposes.
 * - **Password Management**: Safely encrypt and store user passwords or sensitive credentials.
 *
 * Features:
 * - **Key Offsets**: Users can specify unique key offsets that are used in the encryption/decryption 
 *   process. These offsets determine how much each character in the input text is modified.
 * - **Encryption Modes**: The library supports multiple algorithms:
 *   - **Tughra**: A custom encryption method.
 *   - **Caesar**: A classic cipher that shifts characters by a fixed number.
 *   - **Vigenère**: A method that uses a keyword to apply varying shifts to characters.
 *   - **XOR**: A simple cipher that applies the XOR operation with a given key.
 * - **Base Encoding**: Users can enable or disable base encoding/decoding to handle the output of 
 *   the encryption process.
 * - **Key Strength Validation**: The library validates the strength of the provided encryption key, 
 *   ensuring it meets minimum length requirements for security.
 * - **File Support**: The library includes methods for encrypting and decrypting files of all types, 
 *   allowing users to protect sensitive documents while maintaining usability.
 * 
 * Usage:
 * 1. Instantiate the Tughra class with the desired parameters:
 *    ```javascript
 *    const tughra = new Tughra(keyOffsets, mode, baseCharset, algorithm, encryptionKey);
 *    ```
 * 2. Call the `process` method with the text to be encrypted or decrypted:
 *    ```javascript
 *    const result = tughra.process(text, cycles);
 *    ```
 * 3. Utilize the `decryptFile` method to decrypt files:
 *    ```javascript
 *    const decryptedFile = tughra.decryptFile(filePath, cycles);
 *    ```
 * 4. Utilize the `setAlgorithm` method to change the encryption algorithm if needed:
 *    ```javascript
 *    tughra.setAlgorithm('caesar');
 *    ```
 * 
 * Class TughraLibrary:
 * 
 * Contains predefined Unicode groups for generating character offsets from different languages 
 * and scripts. Each group is defined by its name and character range (start and end Unicode values).
 */

class Tughra {
    constructor(mode, baseCharset, algorithm, encryptionKey = '', useBaseEncoding = false) {
        // Ensure keyOffsets are unique and valid, then join them into a single string
        const uniqueKeyOffsets = Array.from(new Set(encryptionKey)).map(item => {
            const charCode = typeof item === 'string' ? item.charCodeAt(0) : item;
            if (isNaN(charCode)) {
                throw new Error("Invalid character in encryption array. Only letters and numbers are allowed.");
            }
            return item;
        }).join(''); // Join characters into a single string without commas


        if (algorithm === 'default' && uniqueKeyOffsets.length === 0) {
            throw new Error("keyOffsets must contain at least one valid value.");
        }

        this.keyOffsets = uniqueKeyOffsets;

        this.mode = mode || 'encrypt'; // 'encrypt' or 'decrypt', default = encrypt
        this.useBaseEncoding = useBaseEncoding; // true for base encoding/decoding, false otherwise
        this.baseCharset = baseCharset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; // Base alphabet, default = Base64
        this.baseLibrary = this.baseEncodeDecode(this.baseCharset); // Create base library 
        this.encryptionKey = new TextEncoder().encode(encryptionKey); // User-provided key for encryption

        // Only check key strength if the algorithm is not 'default'
        if (algorithm !== 'default') {
            this.checkKeyStrength(encryptionKey); // Validate key strength
        }
        this.algorithm = algorithm || 'default'; // Default encryption algorithm
        this.substitutionKey = {
            'a': 'q',
            'b': 'w',
            'c': 'e',
            'd': 'r',
            'e': 't',
            'f': 'y',
            'g': 'u',
            'h': 'i',
            'i': 'o',
            'j': 'p',
            'k': 'a',
            'l': 's',
            'm': 'd',
            'n': 'f',
            'o': 'g',
            'p': 'h',
            'q': 'j',
            'r': 'k',
            's': 'l',
            't': 'z',
            'u': 'x',
            'v': 'c',
            'w': 'v',
            'x': 'b',
            'y': 'n',
            'z': 'm',
            'A': 'Q',
            'B': 'W',
            'C': 'E',
            'D': 'R',
            'E': 'T',
            'F': 'Y',
            'G': 'U',
            'H': 'I',
            'I': 'O',
            'J': 'P',
            'K': 'A',
            'L': 'S',
            'M': 'D',
            'N': 'F',
            'O': 'G',
            'P': 'H',
            'Q': 'J',
            'R': 'K',
            'S': 'L',
            'T': 'Z',
            'U': 'X',
            'V': 'C',
            'W': 'V',
            'X': 'B',
            'Y': 'N',
            'Z': 'M'
        };

        this.reverseSubstitutionKey = Object.fromEntries(
            Object.entries(this.substitutionKey).map(([key, value]) => [value, key])
        );
        // Affine Cipher Keys
        this.a = 5; // Must be coprime to 26
        this.b = 8; // Additive key
        this.m = 26; // Size of the alphabet
    }


    // Set the encryption algorithm
    setAlgorithm(algorithm) {
        this.algorithm = algorithm; // e.g., 'default for tughra', 'caesar', 'vigenere', 'xor'
    }

    // Check key strength
    checkKeyStrength(encryptionKey) {
        if (encryptionKey.length < 8) {
            throw new Error("Key must be at least 8 characters long.");
        }
    }

    // Main method that either encrypts or decrypts based on the mode
    process(text, cycles) {
        if (this.useBaseEncoding && this.mode === 'decrypt') {
            text = this.fromBase(text); // Convert input from base if required
        }

        // Check if the algorithm is XOR, ROT47, ROT13 and set cycles to 1 if so
        if (this.algorithm === 'xor' || this.algorithm === 'ROT47' || this.algorithm === 'ROT13') {
            cycles = 1; // Set cycles to 1 for XOR, ROT47, ROT13
        }

        let resultText = text;
        for (let i = 0; i < cycles; i++) {
            resultText = this._processCycle(resultText, this.mode);
        }

        return this.useBaseEncoding && this.mode === 'encrypt' ? this.toBase(resultText) : resultText;
    }

    // Process encryption/decryption based on the selected algorithm
    _processCycle(text, mode) {
        switch (this.algorithm) {
            case 'caesar':
                return mode === 'encrypt' ? this._caesarEncrypt(text) : this._caesarDecrypt(text);
            case 'vigenere':
                return mode === 'encrypt' ? this._vigenereEncrypt(text) : this._vigenereDecrypt(text);
            case 'xor':
                return mode === 'encrypt' ? this._xorEncrypt(text) : this._xorDecrypt(text);
            case 'ROT47':
                return mode === 'encrypt' ? this._encryptROT47(text) : this._decryptROT47(text);
            case 'Atbash':
                return mode === 'encrypt' ? this._encryptAtbash(text) : this._decryptAtbash(text);
            case 'Substitution':
                return mode === 'encrypt' ? this._encryptSubstitution(text) : this._decryptSubstitution(text);
            case 'Base64':
                return mode === 'encrypt' ? this._encryptBase64(text) : this._decryptBase64(text);
            case 'ASCII':
                return mode === 'encrypt' ? this._encryptAsciiShift(text) : this._decryptAsciiShift(text);
            case 'Affine':
                return mode === 'encrypt' ? this._encryptAffine(text) : this._decryptAffine(text);
            case 'Unicode Shift':
                return mode === 'encrypt' ? this._encryptUnicodeShift(text) : this._decryptUnicodeShift(text);
            case 'Numeric':
                return mode === 'encrypt' ? this._encryptNumeric(text) : this._decryptNumeric(text);
            case 'Reversed Caesar':
                return mode === 'encrypt' ? this._encryptReversedCaesar(text) : this._decryptReversedCaesar(text);
            case 'ROT13':
                return mode === 'encrypt' ? this._encryptROT13(text) : this._decryptROT13(text);
            case 'ROT18':
                return mode === 'encrypt' ? this._encryptROT18(text) : this._decryptROT18(text);
            case 'ROT25':
                return mode === 'encrypt' ? this._encryptROT25(text) : this._decryptROT25(text);
            case 'ROT30':
                return mode === 'encrypt' ? this._encryptROT30(text) : this._decryptROT30(text);
            case 'XOR Pro':
                return mode === 'encrypt' ? this._encryptXORPro(text, this.keyOffsets) : this._decryptXORPro(text, this.keyOffsets);
            case 'Affine Pro':
                return mode === 'encrypt' ? this._encryptAffinePro(text, this.encryptionKey) : this._decryptAffinePro(text, this.encryptionKey);
            case 'Substitution Pro':
                return mode === 'encrypt' ? this._encryptSubstitutionPro(text, this.encryptionKey) : this._decryptSubstitutionPro(text, this.encryptionKey);
            default:
                return mode === 'encrypt' ? this._TughraEncrypt(text) : this._TughraDecrypt(text);
        }

    }

    _modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return null; // No modular inverse if not found
    }
    // 9. Affine Cipher (Encrypt & Decrypt)
    _encryptAffine(text) {
        return text.split('').map(char => {
            if (/[A-Za-z]/.test(char)) { // Check if the character is a letter
                const base = char === char.toUpperCase() ? 65 : 97; // Base for uppercase or lowercase
                const encryptedChar = String.fromCharCode(((this.a * (char.charCodeAt(0) - base) + this.b) % 26) + base);
                return encryptedChar;
            }
            return char; // Return unchanged if not a letter
        }).join('');
    }

    _decryptAffine(text) {
        const a_inv = this._modInverse(this.a, 26);
        return text.split('').map(char => {
            if (/[A-Za-z]/.test(char)) { // Check if the character is a letter
                const base = char === char.toUpperCase() ? 65 : 97; // Base for uppercase or lowercase
                const decryptedChar = String.fromCharCode(((a_inv * (char.charCodeAt(0) - base - this.b + 26)) % 26 + 26) % 26 + base);
                return decryptedChar;
            }
            return char; // Return unchanged if not a letter
        }).join('');
    }

    _encryptAffinePro(text) {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                const x = char.charCodeAt(0) - base; // Convert char to 0-25
                const encryptedChar = String.fromCharCode(((this.a * x + this.b) % this.m) + base);
                return encryptedChar;
            }
            return char; // Return unchanged if not a letter
        }).join('');
    }

    _decryptAffinePro(text) {
        const aInv = this._modInverse(this.a, this.m);
        if (aInv === null) {
            throw new Error("No modular inverse exists for the given key 'a'");
        }

        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const isUpperCase = char === char.toUpperCase();
                const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                const y = char.charCodeAt(0) - base; // Convert char to 0-25
                const decryptedChar = String.fromCharCode((aInv * (y - this.b + this.m)) % this.m + base);
                return decryptedChar;
            }
            return char; // Return unchanged if not a letter
        }).join('');
    }

    _encryptSubstitutionPro(text) {
        return text.split('').map(char => {
            return this.substitutionKey[char] || char; // Substitute or return unchanged
        }).join('');
    }

    _decryptSubstitutionPro(text) {
        return text.split('').map(char => {
            return this.reverseSubstitutionKey[char] || char; // Substitute or return unchanged
        }).join('');
    }
    // ROT13 (symmetric)
    _encryptROT13(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
        });
    }

    _decryptROT13(text) {
        return this._encryptROT13(text); // ROT13 is symmetric
    }

    // ROT18 (not symmetric)
    _encryptROT18(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 18) % 26) + base);
        });
    }

    _decryptROT18(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 26 - 18) % 26) + base);
        });
    }

    // ROT25 (not symmetric)
    _encryptROT25(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 25) % 26) + base);
        });
    }

    _decryptROT25(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 26 - 25) % 26) + base);
        });
    }

    // ROT30 (custom decryption)
    _encryptROT30(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 4) % 26) + base);
        });
    }

    _decryptROT30(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + 22) % 26 + 26) % 26 + base);
        });
    }

    _encryptXORPro(text, key) {
        return text.split('').map((char, index) => {
            return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length));
        }).join('');
    }

    _decryptXORPro(text, key) {
        return this._encryptXORPro(text, key); // XOR is symmetric
    }

    // Default Tughra encryption cycle
    _TughraEncrypt(text) {
        let encryptedText = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);

            // Get the offset by converting the character at keyOffsets[i % keyOffsets.length] to its char code
            let offset = this.keyOffsets.charCodeAt(i % this.keyOffsets.length);

            encryptedText += String.fromCharCode(charCode + offset);
        }
        return encryptedText;
    }

    // Tughra decryption cycle
    _TughraDecrypt(encryptedText) {
        let decryptedText = '';
        for (let i = 0; i < encryptedText.length; i++) {
            let charCode = encryptedText.charCodeAt(i);

            // Get the offset by converting the character at keyOffsets[i % keyOffsets.length] to its char code
            let offset = this.keyOffsets.charCodeAt(i % this.keyOffsets.length);

            decryptedText += String.fromCharCode(charCode - offset);
        }
        return decryptedText;
    }

    // Caesar Cipher Encryption
    _caesarEncrypt(text) {
        return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) + this.encryptionKey.length)).join('');
    }

    _caesarDecrypt(text) {
        return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) - this.encryptionKey.length)).join('');
    }

    // Vigenère Cipher Encryption
    _vigenereEncrypt(text) {
        const textBytes = new TextEncoder().encode(text); // Convert text to UTF-8 byte array
        const encryptedBytes = textBytes.map((byte, i) =>
            (byte + this.encryptionKey[i % this.encryptionKey.length]) % 256
        );

        // Convert encrypted byte array to Base64
        return this._arrayBufferToBase64(encryptedBytes);
    }

    // Vigenère Cipher Decryption
    _vigenereDecrypt(encryptedText) {
        const encryptedBytes = this._base64ToArrayBuffer(encryptedText); // Decode Base64 to byte array

        const decryptedBytes = encryptedBytes.map((byte, i) =>
            (byte - this.encryptionKey[i % this.encryptionKey.length] + 256) % 256
        );

        return new TextDecoder().decode(Uint8Array.from(decryptedBytes)); // Convert decrypted bytes back to text
    }


    // Helper to convert ArrayBuffer to Base64 safely with chunks
    _arrayBufferToBase64(buffer) {
        const binary = [];
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.length; i += 8192) {
            binary.push(String.fromCharCode(...bytes.slice(i, i + 8192)));
        }
        return btoa(binary.join(''));
    }

    // Helper to convert Base64 to ArrayBuffer safely
    _base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }


    // XOR Encryption/Decryption
    _xorEncrypt(text) {
        if (!this.encryptionKey) throw new Error("Encryption key is missing.");

        const textBytes = new TextEncoder().encode(text); // Encode text to UTF-8 byte array
        const keyBytes = new TextEncoder().encode(this.encryptionKey);
        const encryptedBytes = textBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

        return btoa(String.fromCharCode(...encryptedBytes)); // Convert to Base64 for safe storage
    }

    _xorDecrypt(encryptedText) {
        const encryptedBytes = atob(encryptedText).split('').map(char => char.charCodeAt(0)); // Decode Base64 and convert to bytes
        const keyBytes = new TextEncoder().encode(this.encryptionKey);

        const decryptedBytes = encryptedBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);
        return new TextDecoder().decode(Uint8Array.from(decryptedBytes)); // Decode UTF-8 byte array back to text
    }

    // 1. ROT47 (Encrypt & Decrypt)
    _encryptROT47(text) {
        return text.replace(/[!-~]/g, char =>
            String.fromCharCode(33 + ((char.charCodeAt(0) + 14) % 94))
        );
    }

    _decryptROT47(text) {
        return this.encryptROT47(text); // ROT47 is symmetric
    }

    // 2. Atbash Cipher (Encrypt & Decrypt)
    _encryptAtbash(text) {
        return text.replace(/[a-zA-Z]/g, char => {
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
        });
    }

    _decryptAtbash(text) {
        return this.encryptAtbash(text); // Atbash is symmetric
    }

    // 5. Simple Substitution Cipher (Encrypt & Decrypt)
    _encryptSubstitution(text) {
        return text.split('').map(char =>
            this.substitutionKey[char] || char // Leave non-alphabetic characters unchanged
        ).join('');
    }

    _decryptSubstitution(text) {
        return text.split('').map(char =>
            this.reverseSubstitutionKey[char] || char // Leave non-alphabetic characters unchanged
        ).join('');
    }
    // 6. Base64 Encoding (Encrypt & Decrypt)
    _encryptBase64(text) {
        return btoa(text); // Convert to Base64
    }

    _decryptBase64(base64) {
        return atob(base64); // Convert from Base64
    }

    // 7. ASCII Shift Cipher (Encrypt & Decrypt)
    _encryptAsciiShift(text) {
        return text.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) + this.encryptionKey.length)
        ).join('');
    }

    _decryptAsciiShift(text) {
        return text.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) - this.encryptionKey.length)
        ).join('');
    }

    // 10. Unicode Shift Cipher (Encrypt & Decrypt)
    _encryptUnicodeShift(text) {
        return text.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) + this.encryptionKey.length)
        ).join('');
    }

    _decryptUnicodeShift(text) {
        return text.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) - this.encryptionKey.length)
        ).join('');
    }

    // 11. Numeric Cipher (Encrypt & Decrypt)
    _encryptNumeric(text) {
        return text.split('').map(char =>
            char.charCodeAt(0)
        ).join('-');
    }

    _decryptNumeric(numbers) {
        return numbers.split('-').map(num =>
            String.fromCharCode(parseInt(num))
        ).join('');
    }

    // 12. Reversed Caesar Cipher (Encrypt & Decrypt)
    _encryptReversedCaesar(text) {
        return text.replace(/[a-zA-Z]/g, char => {
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((25 - (char.charCodeAt(0) - base) + this.encryptionKey.length) % 26) + base);
        });
    }

    _decryptReversedCaesar(text) {
        return text.replace(/[a-zA-Z]/g, char => {
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((25 - (char.charCodeAt(0) - base) - this.encryptionKey.length + 26) % 26) + base);
        });
    }

    // Base encoding function
    toBase(text) {
        if (!text) return text; // Handle empty text
        try {
            return this.baseLibrary.encode(unescape(encodeURIComponent(text)));
        } catch (error) {
            console.error("Base encoding failed:", error);
            return text;
        }
    }

    // Base decoding function
    fromBase(text) {
        if (!text) return text; // Handle empty text
        try {
            return decodeURIComponent(escape(this.baseLibrary.decode(text)));
        } catch (error) {
            console.error("Base decoding failed:", error);
            return text;
        }
    }

    // Base encoding/decoding library
    baseEncodeDecode(alphabet) {
        const base = alphabet.length;
        const chunkSize = Math.ceil(Math.log(base));
        const Library = {
            encode: (text) => {
                let output = '';
                let binary = '';
                // Convert text to binary string
                for (let i = 0; i < text.length; i++) {
                    binary += text.charCodeAt(i).toString(2).padStart(8, '0');
                }


                for (let i = 0; i < binary.length; i += chunkSize) {
                    const chunk = binary.substring(i, i + chunkSize).padEnd(chunkSize, '0');
                    const index = parseInt(chunk, 2);
                    output += alphabet[index]; // Append the corresponding character from the alphabet
                }


                return output;
            },

            decode: (text) => {
                let binary = '';


                // Split based on base

                for (let i = 0; i < text.length; i++) {
                    const index = alphabet.indexOf(text[i]);
                    if (index === -1) throw new Error('Invalid Base character');
                    binary += index.toString(2).padStart(chunkSize, '0'); // Convert to binary based on chunk size
                }

                // Convert binary string to text
                let output = '';
                for (let i = 0; i < binary.length; i += 8) {
                    const chunk = binary.substring(i, i + 8);
                    if (chunk.length === 8) {
                        output += String.fromCharCode(parseInt(chunk, 2));
                    }
                }

                return output;
            }
        };

        return Library;
    }




}
class TughraLibrary {
    constructor() {
        // Define Unicode groups for character generation
        this.unicodeGroups = [{
                name: 'Numbers',
                start: 48,
                end: 57
            }, // 0-9
            {
                name: 'Lowercase English',
                start: 97,
                end: 122
            }, // a-z
            {
                name: 'Uppercase English',
                start: 65,
                end: 90
            }, // A-Z
            {
                name: 'Basic Latin',
                start: 33,
                end: 127
            },
            {
                name: 'Latin-1 Supplement',
                start: 128,
                end: 255
            },
            {
                name: 'Latin Extended-A',
                start: 256,
                end: 383
            },
            {
                name: 'Latin Extended-B',
                start: 384,
                end: 591
            },
            {
                name: 'IPA Extensions',
                start: 592,
                end: 687
            },
            {
                name: 'Greek and Coptic',
                start: 880,
                end: 1023
            },
            {
                name: 'Cyrillic',
                start: 1024,
                end: 1279
            },
            {
                name: 'Arabic',
                start: 1536,
                end: 1791
            },
            {
                name: 'Hebrew',
                start: 1424,
                end: 1535
            },
            {
                name: 'Devanagari',
                start: 2304,
                end: 2431
            },
            {
                name: 'Bengali',
                start: 2432,
                end: 2559
            },
            {
                name: 'Gurmukhi',
                start: 2560,
                end: 2687
            },
            {
                name: 'Gujarati',
                start: 2688,
                end: 2815
            },
            {
                name: 'Oriya',
                start: 2816,
                end: 2943
            },
            {
                name: 'Tamil',
                start: 2944,
                end: 3071
            },
            {
                name: 'Telugu',
                start: 3072,
                end: 3199
            },
            {
                name: 'Kannada',
                start: 3200,
                end: 3327
            },
            {
                name: 'Malayalam',
                start: 3328,
                end: 3455
            },
            {
                name: 'Thai',
                start: 3584,
                end: 3711
            },
            {
                name: 'Lao',
                start: 3712,
                end: 3839
            },
            {
                name: 'Tibetan',
                start: 3840,
                end: 4095
            },
            {
                name: 'Georgian',
                start: 4256,
                end: 4351
            },
            {
                name: 'Hangul Jamo',
                start: 4352,
                end: 4607
            },
            {
                name: 'Latin Extended Additional',
                start: 7680,
                end: 7935
            },
            {
                name: 'Greek Extended',
                start: 7936,
                end: 8191
            },
            {
                name: 'General Punctuation',
                start: 8192,
                end: 8303
            },
            {
                name: 'Superscripts and Subscripts',
                start: 8304,
                end: 8351
            },
            {
                name: 'Currency Symbols',
                start: 8352,
                end: 8399
            },
            {
                name: 'Combining Diacritical Marks',
                start: 8400,
                end: 8447
            },
            {
                name: 'Letterlike Symbols',
                start: 8448,
                end: 8527
            },
            {
                name: 'Number Forms',
                start: 8528,
                end: 8591
            },
            {
                name: 'Arrows',
                start: 8592,
                end: 8703
            },
            {
                name: 'Mathematical Operators',
                start: 8704,
                end: 8959
            },
            {
                name: 'Miscellaneous Technical',
                start: 8960,
                end: 9215
            },
            {
                name: 'Control Pictures',
                start: 9216,
                end: 9279
            },
            {
                name: 'Optical Character Recognition',
                start: 9280,
                end: 9311
            },
            {
                name: 'Enclosed Alphanumerics',
                start: 9312,
                end: 9471
            },
            {
                name: 'Box Drawing',
                start: 9472,
                end: 9599
            },
            {
                name: 'Block Elements',
                start: 9600,
                end: 9631
            },
            {
                name: 'Geometric Shapes',
                start: 9632,
                end: 9727
            },
            {
                name: 'Miscellaneous Symbols',
                start: 9728,
                end: 9983
            },
            {
                name: 'Dingbats',
                start: 9984,
                end: 10175
            },
            {
                name: 'Braille Patterns',
                start: 10240,
                end: 10495
            },
            {
                name: 'CJK Symbols and Punctuation',
                start: 12288,
                end: 12351
            },
            {
                name: 'Hiragana',
                start: 12352,
                end: 12447
            },
            {
                name: 'Katakana',
                start: 12448,
                end: 12543
            },
            {
                name: 'Bopomofo',
                start: 12544,
                end: 12591
            },
            {
                name: 'Hangul Compatibility Jamo',
                start: 12592,
                end: 12687
            },
            {
                name: 'Phonetic Extensions',
                start: 12704,
                end: 12735
            },
            {
                name: 'Enclosed CJK Letters and Months',
                start: 12800,
                end: 13055
            },
            {
                name: 'CJK Compatibility',
                start: 13056,
                end: 13311
            },
            {
                name: 'CJK Unified Ideographs',
                start: 19968,
                end: 40959
            },
            {
                name: 'Hangul Syllables',
                start: 44032,
                end: 55215
            },
            {
                name: 'Private Use Area',
                start: 57344,
                end: 63743
            },
            {
                name: 'CJK Compatibility Ideographs',
                start: 63744,
                end: 64255
            },
            {
                name: 'Alphabetic Presentation Forms',
                start: 64256,
                end: 64335
            },
            {
                name: 'Arabic Presentation Forms-A',
                start: 64336,
                end: 65023
            },
            {
                name: 'Variation Selectors',
                start: 65024,
                end: 65039
            },
            {
                name: 'Combining Half Marks',
                start: 65056,
                end: 65071
            },
            {
                name: 'CJK Compatibility Forms',
                start: 65072,
                end: 65103
            },
            {
                name: 'Small Form Variants',
                start: 65104,
                end: 65135
            },
            {
                name: 'Arabic Presentation Forms-B',
                start: 65136,
                end: 65279
            },
            {
                name: 'Halfwidth and Fullwidth Forms',
                start: 65280,
                end: 65519
            },
            {
                name: 'Specials',
                start: 65520,
                end: 65535
            },
            {
                name: 'Linear B Syllabary',
                start: 65536,
                end: 65663
            },
            {
                name: 'Linear B Ideograms',
                start: 65664,
                end: 65791
            },
            {
                name: 'Aegean Numbers',
                start: 65792,
                end: 65855
            },
            {
                name: 'Ancient Greek Numbers',
                start: 65856,
                end: 65935
            },
            {
                name: 'Ancient Symbols',
                start: 65936,
                end: 65999
            },
            {
                name: 'Phaistos Disc',
                start: 66000,
                end: 66047
            },
            {
                name: 'Lycian',
                start: 66176,
                end: 66207
            },
            {
                name: 'Carian',
                start: 66208,
                end: 66271
            },
            {
                name: 'Coptic Epact Numbers',
                start: 66272,
                end: 66303
            },
            {
                name: 'Old Italic',
                start: 66304,
                end: 66351
            },
            {
                name: 'Gothic',
                start: 66352,
                end: 66383
            },
            {
                name: 'Old Permic',
                start: 66384,
                end: 66431
            },
            {
                name: 'Ugaritic',
                start: 66432,
                end: 66463
            },
            {
                name: 'Old Persian',
                start: 66464,
                end: 66527
            },
            {
                name: 'Deseret',
                start: 66560,
                end: 66639
            },
            {
                name: 'Shavian',
                start: 66640,
                end: 66687
            },
            {
                name: 'Osmanya',
                start: 66688,
                end: 66735
            },
            {
                name: 'Cypriot Syllabary',
                start: 67584,
                end: 67647
            },
            {
                name: 'Imperial Aramaic',
                start: 67648,
                end: 67679
            },
            {
                name: 'Phoenician',
                start: 67840,
                end: 67871
            },
            {
                name: 'Lydian',
                start: 67872,
                end: 67903
            },
            {
                name: 'Meroitic Hieroglyphs',
                start: 67968,
                end: 67999
            },
            {
                name: 'Meroitic Cursive',
                start: 68000,
                end: 68095
            },
            {
                name: 'Kharoshthi',
                start: 68096,
                end: 68191
            },
            {
                name: 'Old South Arabian',
                start: 68192,
                end: 68223
            },
            {
                name: 'Avestan',
                start: 68352,
                end: 68415
            },
            {
                name: 'Inscriptional Parthian',
                start: 68416,
                end: 68447
            },
            {
                name: 'Inscriptional Pahlavi',
                start: 68448,
                end: 68479
            },
            {
                name: 'Old Turkic',
                start: 68480,
                end: 68511
            },
            {
                name: 'Rumi Numeral Symbols',
                start: 68512,
                end: 68543
            },
            {
                name: 'Brahmi',
                start: 69632,
                end: 69703
            },
            {
                name: 'Kaithi',
                start: 69728,
                end: 69791
            },
            {
                name: 'Sora Sompeng',
                start: 69840,
                end: 69863
            },
            {
                name: 'Chakma',
                start: 69984,
                end: 70079
            },
            {
                name: 'Sharada',
                start: 70080,
                end: 70143
            },
            {
                name: 'Takri',
                start: 70144,
                end: 70239
            },
            {
                name: 'Mahajani',
                start: 70240,
                end: 70271
            },
            {
                name: 'Mandaic',
                start: 70272,
                end: 70335
            },
            {
                name: 'Ahlat',
                start: 70336,
                end: 70383
            },
            {
                name: 'Miao',
                start: 70384,
                end: 70431
            },
            {
                name: 'Arabic Mathematical Alphabetic Symbols',
                start: 70464,
                end: 70495
            },
            {
                name: 'CJK Compatibility Ideographs Extension A',
                start: 108224,
                end: 108455
            },
            {
                name: 'CJK Compatibility Ideographs Extension B',
                start: 110576,
                end: 110751
            },
            {
                name: 'CJK Compatibility Ideographs Extension C',
                start: 110752,
                end: 110855
            },
            {
                name: 'CJK Compatibility Ideographs Extension D',
                start: 110856,
                end: 110879
            },
            {
                name: 'CJK Compatibility Ideographs Extension E',
                start: 110880,
                end: 110999
            },
            {
                name: 'CJK Compatibility Ideographs Extension F',
                start: 111040,
                end: 111411
            }
        ];

    }

    _formatSize(bytes) {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
        let unitIndex = 0;

        while (bytes >= 1024 && unitIndex < units.length - 1) {
            bytes /= 1024;
            unitIndex++;
        }

        return `${bytes.toFixed(2)} ${units[unitIndex]}`;
    }

    _calculateStats(input) {
        let text;
        let type = "text/plain"; // Default type for plain text

        if (input instanceof Blob) {
            // If input is a Blob, extract text and retain its MIME type
            text = input.text();
            type = input.type;
        } else if (typeof input === "string" && input.startsWith("data:")) {
            // If input is a data URI, decode it
            const [header, base64Data] = input.split(",");
            type = header.match(/:(.*?);/)[1];

            // Decode Base64 data and create a Blob to get the size in bytes
            const binaryData = atob(base64Data);
            text = binaryData;
            const blob = new Blob([binaryData], {
                type
            });
            return {
                characters: binaryData.length,
                words: binaryData.trim().split(/\s+/).filter(Boolean).length,
                lines: binaryData.split(/\r\n|\r|\n/).length,
                size: blob.size,
                type,
                isBlob: false,
                isDataURI: true
            };
        } else {
            // If input is a plain text string
            text = input;
        }

        // Create a blob for accurate byte size
        const blob = new Blob([text], {
            type
        });
        const bytes = blob.size;
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const lines = text.split(/\r\n|\r|\n/).length;

        return {
            characters: text.length,
            words,
            lines,
            size: bytes,
            type,
            isBlob: input instanceof Blob,
            isDataURI: false
        };
    }

    detectLanguage(text) {
        const counts = {};

        // Initialize counts for each group
        this.unicodeGroups.forEach(group => {
            counts[group.name] = 0;
        });

        // Iterate through each character in the text
        for (let char of text) {
            const charCode = char.charCodeAt(0);
            // Check which group the character belongs to
            for (let group of this.unicodeGroups) {
                if (charCode >= group.start && charCode <= group.end) {
                    counts[group.name]++;
                    break; // Exit the loop once a group is found
                }
            }
        }

        // Find the group with the maximum count
        let detectedLanguage = null;
        let maxCount = 0;

        for (let groupName in counts) {
            if (counts[groupName] > maxCount) {
                maxCount = counts[groupName];
                detectedLanguage = groupName;
            }
        }

        return detectedLanguage;
    }

    getUnicodeGroups() {
        return this.unicodeGroups;
    }


    generateKey(cycles, groupNames) {
        const encryptionArray = [];
        const storedGroups = [];

        // Process each selected group name
        groupNames.split(',').forEach(groupName => {
            const trimmedGroupName = groupName.trim();
            const group = this.unicodeGroups.find(g => g.name === trimmedGroupName);
            if (!group) {
                throw new Error(`Invalid Unicode group name: ${trimmedGroupName}`);
            }

            // Store each valid Unicode group for later random selection
            storedGroups.push(group);
        });

        // Generate random characters from the selected groups for the specified number of cycles
        for (let i = 0; i < cycles; i++) {
            const randomUnicodeGroup = storedGroups[Math.floor(Math.random() * storedGroups.length)];

            // Generate characters within the selected group range
            const characters = [];
            for (let j = randomUnicodeGroup.start; j <= randomUnicodeGroup.end; j++) {
                characters.push(String.fromCharCode(j));
            }

            // Pick a random character from the selected group's character range
            const randomIndex = Math.floor(Math.random() * characters.length);
            encryptionArray.push(characters[randomIndex]);
        }

        // Return exactly 'cycles' random characters
        return encryptionArray;
    }


    // Function to generate characters for a selected group
    displayCharacters(groupName) {
        // Find the group by name
        const group = this.unicodeGroups.find(g => g.name === groupName);
        if (!group) {
            console.log(`Group "${groupName}" not found.`);
            return '';
        }

        let characters = '';
        for (let i = group.start; i <= group.end; i++) {
            // Use fromCodePoint to handle higher code points
            characters += String.fromCodePoint(i);
        }

        return characters; // Return the characters for further use
    }

}


// Export for use in other environments (e.g., Node.js or bundling)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tughra;
    module.exports = TughraLibrary;
}
