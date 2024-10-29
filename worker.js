// worker.js
importScripts('tughra.js'); // Import your Tughra library here if necessary

self.onmessage = function(e) {
const { text, cycles, baseCharset, mode, useBaseEncoding, algorithm, encryptionKey } = e.data;

try {
// Initialize the Tughra object
const tughra = new Tughra(mode, baseCharset, algorithm, encryptionKey, useBaseEncoding);

// Process the text
const resultText = tughra.process(text, cycles);

// Send the result back to the main thread
self.postMessage({ result: resultText, error: null });
} catch (error) {
// Send any errors back to the main thread
self.postMessage({ result: null, error: error.message });
}
};
