
<div class="guide-container">
  <h1>Tughra Library Guide</h1>
<p>The Tughra Library offers robust <b>End-to-End Encryption (E2EE)</b>, ensuring that data remains private and secure from the point it leaves the sender to the moment it reaches the intended recipient. With E2EE, data is encrypted on the sender's device, transmitted as unreadable ciphertext, and decrypted only by the authorized recipient, meaning no intermediaries (such as service providers or unauthorized third parties) can access the plaintext data during transit. This design is crucial for safeguarding sensitive information, as it prevents unauthorized access at any stage of data transmission. Tughra’s implementation of E2EE leverages advanced algorithms and customizable encryption cycles, allowing developers to configure secure, high-performance encryption processes directly into their applications.</p>
  <h2>1. Overview</h2>
  <p>The Tughra Library offers encryption methods such as Turgha,  Caesar, Vigenere, XOR, and custom options. With features like configurable encryption modes, base character sets, and custom keys, it provides a flexible solution for encryption and decryption.</p>
<h2>Demo</h2>
  <p>Here’s a simple <a href="https://github.com/Mohanadhatip/TUGHRA/blob/main/demo.html">demo</a> of how to use the Tughra Library to encrypt and decrypt a message, files, images, audios, videos, and more.</p>
  <img src="demo.gif" alt="Demo" />

  <h2>2. Getting Started</h2>
  <p>Initialize the Tughra library by creating an instance of the <code>Tughra</code> class.</p>
 <p>Ensure you have the Tughra Library available in your project. You can either include it as a script or import it as a module in your JavaScript file.</p>
<div class="example">
<p><strong>Adding the Tughra Library Script</strong></p>
      <p><strong>Installing via npm</strong></p>
    <p>You can also install the Tughra Library via npm. Run the following command in your terminal:</p>
<pre> npm install tughra@1.0.1</pre>
<p>If you have the tughra.js file locally, place it in the same directory as your HTML file or in a designated js folder. You can also include it from a CDN or UNPKG. Add the following <b>&lt;script&gt;</b> tags in the <b>&lt;head&gt;</b> section of your HTML file:</p>
<pre>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Tughra Library Guide&lt;/title&gt;

  &lt;!-- Link to Tughra Library (local file) --&gt;
  &lt;script src="tughra.js"&gt;&lt;/script&gt;

  &lt;!-- Link to Tughra Library (CDN) --&gt;
  &lt;script src="https://cdn.jsdelivr.net/npm/tughra@1.0.1/tughra.min.js"&gt; &lt;/script&gt;
  &lt;!-- Link to Tughra Library (UNPKG) --&gt;
  &lt;script src="https://unpkg.com/tughra@1.0.1/tughra.min.js"&gt; &lt;/script&gt;

  &lt;style&gt;
    /* Your CSS styling here */
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- HTML content here --&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
</div>
   <div class="example">
    <p><strong>Initialize the Tughra object</strong></p>
    <pre>const tughra = new Tughra(mode, baseCharset, algorithm, encryptionKey, useBaseEncoding);</pre>
  </div>
  <div class="example">
    <p><strong>Example 1:</strong></p>
    <pre>const tughra = new Tughra('encrypt', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'caesar', 'myKey', false);</pre>
  </div>
  <div class="example">
    <p><strong>Example 2:</strong></p>
    <pre>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Tughra Library Guide&lt;/title&gt;

  &lt;!-- Link to Tughra Library --&gt;
  &lt;script src="tughra.js"&gt;&lt;/script&gt;

  &lt;!-- Link to Tughra Library (CDN) --&gt;
  &lt;script src="https://cdn.jsdelivr.net/npm/tughra@1.0.1/tughra.min.js"&gt; &lt;/script&gt;
  &lt;!-- Link to Tughra Library (UNPKG) --&gt;
  &lt;script src="https://unpkg.com/tughra@1.0.1/tughra.min.js"&gt; &lt;/script&gt;

  
  &lt;style&gt;
    /* Your CSS styling here */
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- HTML content here --&gt;
  &lt;div class="container"&gt;
    &lt;h1&gt;Tughra Encryption Demo&lt;/h1&gt;  
    &lt;label for="inputText"&gt;Enter Text to Encrypt:&lt;/label&gt;
    &lt;input type="text" id="inputText" placeholder="Type something..."&gt;
    &lt;button onclick="encryptText()"&gt;Encrypt Text&lt;/button&gt;
    &lt;h2&gt;Encrypted Result:&lt;/h2&gt;
    &lt;p id="encryptedOutput"&gt;Your encrypted text will appear here.&lt;/p&gt;
  &lt;/div&gt;
  &lt;!-- JavaScript for Tughra library --&gt;
&lt;script&gt;
// Initialize the Tughra library and add encryption function
document.addEventListener('DOMContentLoaded', function () {
  const tughra = new Tughra('encrypt', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'caesar', 'myKey');
  window.encryptText = function () {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
      const encryptedText = tughra.process(inputText, 3); // Adjust cycles as needed
      document.getElementById('encryptedOutput').innerText = encryptedText;
    } else {
      document.getElementById('encryptedOutput').innerText = 'Please enter text to encrypt.';
    }
  };
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
    </pre>
  </div>
  <h2>3. Configuring the Library</h2>
  <div class="step">
    <h3>3.1 Mode</h3>
    <p>Set the mode to either <code>encrypt</code> or <code>decrypt</code>. The default mode is <code>encrypt</code>.</p>
  </div>

  <div class="step">
    <h3>3.2 Base Charset</h3>
    <p>The <code>baseCharset</code> parameter defines the set of characters for encoding, e.g., Base64 or a custom set.</p>
  </div>

  <div class="step">
    <h3>3.3 Algorithm</h3>
    <p>Choose an encryption algorithm like <code>Tughra</code>, <code>caesar</code>, <code>vigenere</code>, <code>XOR</code>,
     <code>ROT47</code>, 
      <code>Substitution</code>, 
       <code>Base64</code>, 
        <code>ASCII Shift</code>, 
         <code>Unicode Shift</code>, 
          <code>Numeric</code>, 
           <code>Reversed Caesar</code>, 
            <code>ROT13</code>, 
             <code>ROT18</code>, 
             <code>ROT25</code>, 
             <code>XOR Pro</code>, 
             <code>Affine Pro</code>, 
             <code>Substitution Pro</code>, 
    <code>ROT30</code>, <code>Affine</code>, or <code>Atbash</code>.</p>
    <p><b>Note:</b> some algorithm support only latin 1 group, but Tughra algorithm support all groups around the world.</p>
  </div>

  <h2>4. Processing Text</h2>
  <p>Use the <code>process</code> method to encrypt or decrypt text, specifying the number of cycles and the input text.</p>

  <div class="example">
    <p><strong>Example:</strong></p>
    <pre>const encryptedText = tughra.process("Hello, World!", 3);</pre>
  </div>

  <h2>5. Error Handling</h2>
  <p>If the encryption key doesn't meet the required strength, an error will be thrown. Ensure keys meet the minimum length requirement.</p>

  <h2>6. Advanced Features</h2>
  <div class="step">
    <h3>6.1 Custom Algorithms</h3>
    <p>Tughra supports advanced algorithms like <code>Affine Pro</code> and <code>Substitution Pro</code> for enhanced encryption.</p>
  </div>

  <h2>7. Additional Functions</h2>
  <h3>Auto-Generate Key Offsets</h3>
  <p>Use the <code>generateKey</code> function to create key offsets:</p>
  <pre>const tughra = new TughraLibrary(); // Adjust to your class instance
const keyOffsets = tughra.generateKey(5, 'Basic Latin');</pre>

  <h3>Cycle Adjustment</h3>
  <p>Cycles can be adjusted dynamically using buttons in the interface or by specifying them directly in the method call.</p>

  <h3>Character-Type Preservation</h3>
  <p>Tughra maintains the character type of input text, preserving the format across languages:</p>
  <pre>const encryptedText = tughra.process("Hello", cycles);</pre>

  <h3>Base64 Encoding/Decoding for Files</h3>
  <p>For applications needing Base64 handling set useBaseEncoding to true:</p>
  <pre>const tughra = new Tughra('encrypt', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'caesar', 'myKey', <strong>true</strong>);
const encryptedText = tughra.process("Hello, World!", 3);
const decryptedText = tughra.process(encryptedText, 3);</pre>

  <h2>Usage Cases</h2>
  <ul>
        <li><strong>Secure Data Transmission:</strong> Encrypt messages and files before sending them over insecure channels to protect sensitive information from eavesdroppers.</li>
        <li><strong>Data Storage Security:</strong> Encrypt data stored in databases or file systems to prevent unauthorized access and ensure data privacy.</li>
        <li><strong>File Encryption:</strong> Support for encrypting and decrypting files of all types, ensuring that sensitive documents are protected from unauthorized access.</li>
        <li><strong>Educational Tool:</strong> Demonstrate and explore cryptographic techniques and algorithms for learning purposes.</li>
        <li><strong>Password Management:</strong> Safely encrypt and store user passwords or sensitive credentials.</li>
    </ul>
  <h2>Important Note</h2>
  <div class="note">
    <p><strong>Note:</strong> The Tughra method requires the correct <code>keyOffsets</code> and <code>cycles</code> for decryption. Retain these values to prevent data loss.</p>
  </div>
    <p>The Tughra Encryption System provides superior protection through the use of encryption techniques based on random keys and multiple rounds of encryption, making it suitable for various fields and uses. Here is a comprehensive list of areas where this system can be beneficial:</p>
    <div class="toc">
        <h2>Contents</h2>
        <a href="#section1">1. Protecting Personal Data</a><br>
        <a href="#section2">2. Securing Communications</a><br>
        <a href="#section3">3. Securing Digital Content</a><br>
        <a href="#section4">4. E-Commerce</a><br>
        <a href="#section5">5. Securing Applications and Software</a><br>
        <a href="#section6">6. Identity Verification</a><br>
        <a href="#section7">7. Securing Systems and Networks</a><br>
        <a href="#section8">8. Cloud Storage</a><br>
        <a href="#section9">9. Protecting Software</a><br>
        <a href="#section10">10. Protecting Data in the Internet of Things (IoT)</a><br>
        <a href="#section11">11. Protecting Financial Data</a><br>
        <a href="#section12">12. Digital Forensics</a><br>
        <a href="#section13">13. Scientific and Academic Research</a><br>
        <a href="#section14">14. Encryption in Video Games</a><br>
        <a href="#section15">15. Securing Educational Institutions</a><br>
        <a href="#section16">16. Legal Transactions and Electronic Contracts</a><br>
        <a href="#section17">17. E-Government Systems</a><br>
        <a href="#section18">18. Secure Email Services</a><br>
        <a href="#section19">19. Protecting Media and Journalistic Content</a><br>
        <a href="#section20">20. Logistics and Supply Chains</a><br>
        <a href="#section21">21. Creating Cryptocurrency</a><br>
        <a href="#section22">22. Secure Electronic Voting System</a><br>
        <a href="#section23">23. Decentralized Cloud Computing</a><br>
        <a href="#section24">24. Securing Decentralized Digital Trade Platforms (DeFi)</a><br>
        <a href="#section25">25. Digital Rights Management (DRM)</a><br>
        <a href="#section26">26. Securing Financial Systems for Major Corporations</a><br>
        <a href="#section27">27. Advanced IoT Systems</a><br>
        <a href="#section28">28. Next-Generation Digital Infrastructure Systems (5G)</a><br>
        <a href="#section29">29. Managing Sensitive Documents for Multinational Corporations</a><br>
        <a href="#section30">30. Data Transfer Between Drones</a><br>
        <a href="#section31">31. Securing Military Communications</a><br>
        <a href="#section32">32. Protecting Government Networks</a><br>
        <a href="#section33">33. Weapons Management Systems</a><br>
        <a href="#section34">34. Protecting Data in Travel</a><br>
    </div><br><br>
    <div class="section" id="section1">
        <h2>1. Protecting Personal Data</h2>
        <p>• Encrypting medical records and sensitive health data.<br>
        • Protecting banking information such as account numbers and passwords.<br>
        • Encrypting personal identification information (such as electronic passports).</p>
    </div>
    <div class="section" id="section2">
        <h2>2. Securing Communications</h2>
        <p>• Encrypting text messages and emails.<br>
        • Securing voice and video calls over the internet.<br>
        • Protecting conversations in messaging apps like WhatsApp or Telegram.</p>
    </div>
    <div class="section" id="section3">
        <h2>3. Securing Digital Content</h2>
        <p>• Encrypting digital images and videos to prevent piracy.<br>
        • Protecting paid digital content such as e-books or movies.<br>
        • Securing design files and creative works.</p>
    </div>
    <div class="section" id="section4">
        <h2>4. E-Commerce</h2>
        <p>• Encrypting electronic payment data, such as credit card information.<br>
        • Protecting customer data and online business transactions.<br>
        • Securing purchases through e-commerce stores.</p>
    </div>
    <div class="section" id="section5">
        <h2>5. Securing Applications and Software</h2>
        <p>• Encrypting data within banking and business applications.<br>
        • Protecting data exchanged between application servers and users.<br>
        • Securing information stored in application databases.</p>
    </div>
    <div class="section" id="section6">
        <h2>6. Identity Verification</h2>
        <p>• Encrypting identity data during online authentication processes.<br>
        • Protecting fingerprints or other biometric data.<br>
        • Securing identity verification processes through electronic payment platforms.</p>
    </div>
    <div class="section" id="section7">
        <h2>7. Securing Systems and Networks</h2>
        <p>• Encrypting data exchanged between devices within the network.<br>
        • Protecting networks from cyberattacks such as malware.<br>
        • Securing communications within major enterprise networks.</p>
    </div>
    <div class="section" id="section8">
        <h2>8. Cloud Storage</h2>
        <p>• Encrypting files and information stored on cloud services like Google Drive.<br>
        • Protecting data during transfer between devices and the cloud.<br>
        • Securing cloud data from breaches or leaks.</p>
    </div>
    <div class="section" id="section9">
        <h2>9. Protecting Software</h2>
        <p>• Encrypting software code to prevent tampering or theft.<br>
        • Protecting intellectual property rights for computer programs and applications.<br>
        • Securing software applications from external attacks.</p>
    </div>
    <div class="section" id="section10">
        <h2>10. Protecting Data in the Internet of Things (IoT)</h2>
        <p>• Encrypting data sent and received between IoT devices.<br>
        • Securing smart control systems within homes and businesses.<br>
        • Protecting communications between sensors and smart vehicles.</p>
    </div>
    <div class="section" id="section11">
        <h2>11. Protecting Financial Data</h2>
        <p>• Encrypting financial data exchanged between banks and financial institutions.<br>
        • Securing electronic payment transactions and bank transfers.<br>
        • Protecting online bank accounts from breaches.</p>
    </div>
    <div class="section" id="section12">
        <h2>12. Digital Forensics</h2>
        <p>• Using encryption to secure digital evidence.<br>
        • Protecting information gathered during digital forensic investigations.<br>
        • Securing storage of sensitive criminal data.</p>
    </div>
    <div class="section" id="section13">
        <h2>13. Scientific and Academic Research</h2>
        <p>• Encrypting data and research information to prevent tampering or theft.<br>
        • Protecting academic research and scientific papers from breaches.<br>
        • Securing communication between researchers while sharing sensitive information.</p>
    </div>
    <div class="section" id="section14">
        <h2>14. Encryption in Video Games</h2>
        <p>• Protecting players' personal data within games.<br>
        • Encrypting financial transactions within digital games.<br>
        • Securing game servers from cyberattacks.</p>
    </div>
    <div class="section" id="section15">
        <h2>15. Securing Educational Institutions</h2>
        <p>• Encrypting sensitive information for students such as academic records.<br>
        • Securing data exchanged through e-learning platforms.<br>
        • Protecting online exams from cheating or tampering.</p>
    </div>
    <div class="section" id="section16">
        <h2>16. Legal Transactions and Electronic Contracts</h2>
        <p>• Encrypting electronic contracts to ensure their integrity.<br>
        • Protecting sensitive legal data during online transactions.<br>
        • Securing electronic signatures and confirmations.</p>
    </div>
    <div class="section" id="section17">
        <h2>17. E-Government Systems</h2>
        <p>• Encrypting citizen data within government databases.<br>
        • Securing online transactions and e-government services.<br>
        • Protecting communications between government agencies.</p>
    </div>
    <div class="section" id="section18">
        <h2>18. Secure Email Services</h2>
        <p>• Encrypting emails to ensure privacy and confidentiality.<br>
        • Protecting email exchanges from hackers and breaches.<br>
        • Securing communications for sensitive topics.</p>
    </div>
    <div class="section" id="section19">
        <h2>19. Protecting Media and Journalistic Content</h2>
        <p>• Encrypting journalistic materials and reports.<br>
        • Protecting news organizations from cyberattacks.<br>
        • Securing communications with sources.</p>
    </div>
    <div class="section" id="section20">
        <h2>20. Logistics and Supply Chains</h2>
        <p>• Encrypting data exchanged between suppliers and distributors.<br>
        • Securing communications in logistics systems.<br>
        • Protecting sensitive information about shipments.</p>
    </div>
    <div class="section" id="section21">
        <h2>21. Creating Cryptocurrency</h2>
        <p>• Encrypting wallet keys to protect cryptocurrency.<br>
        • Securing transactions within cryptocurrency systems.<br>
        • Protecting user identities in cryptocurrency trading.</p>
    </div>
    <div class="section" id="section22">
        <h2>22. Secure Electronic Voting System</h2>
        <p>• Encrypting voting data to ensure integrity and security.<br>
        • Protecting voter identities and choices.<br>
        • Securing communications within electronic voting systems.</p>
    </div>
    <div class="section" id="section23">
        <h2>23. Decentralized Cloud Computing</h2>
        <p>• Encrypting data within decentralized cloud systems.<br>
        • Protecting user data in decentralized networks.<br>
        • Securing transactions and communications in cloud platforms.</p>
    </div>
    <div class="section" id="section24">
        <h2>24. Securing Decentralized Digital Trade Platforms (DeFi)</h2>
        <p>• Encrypting transactions within decentralized finance systems.<br>
        • Protecting user identities and financial information.<br>
        • Securing smart contracts and transactions.</p>
    </div>
    <div class="section" id="section25">
        <h2>25. Digital Rights Management (DRM)</h2>
        <p>• Encrypting digital content to protect intellectual property rights.<br>
        • Securing licensing and access controls.<br>
        • Protecting copyrighted material.</p>
    </div>
    <div class="section" id="section26">
        <h2>26. Securing Financial Systems for Major Corporations</h2>
        <p>• Encrypting data within corporate finance systems.<br>
        • Protecting sensitive financial information from breaches.<br>
        • Securing transactions and communications between financial systems.</p>
    </div>
    <div class="section" id="section27">
        <h2>27. Advanced IoT Systems</h2>
        <p>• Encrypting data exchanged between advanced IoT devices.<br>
        • Protecting smart city infrastructure.<br>
        • Securing communications between smart systems.</p>
    </div>
    <div class="section" id="section28">
        <h2>28. Next-Generation Digital Infrastructure Systems (5G)</h2>
        <p>• Encrypting data within 5G networks.<br>
        • Protecting communications and transactions in real-time.<br>
        • Securing connections between devices and networks.</p>
    </div>
    <div class="section" id="section29">
        <h2>29. Managing Sensitive Documents for Multinational Corporations</h2>
        <p>• Encrypting sensitive documents and files.<br>
        • Protecting internal communications and transactions.<br>
        • Securing collaborations between multinational teams.</p>
    </div>
    <div class="section" id="section30">
        <h2>30. Data Transfer Between Drones</h2>
        <p>• Encrypting data exchanged between drones and control systems.<br>
        • Protecting data collected during drone flights.<br>
        • Securing communications between multiple drones.</p>
    </div>
    <div class="section" id="section31">
        <h2>31. Securing Military Communications</h2>
        <p>• Encrypting military data and communications.<br>
        • Protecting sensitive military information from breaches.<br>
        • Securing connections between military systems.</p>
    </div>
    <div class="section" id="section32">
        <h2>32. Protecting Government Networks</h2>
        <p>• Encrypting data within government networks.<br>
        • Protecting sensitive information from cyberattacks.<br>
        • Securing communications between government agencies.</p>
    </div>
    <div class="section" id="section33">
        <h2>33. Weapons Management Systems</h2>
        <p>• Encrypting data exchanged within weapons systems.<br>
        • Protecting sensitive military data.<br>
        • Securing communications related to military operations.</p>
</div>
    <div class="section" id="section34">
        <h2>34. Protecting Data in Travel</h2>
        <p>• Encrypting travel documents and itineraries.<br>
        • Protecting sensitive information shared during travel.<br>
        • Securing communications related to travel arrangements.</p>
    </div>
<p>
    <strong>Tughra</strong> is a developing system that relies on multiple factors that make the decryption process extremely difficult if the person does not have the used fields (character and symbol set) and the number of cycles (frequency). Let’s illustrate the complexity of the decryption process:
</p>
<ol>
    <li>
        <strong>Fields (Character Set):</strong>
        <ul>
            <li>
                If you have about 144,300 characters or symbols, and you are using a random set of these characters to encrypt the text, this adds significant complexity. Each character in the original text could be replaced by a variety of substitutes, making it very difficult to reconstruct the original text without knowing the fields exactly.
            </li>
        </ul>
    </li>
    <li>
        <strong>Number of Cycles (Frequency):</strong>
        <ul>
            <li>
                Adding a non-fixed number of cycles greatly increases the complexity of the encryption. If the encryption is done for a random number of cycles, hackers will have countless attempts to determine the correct number of cycles.
            </li>
        </ul>
    </li>
    <li>
        <strong>Brute Force Attack:</strong>
        <ul>
            <li>
                Theoretically, any encryption system can be subjected to a brute force attack (trying all possible combinations). However, considering the large number of fields and variable cycles, attempting all combinations would take an enormous amount of time. The more fields and cycles increase, the more the difficulty multiplies significantly.
            </li>
        </ul>
    </li>
    <li>
        <strong>Complexity of Calculations:</strong>
        <ul>
            <li>
                Assuming you have an unlimited number of fields and an unlimited number of cycles, the number of possible decryption combinations would be so huge that no modern computer system could handle it in a reasonable time frame. Additionally, if these fields are unknown, the hacker won’t be able to make any logical attempts to decrypt, making the process akin to finding a needle in a haystack.
            </li>
        </ul>
    </li>
</ol>
<h2>Expected Time for Decryption:</h2>
<p>
    If a hacker programs an automated code to attempt decryption using a brute force attack, the time required depends on several factors, including:
</p>
<ul>
    <li>The power of the computers used by the hacker.</li>
    <li>The number of fields used.</li>
    <li>The number of cycles.</li>
    <li>The strength of the random algorithm used to determine the alternative fields.</li>
</ul>
<p>
    The larger the number of fields and cycles, the exponentially greater the time required. With large numbers of fields and cycles, the decryption process could reach billions or even trillions of attempts, which means it could take thousands of years or more, depending on the available computing power.
</p>
  <h2>Conclusion</h2>
  <p>The Tughra library provides a robust encryption solution for text and files, ideal for data security and cryptographic exploration. Without knowing the fields exactly and the number of cycles, decryption using an automated attack would be nearly impossible within a reasonable timeframe.</p>
</div>
<div class="footer">
  <p>For more information, visit the <a href="https://github.com/Mohanadhatip/TUGHRA/" target="_blank">Tughra GitHub page</a>.</p>
</div>