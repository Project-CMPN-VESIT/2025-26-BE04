import mongoose from "mongoose";
import { Centre, Inventory, InventoryTransaction } from "../model/center.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

//random llm service
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeInventoryWithGemini = async (inventoryData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an inventory management AI assistant.

    Analyze the following inventory data and provide:
    1. Which items are low in stock
    2. Estimated days remaining for each item
    3. How much stock should be added to survive till end of month
    4. Keep response short and structured

    Inventory Data:
    ${JSON.stringify(inventoryData, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const registerCentre = async(req,res) => {
    try {
    const { centreName, managerName, centreAddress, centreCity, centreDistrict, centreState, centrePincode, contactNumber, email, maxCapacity} = req.body;

    if ( !centreName || !managerName || !centreAddress || !centreCity || !centreDistrict || !centreState || !centrePincode || !contactNumber || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCentre = await Centre.findOne({ centrePincode });
    if (existingCentre) {
        return res.status(400).json({
        message: "Centre with this pincode already exists",
        });
    }

    const centre = await Centre.create({
        centreName,
        managerName,
        centreAddress,
        centreCity,
        centreDistrict,
        centreState,
        centrePincode,
        contactNumber,
        email,
        maxCapacity,
    });

    return res.status(201).json({
        message: "Centre registered successfully",
        centre,
    });
    } catch (error) {
    return res.status(500).json({
        message: "Centre registration failed",
        error: error.message,
        });
    }
}

const updateCentre = async(req,res) => {
    try {
    const { id } = req.params;

    const updatedCentre = await Centre.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedCentre) {
        return res.status(404).json({ message: "Centre not found" });
    }

    return res.status(200).json({
        message: "Centre updated successfully",
        centre: updatedCentre,
        });
    } catch (error) {
    return res.status(500).json({
        message: "Failed to update centre",
        error: error.message,
        });
    }
}

const getCentreDetails = async(req,res) => {
    try {
        const centers = await Centre.find();

    res.status(200).json({
        success: true,
        count: centers.length,
        data: centers,
    });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Failed to fetch center details",
        error: error.message,
        });
    }
}

const deleteCentre = async (req, res) => {
  try {
    const { id } = req.params;

    const centre = await Centre.findByIdAndDelete(id);

    if (!centre) {
        return res.status(404).json({
        message: "Centre not found",
        });
    }

    return res.status(200).json({
        message: "Centre deleted successfully",
    });
    } catch (error) {
    return res.status(500).json({
        message: "Failed to delete centre",
        error: error.message,
        });
    }
};

const addInventory = async (req, res) => {
  try {
    const { centreId, itemName, quantity, quantityUnit, minimumThreshold } = req.body;

    const centre = await Centre.findById(centreId);
    if (!centre) return res.status(404).json({ message: "Centre not found" });

    const newInventory = await Inventory.create({
      centre: centreId,
      itemName: itemName.toLowerCase(),
      quantity,
      quantityUnit,
      minimumThreshold
    });

    await InventoryTransaction.create({
      inventory: newInventory._id,
      centre: centreId,
      type: "INCREASE",
      quantity,
      note: "Initial stock added"
    });

    res.status(201).json({ success: true, data: newInventory });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const increaseInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, note } = req.body;

    const item = await Inventory.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += quantity;
    item.lastUpdated = new Date();
    await item.save();

    await InventoryTransaction.create({
      inventory: item._id,
      centre: item.centre,
      type: "INCREASE",
      quantity,
      note: note || "Stock replenished"
    });

    res.json({ success: true, data: item });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const consumeInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, note } = req.body;

    const item = await Inventory.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    item.quantity -= quantity;
    item.lastUpdated = new Date();
    await item.save();

    await InventoryTransaction.create({
      inventory: item._id,
      centre: item.centre,
      type: "CONSUME",
      quantity,
      note: note || "Stock consumed"
    });

    res.json({
      success: true,
      data: item,
      lowStock: item.quantity <= item.minimumThreshold
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInventory = async (req, res) => {
    try {
        const {id} = req.params;
        const inventoryItem = await Inventory.findByIdAndDelete(id);

        if (!inventoryItem) {
            return res.status(404).json({
                success: false,
                message: "Inventory item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Inventory item deleted successfully",
        });
    } catch (error) {
        console.log("Error deleteing inventory:", error);
        res.status(500).json({message: "Failed to delete the inventory for a item",error: error.message});
    }
}

const getInventory = async (req, res) => {
    try {
        const { centreId } = req.params;
        const centre = await Centre.findById(centreId);

        if (!centre) {
            return res.status(404).json({
                success: false,
                message: "Centre not found",
            });
        }

        const inventoryItems = await Inventory.find({ centre: centreId });

        res.status(200).json({
            success: true,
            count: inventoryItems.length,
            data: inventoryItems,
        });
    } catch (error) {
        console.log("Error fetching inventory:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch inventory",
            error: error.message,
        });
    }
}


const getInventoryAnalysis = async (req, res) => {
      try {
    const { centreId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(centreId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid centreId",
      });
    }

    // Get all inventory items of this centre
    const inventoryItems = await Inventory.find({ centre: centreId });

    if (!inventoryItems.length) {
      return res.status(404).json({
        success: false,
        message: "No inventory found for this centre",
      });
    }

    // Get last 30 days transactions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await InventoryTransaction.find({
      centre: centreId,
      type: "CONSUME",
      createdAt: { $gte: thirtyDaysAgo },
    });

    const analysisData = [];

    for (let item of inventoryItems) {
      // Filter transactions for this specific inventory item
      const itemTransactions = transactions.filter(
        (txn) => txn.inventory.toString() === item._id.toString()
      );

      const totalConsumed = itemTransactions.reduce(
        (sum, txn) => sum + txn.quantity,
        0
      );

      const daysTracked = 30;
      const avgDailyUsage =
        totalConsumed > 0 ? totalConsumed / daysTracked : 0;

      const daysRemaining =
        avgDailyUsage > 0
          ? (item.quantity / avgDailyUsage).toFixed(1)
          : "Insufficient data";

      analysisData.push({
        itemName: item.itemName,
        currentStock: item.quantity,
        unit: item.quantityUnit,
        totalConsumedLast30Days: totalConsumed,
        avgDailyUsage: avgDailyUsage.toFixed(2),
        daysRemaining,
      });
    }

    // Send to Gemini for smart summary
    const geminiResponse = await analyzeInventoryWithGemini(analysisData);

    return res.status(200).json({
      success: true,
      aiSummary: geminiResponse,
      rawData: analysisData,
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze inventory",
      error: error.message,
    });
  }
}


export {registerCentre, updateCentre, getCentreDetails, deleteCentre, addInventory, increaseInventory, getInventoryAnalysis,consumeInventory, getInventory, deleteInventory};