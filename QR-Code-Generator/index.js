import inquirer from 'inquirer';
import qr from 'qr-image'; // Import the qr-image package
import fs from "fs";

const questions = [
  {
    type: 'input',
    name: 'URL',
    message: "Enter your URL",
  }
];

inquirer.prompt(questions).then((answers) => {
  const url = answers.URL;

  // Generate a QR code image
  const qrCode = qr.image(url, { type: 'png' }); // You can choose the format you want

  // Save the QR code image to a file
  qrCode.pipe(fs.createWriteStream('qrcode.png'));

  console.log("QR code generated successfully!");
});
