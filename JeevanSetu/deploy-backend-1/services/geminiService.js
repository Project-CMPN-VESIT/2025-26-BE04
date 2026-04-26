// // services/geminiService.js

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateMarkdownReport = async (reportData) => {
//   const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
//   generationConfig: {
//     temperature: 0.3
//   }
// });

//   const prompt = `
// You are generating an OFFICIAL annual report for an Indian NGO named "Jeevansetu".
// The NGO is based in India and all financial values must be in Indian Rupees (₹).
// Do NOT use dollars.
// Do NOT invent fake names like CEO or placeholders.
// Do NOT add dummy contact information.
// Do NOT exaggerate numbers.
// Use ONLY the data provided below.

// Write in professional but realistic NGO tone.
// Keep it factual and data-driven.
// Avoid generic motivational paragraphs.
// No fictional names.
// No placeholders like [Your NGO Name].

// DATA:
// ${JSON.stringify(reportData, null, 2)}

// Example markdown format:

// # 📘 Jeevansetu Annual Report 2026

// ## 💰 Financial Overview
// - Total Donations: ₹5000
// - Average Donation: ₹5000
// - Monthly Average: ₹416.67
// - Platform Fee %: 2.36%
// - Net Funds Available: ₹4882

// ## 👶 Children Impact
// - Total Supported: 7
// - New Admissions: 2
// - Retention Rate: 100%
// - Growth Rate: 28.57%

// ## 🏢 Centre Performance
// - Total Centres: 2
// - Capacity Utilization: 3.50%
// - Average Occupancy per Centre: 3.5

// ## 📈 Fundraising Performance
// - Total Raised via Fundraisers: ₹5000
// - Combined Total Funds: ₹10000
// - Fundraiser Contribution Ratio: 50%

// ## 🔎 Strategic Insights
// (Generated summary paragraph here)

// ## 🚀 Outlook
// (Forward-looking paragraph)

// Important Rules:
// - Currency must be ₹.
// - Do not convert to dollars.
// - Do not add imaginary data.
// - Do not mention CEO.
// - Do not use placeholders.
// - Do not fabricate anything.
// `;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;

//   return response.text();
// };