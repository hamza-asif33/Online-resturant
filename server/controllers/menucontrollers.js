import Menu from "../models/menu.js";

export const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json({ items: items || [] });  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const addMenuItem = async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteMenuItem = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
