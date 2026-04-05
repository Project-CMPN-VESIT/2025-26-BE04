// import { Donation } from "../model/donation.model.js";
// import { Fundraiser } from "../model/donation.model.js";
// import { generateMarkdownReport } from "./geminiService.js";
// import { Centre } from "../model/center.model.js";
// import { Children } from "../model/children.model.js";

// export const generateYearlyReport = async (year) => {
//   const startDate = new Date(`${year}-01-01`);
//   const endDate = new Date(`${year}-12-31`);

//   // =============================
//   // 1️⃣ Donations Summary
//   // =============================
//   const donationData = await Donation.aggregate([
//     {
//       $match: {
//         paymentDate: { $gte: startDate, $lte: endDate }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$amount" },
//         donationCount: { $sum: 1 }
//       }
//     }
//   ]);

//   const totalAmount = donationData[0]?.totalAmount || 0;
//   const donationCount = donationData[0]?.donationCount || 0;

//   const razorpayFee = totalAmount * 0.02;
//   const gstOnFee = razorpayFee * 0.18;
//   const totalGatewayDeduction = razorpayFee + gstOnFee;
//   const netAmountReceived = totalAmount - totalGatewayDeduction;

//   const averageDonation =
//     donationCount > 0 ? totalAmount / donationCount : 0;

//   const monthlyAverageDonation = totalAmount / 12;

//   const platformFeePercentage =
//     totalAmount > 0
//       ? ((totalGatewayDeduction / totalAmount) * 100).toFixed(2)
//       : 0;

//   // =============================
//   // 2️⃣ Children Statistics
//   // =============================

//   const totalChildren = await Children.countDocuments();

//   const childrenJoined = await Children.countDocuments({
//     dateofjoining: { $gte: startDate, $lte: endDate }
//   });

//   const childrenLeft = await Children.countDocuments({
//     dateofleaving: { $gte: startDate, $lte: endDate }
//   });

//   const activeChildren = await Children.countDocuments({
//     $or: [
//       { dateofleaving: null },
//       { dateofleaving: { $gt: endDate } }
//     ]
//   });

//   const growthRate =
//     totalChildren > 0
//       ? ((childrenJoined / totalChildren) * 100).toFixed(2)
//       : 0;

//   const retentionRate =
//     totalChildren > 0
//       ? (((totalChildren - childrenLeft) / totalChildren) * 100).toFixed(2)
//       : 0;

//   const attritionRate =
//     totalChildren > 0
//       ? ((childrenLeft / totalChildren) * 100).toFixed(2)
//       : 0;

//   // =============================
//   // 3️⃣ Centre Statistics
//   // =============================

//   const centres = await Centre.find();

//   const totalCentres = centres.length;

//   let totalCapacity = 0;
//   let totalOccupancy = 0;

//   centres.forEach((centre) => {
//     totalCapacity += centre.maxCapacity;
//     totalOccupancy += centre.currentOccupancy;
//   });

//   const occupancyRate =
//     totalCapacity > 0
//       ? ((totalOccupancy / totalCapacity) * 100).toFixed(2)
//       : 0;

//   const avgOccupancyPerCentre =
//     totalCentres > 0
//       ? (totalOccupancy / totalCentres).toFixed(2)
//       : 0;

//   const capacityUtilization = occupancyRate;

//   // =============================
//   // 4️⃣ Fundraiser Summary
//   // =============================

//   const fundraiserData = await Fundraiser.aggregate([
//     {
//       $group: {
//         _id: null,
//         totalRaised: { $sum: "$amountRaised" }
//       }
//     }
//   ]);

//   const totalFundraiserRaised =
//     fundraiserData[0]?.totalRaised || 0;

//   const totalFundsCombined =
//     totalFundraiserRaised + totalAmount;

//   const fundraiserContributionRatio =
//     totalFundsCombined > 0
//       ? ((totalFundraiserRaised / totalFundsCombined) * 100).toFixed(2)
//       : 0;

//   // =============================
//   // Final Structured Report Data
//   // =============================

//   const reportData = {
//     year,
//     financials: {
//       totalDonations: totalAmount,
//       donationCount,
//       averageDonation,
//       monthlyAverageDonation,
//       razorpayFee,
//       gstOnFee,
//       totalGatewayDeduction,
//       platformFeePercentage,
//       netAmountReceived
//     },
//     childrenStats: {
//       totalChildren,
//       childrenJoined,
//       childrenLeft,
//       activeChildren,
//       growthRate,
//       retentionRate,
//       attritionRate
//     },
//     centreStats: {
//       totalCentres,
//       totalCapacity,
//       totalOccupancy,
//       occupancyRate,
//       avgOccupancyPerCentre,
//       capacityUtilization
//     },
//     fundraiserStats: {
//       totalFundraiserRaised,
//       totalFundsCombined,
//       fundraiserContributionRatio
//     }
//   };

//   const markdown = await generateMarkdownReport(reportData);

//   return {
//     markdown,
//     rawData: reportData
//   };
// };