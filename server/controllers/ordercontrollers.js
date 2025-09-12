import Order from "../models/order.js";
import Menu from "../models/menu.js";

// Customer: Place a new order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalPrice = 0;
    for (let item of items) {
      const menuItem = await Menu.findById(item.menu);
      if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
      totalPrice += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items,          // must match schema: { menu: ObjectId, quantity: Number }
      totalPrice,
      status: "pending", 
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menu", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer: Get their own orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.menu", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "preparing", "ready", "delivered", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.menu", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer: Cancel order (only if still pending)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
