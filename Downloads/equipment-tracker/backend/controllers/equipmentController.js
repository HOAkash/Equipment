import Equipment from "../models/Equipment.js";

export const getEquipment = async (req, res) => {
  const data = await Equipment.find();
  res.json(data);
};

export const addEquipment = async (req, res) => {
  const equipment = new Equipment(req.body);
  const saved = await equipment.save();
  res.status(201).json(saved);
};

export const updateEquipment = async (req, res) => {
  const updated = await Equipment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteEquipment = async (req, res) => {
  await Equipment.findByIdAndDelete(req.params.id);
  res.json({ message: "Equipment deleted" });
};
