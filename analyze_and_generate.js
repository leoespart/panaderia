
import { Jimp } from "jimp";
import QRCode from 'qrcode';
import fs from 'fs';

const imagePath = '/Users/yadie/.gemini/antigravity/brain/d420220e-81fa-446c-a207-01cbec623e05/uploaded_image_1767369666447.png';
const outputPath = '/Users/yadie/.gemini/antigravity/brain/d420220e-81fa-446c-a207-01cbec623e05/qr_code.png';
const websiteUrl = 'https://panaderialafrancesa.com';

async function analyzeAndGenerate() {
    try {
        // Generate QR Code with Transparent Background
        console.log(`Generating QR code for ${websiteUrl} with white color and transparent background...`);

        await QRCode.toFile(outputPath, websiteUrl, {
            color: {
                dark: '#ffffff',      // White for the dots
                light: '#00000000'    // Transparent for the background
            },
            width: 500
        });

        console.log('QR Code generated at:', outputPath);

    } catch (err) {
        console.error('Error:', err);
    }
}

analyzeAndGenerate();
