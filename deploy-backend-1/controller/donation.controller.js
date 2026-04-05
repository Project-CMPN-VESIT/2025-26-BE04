import { Donation, Fundraiser } from "../model/donation.model.js";
import { createHmac } from "node:crypto";
import Razorpay from "razorpay";
import Web3 from "web3";
import nodemailer from "nodemailer";
import path from "path";
import os from "os";
import generateDonationInvoice from "../services/receiptService/receiptService.ts";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const ENABLE_REMOTE_BLOCKCHAIN_FLAG = process.env.ENABLE_REMOTE_BLOCKCHAIN_FLAG;
// const BLOCKCHAIN_PRIVATE_KEY = ENABLE_REMOTE_BLOCKCHAIN_FLAG
//   ? process.env.BLOCKCHAIN_PRIVATE_KEY
//   : process.env.FALLBACK_BLOCKCHAIN_PRIVATE_KEY;
// const BLOCKCHAIN_ACCOUNT = ENABLE_REMOTE_BLOCKCHAIN_FLAG
//   ? process.env.BLOCKCHAIN_ACCOUNT
//   : process.env.FALLBACK_BLOCKCHAIN_ACCOUNT;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay works in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// class BlockchainService {
//   constructor() {
//     this.web3 = new Web3(
//       new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL),
//     );
//   }

//   async getAccounts() {
//     try {
//       const accounts = await this.web3.eth.getAccounts();
//       return accounts;
//     } catch (error) {
//       throw new Error("Error fetching accounts: " + error.message);
//     }
//   }

//   async signTransaction(fromAddress, toAddress, data) {
//     try {
//       const gasPrice = await this.web3.eth.getGasPrice();
//       const gasLimit = await this.web3.eth.estimateGas({
//         from: fromAddress,
//         to: toAddress,
//         value: "0x0",
//         data: data,
//       });

//       const nonce = await this.web3.eth.getTransactionCount(fromAddress);

//       const txObject = {
//         nonce: this.web3.utils.toHex(nonce),
//         to: toAddress,
//         value: "0x0",
//         gasLimit: this.web3.utils.toHex(gasLimit),
//         gasPrice: this.web3.utils.toHex(gasPrice),
//         data: data,
//       };

//       const dataHash = await this.web3.utils.sha3(JSON.stringify(data));

//       const privateKey = BLOCKCHAIN_PRIVATE_KEY;
//       const signedTx = await this.web3.eth.accounts.signTransaction(
//         txObject,
//         privateKey,
//       );
//       const receipt = await this.web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//       );
//       console.log(receipt);

//       return {
//         transactionHash: receipt.transactionHash,
//         blockNumber: receipt.blockHash,
//         dataHash: dataHash,
//       };
//     } catch (error) {
//       throw new Error("Error signing transaction: " + error.message);
//     }
//   }
// }

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    mobileNo,
    amount,
    address,
    panNumber,
    dateOFBirth,
    fundraiserId,
  } = req.body;

  try {
    const generate_signature = createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET,
    )
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log(generate_signature);

    if (generate_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    // const blockchainService = new BlockchainService();
    // const accounts = await blockchainService.getAccounts();
    // const fromAddress = accounts[0];

    const donationCount = await Donation.countDocuments();
    const serialNumber = donationCount + 1;
    // const donationData = blockchainService.web3.utils.asciiToHex(
    //   JSON.stringify({
    //     serialNumber,
    //     paymentId: razorpay_payment_id,
    //     name,
    //     email,
    //     mobileNo,
    //     amount,
    //     address,
    //     panNumber,
    //     dateOFBirth,
    //   }),
    // );

    // const blockchainReceipt = await blockchainService.signTransaction(
    //   fromAddress,
    //   BLOCKCHAIN_ACCOUNT,
    //   donationData,
    // );

    const fundraiser = await Fundraiser.findById(fundraiserId);

    if (fundraiser.isFixedAmount && Number(amount) !== fundraiser.fixedAmount) {
      return res.status(400).json({
        success: false,
        message: "Amount tampering detected",
      });
    }

    const newDonation = await Donation.create({
      serialNumber,
      paymentId: razorpay_payment_id,
      name,
      email,
      mobileNo,
      amount,
      blockchain: {
        transactionHash: null,
        blockNumber: null,
        dataHash: null,
      },
      address,
      panNumber,
      dateOFBirth,
    });

    if (fundraiserId) {
      const fundraiser = await Fundraiser.findById(fundraiserId);
      const updatedAmount = fundraiser.amountRaised + Number(amount);
      const newResponse = await Fundraiser.findByIdAndUpdate(
        fundraiserId,
        { amountRaised: updatedAmount },
        { new: true },
      );
      if (!fundraiser || !newResponse) {
        return res
          .status(404)
          .json({ success: false, message: "Fundraiser not found" });
      }
      fundraiser.donations.push(newDonation._id);
      await fundraiser.save();
    }

    await newDonation.save();
    console.log(newDonation);

    const invoicePath = path.join(
      os.tmpdir(),
      `donation-receipt-${newDonation.serialNumber}.pdf`,
    );

    const formattedDOB = new Date(newDonation.dateOFBirth).toLocaleDateString(
      "en-GB",
    );

    generateDonationInvoice(
      {
        id: newDonation.paymentId.toString(),
        name: newDonation.name,
        address: newDonation.address,
        mobile: newDonation.mobileNo,
        email: newDonation.email,
        pan: newDonation.panNumber,
        dob: formattedDOB,
        amount: newDonation.amount,
        paymentMode: "Online Transfer",
        date: new Date().toLocaleDateString("en-IN"),
      },
      invoicePath,
    );

    const mailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Donation Confirmation - Jeevan Samvardhan Foundation",
      html: `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        </style>
      </head>
      <body>
        <div style="font-family: 'Outfit', sans-serif; line-height: 1.6;">
          <h2 style="color: #0e926b;">Thank You for Your Donation To <span style="font-weight: 700; color: #fca00c">Jeevan Samvardhan Foundation<span>!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>We have successfully received your donation. Below are your transaction details:</p>
          <ul>
            <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
            <li><strong>Amount:</strong> ₹${amount}</li>
            
            <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>Your contribution helps us continue our mission to support underprivileged children and communities.</p>
          <p>Warm regards, <br>
          <strong>Jeevan Samvardhan Foundation</strong>
          </p>
          <img src="https://www.jeevansamvardhan.org/images/my-images/logo3.png" width="150">
        </div>
      </body>
    </html>
  `,
      attachments: [
        {
          filename: `donation-invoice-${newDonation.paymentId}.pdf`,
          path: invoicePath,
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      newDonation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// const generateFundraiserInsights = async(reportData) => {
//   // const model = genAI.getGenerativeModel({
//   // model: "gemini-2.5-flash",
//   // generationConfig: {
//   //   temperature: 0.3
//   // }});

// const prompt = `
// Generate a very concise Fundraiser Performance Report in Markdown.

// STRICT RULES:
// - Maximum 250 words total
// - No introduction paragraph
// - No recommendations
// - No conclusion
// - No long explanations
// - No repeated data
// - No emojis inside paragraphs
// - No emojis only in section headings
// - Keep everything compact and website-friendly
// - Use short bullet points (max 5 per section)
// - If using tables, max 4 rows only

// DATA:
// ${JSON.stringify(reportData, null, 2)}

// OUTPUT STRUCTURE ONLY:

// # 🎯 Fundraiser Performance Report

// ## 💰 Financial Summary
// - Bullet insights only
// - If needed, include one small table

// ## 📊 Donation Statistics
// - Bullet insights only

// ## 🏆 Top Donor
// - 1–2 short lines only

// ## 📈 Key Observations
// - 3–4 short bullet points

// Do NOT add any other section.
// Do NOT exceed 250 words.
// Keep it clean and minimal.
// `;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;

//   return response.text();
// }

const getDonations = async (req, res) => {
const { fundraiserId } = req.params;

  try {
    if (!fundraiserId) {
      return res.status(400).json({
        success: false,
        message: "Fundraiser ID is required",
      });
    }

    const fundraiser = await Fundraiser.findById(fundraiserId)
      .populate("donations");

    if (!fundraiser) {
      return res.status(404).json({
        success: false,
        message: "Fundraiser not found",
      });
    }

    const donations = fundraiser.donations || [];

    /* =====================================================
       📊 Calculations
    ===================================================== */

    const donationCount = donations.length;

    const totalAmount = donations.reduce(
      (sum, d) => sum + (d.amount || 0),
      0
    );

    const averageDonation =
      donationCount > 0 ? totalAmount / donationCount : 0;

    const highestDonation =
      donationCount > 0
        ? Math.max(...donations.map((d) => d.amount))
        : 0;

    const lowestDonation =
      donationCount > 0
        ? Math.min(...donations.map((d) => d.amount))
        : 0;

    /* =====================================================
       📅 Monthly Average
    ===================================================== */

    const fundraiserCreated = fundraiser.createdAt;
    const now = new Date();

    const monthsRunning =
      (now.getFullYear() - fundraiserCreated.getFullYear()) * 12 +
      (now.getMonth() - fundraiserCreated.getMonth()) + 1;

    const monthlyAverageDonation =
      monthsRunning > 0 ? totalAmount / monthsRunning : 0;

    /* =====================================================
       💳 Gateway Calculations
    ===================================================== */

    const razorpayFee = totalAmount * 0.02;
    const gstOnFee = razorpayFee * 0.18;
    const totalGatewayDeduction = razorpayFee + gstOnFee;
    const netAmountReceived = totalAmount - totalGatewayDeduction;
    const platformFeePercentage =
      totalAmount > 0
        ? ((totalGatewayDeduction / totalAmount) * 100).toFixed(2)
        : 0;

    /* =====================================================
       🏆 Top Donor
    ===================================================== */

    const donorMap = {};

    donations.forEach((d) => {
      const name = d.name || "Anonymous";
      donorMap[name] = (donorMap[name] || 0) + d.amount;
    });

    let topDonorName = null;
    let topDonorAmount = 0;

    Object.entries(donorMap).forEach(([name, amount]) => {
      if (amount > topDonorAmount) {
        topDonorAmount = amount;
        topDonorName = name;
      }
    });

    /* =====================================================
       📦 Raw Data Object
    ===================================================== */

    const rawData = {
      fundraiserTitle: fundraiser.title,
      goalAmount: fundraiser.goalAmount,
      totalDonations: totalAmount,
      donationCount,
      averageDonation,
      monthlyAverageDonation,
      razorpayFee,
      gstOnFee,
      totalGatewayDeduction,
      platformFeePercentage,
      netAmountReceived,
      highestDonation,
      lowestDonation,
      topDonorName,
      topDonorAmount
    };

    /* =====================================================
       🤖 Generate AI Markdown
    ===================================================== */

    // const markdown = await generateFundraiserInsights(rawData);

    /* =====================================================
       📤 Response
    ===================================================== */

    const { donations: _, ...fundraiserDetails } = fundraiser.toObject();

    return res.status(200).json({
      success: true,
      fundraiser: fundraiserDetails,
      donations,
      markdown: // const markdown = await generateFundraiserInsights(rawData);
      rawData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createFundraiser = async (req, res) => {
  try {
    const {
      name,
      description,
      logo,
      hasGoal,
      goal,
      isFixedAmount,
      fixedAmount,
    } = req.body;

    if (isFixedAmount && !fixedAmount) {
      return res.status(400).json({
        success: false,
        message: "Fixed amount is required",
      });
    }

    // Check mandatory fields
    if (!name || !description || !logo) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and logo are required",
      });
    }

    // If hasGoal is true, goal must be provided and valid
    if (hasGoal && (goal === undefined || goal === null)) {
      return res.status(400).json({
        success: false,
        message: "Goal amount is required when hasGoal is true",
      });
    }

    // Create fundraiser with conditional goal handling
    const fundraiser = await Fundraiser.create({
      name,
      description,
      logo,
      hasGoal,
      goal: hasGoal ? goal : Number.MAX_SAFE_INTEGER,
      isFixedAmount,
      fixedAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Fundraiser created successfully",
      fundraiser,
    });
  } catch (error) {
    console.error("Error creating fundraiser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteFundraiser = async (req, res) => {
  const { fundraiserId } = req.params;
  try {
    const fundraiser = await Fundraiser.findById(fundraiserId);
    if (!fundraiser) {
      return res
        .status(404)
        .json({ success: false, message: "Fundraiser not found" });
    }
    await Donation.deleteMany({ _id: { $in: fundraiser.donations } });
    await Fundraiser.findByIdAndDelete(fundraiserId);
    return res.status(200).json({
      success: true,
      message: "Fundraiser and associated donations deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getFundraisers = async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find();
    res.status(200).json({ success: true, fundraisers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getFundraisersAnalytics = async (req, res) => {};

export {
  createFundraiser,
  deleteFundraiser,
  getFundraisers,
  createOrder,
  verifyPayment,
  getDonations,
  getFundraisersAnalytics,
};
