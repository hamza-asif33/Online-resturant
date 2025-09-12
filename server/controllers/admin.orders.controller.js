import Order from "../models/order.js";

// GET all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")         // customer info
      .populate("items.menu", "name price")   // menu item info, matches Order schema
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;
    status = status.toLowerCase();

    const allowed = ["pending", "preparing", "ready", "delivered", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.menu", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};
