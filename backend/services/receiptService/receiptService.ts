import fs from "fs";
import path from "path";
import "pdfkit";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import { ToWords } from "to-words";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Donation {
  id: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
  pan: string;
  dob: string;
  amount: number;
  // amountInWords: string;
  paymentMode: string;
  date: string;
}

function generateDonationInvoice(donation: Donation, filePath: string): void {
  const doc = new PDFDocument({ margin: 50 });

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
    },
  });

  toWords.convert(5000);

  const fontsPath = path.join(__dirname, "fonts");

  doc.registerFont("Noto-Black", path.join(fontsPath, "NotoSans-Black.ttf"));
  doc.registerFont("Noto-Bold", path.join(fontsPath, "NotoSans-Bold.ttf"));
  doc.registerFont(
    "Noto-SemiBold",
    path.join(fontsPath, "NotoSans-SemiBold.ttf"),
  );
  doc.registerFont("Noto-Medium", path.join(fontsPath, "NotoSans-Medium.ttf"));
  doc.registerFont(
    "Noto-Regular",
    path.join(fontsPath, "NotoSans-Regular.ttf"),
  );

  doc.pipe(fs.createWriteStream(filePath));

  /* -------------------- HEADER -------------------- */

  const logoPath = path.join(__dirname, "logo.png");
  doc.image(logoPath, 50, 40, { width: 150 });

  doc
    .fontSize(22)
    .font("Noto-Black")
    .fillColor("#181d43")
    .text("Jeevan Samvardhan Foundation", 190, 50);

  doc
    .fontSize(10)
    .font("Noto-Regular")
    .text(
      "Reg.No.-Trust Reg.No.F/34872/Thane, Society Reg.No. MH/543/17/Thane",
      { align: "center" },
    )
    .text("B-101, Chandrabhaga Phase 2, Kolivali Road, Kalyan West - 421301.", {
      align: "center",
    });

  doc
    .fontSize(11)
    .font("Noto-SemiBold")
    .text("Contact: 7506927704, 8928400402", { align: "center" })
    .moveDown(2);

  doc.moveTo(50, 140).lineTo(550, 140).stroke();

  const receiptText = "RECEIPT";
  const receiptWidth = doc.widthOfString(receiptText);

  doc
    .fontSize(15)
    .font("Noto-Bold")
    .text(receiptText, (doc.page.width - receiptWidth) / 2, 150);

  doc.fontSize(11).font("Noto-Regular").text(`Date: ${donation.date}`, 50, 175);

  doc.text(`Receipt No.: ${donation.id}`, 50, 175, {
    width: doc.page.width - 100,
    align: "right",
  });

  let y = 220;

  const addField = (
    label: string,
    value: string,
    config?: {
      extra_padding?: number;
      custom_font?: string;
    },
  ): void => {
    doc.font("Noto-SemiBold").text(label, 50, y);
    doc.font(config?.custom_font ?? "Noto-Regular").text(value || "-", 200, y);
    y += 25 + (config?.extra_padding ?? 0);
  };

  addField("Name:", donation.name);
  addField("Address:", donation.address, { extra_padding: 10 });
  addField("Mobile:", donation.mobile);
  addField("Email:", donation.email);
  addField("PAN:", donation.pan);
  addField("DOB:", donation.dob);
  addField("Amount:", `₹ ${donation.amount}`, {
    custom_font: "Noto-Bold",
  });

  const amountInWords = "Rupees " + toWords.convert(donation.amount);

  addField("Amount in Words:", amountInWords, {
    custom_font: "Noto-Bold",
  });
  addField("By:", donation.paymentMode);

  y += 20;

  doc
    .font("Noto-Regular")
    .fontSize(11)
    .text("For", 50, y)
    .text("Jeevan Samvardhan Foundation");

  y += 75;

  doc.text("Auth. Sign.", 50, y);
  y += 20;
  doc.moveTo(50, y).lineTo(550, y).stroke();

  y += 15;

  doc
    .font("Noto-Regular")
    .fontSize(11)
    .text(
      'ध्येय: "सामाजिक समस्यांनी ग्रस्त असलेल्या मुलांचे पुनर्वसन करण्यासाठी समाजाच्या तिरस्कृतांसाठी सुदृढ समाजघडणीची पुनर्रचना निर्माण करणे"',
      50,
      y,
      { width: 500 },
    );

  doc
    .font("Noto-Medium")
    .moveDown(0.5)
    .text(
      "Donation exempted u/s 80G of Income Tax Act 1961 - 80G/URN/AADAJ0363R23PN02",
    );

  const margin = 5;
  const borderWidth = 10;

  doc
    .lineWidth(borderWidth)
    .rect(
      margin,
      margin,
      doc.page.width - margin * 2,
      doc.page.height - margin * 2,
    )
    .stroke("#181d43");

  doc.end();
}

export default generateDonationInvoice;

/* -------------------- TEST DUMMY -------------------- */

// const dummyDonation: Donation = {
//   id: "DON-2026-0001",
//   name: "Rohan Mehta",
//   address:
//     "Flat 302, Shanti Heights, MG Road, Andheri East, Mumbai, Maharashtra - 400069",
//   mobile: "+91 9876543210",
//   email: "rohan.mehta@example.com",
//   pan: "ABCDE1234F",
//   dob: "15-08-1995",
//   amount: 5000,
//   amountInWords: "Rupees Five Thousand Only",
//   paymentMode: "Online Transfer",
//   date: "03-03-2026",
// };

// generateDonationInvoice(dummyDonation, "./donation.pdf");
