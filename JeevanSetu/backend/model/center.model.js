import mongoose from "mongoose";

const centreSchema = new mongoose.Schema({
  centreName: { type: String, required: true },
  managerName: { type: String, required: true },
  centreAddress: { type: String, required: true },
  centreCity: { type: String, required: true },
  centreDistrict: { type: String, required: true },
  centreState: { type: String, required: true },
  centrePincode: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  maxCapacity: { type: Number, default: 100 },
  currentOccupancy: { type: Number, default: 0 },
}, { timestamps: true });

export const Centre = mongoose.model("Centre", centreSchema);

const inventorySchema = new mongoose.Schema({
  centre: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantityUnit: { type: String, required: true, enum: ['kg', 'liters', 'units'] }, 
  minimumThreshold: { type: Number, default: 0 }, 
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export const Inventory = mongoose.model("Inventory", inventorySchema);


const inventoryTransactionSchema = new mongoose.Schema({
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
  centre: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true },
  type: { type: String, enum: ["INCREASE", "CONSUME"], required: true },
  quantity: { type: Number, required: true },
  note: { type: String },
}, { timestamps: true });

export const InventoryTransaction = mongoose.model("InventoryTransaction",inventoryTransactionSchema);