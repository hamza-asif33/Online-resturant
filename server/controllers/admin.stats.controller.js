import Order from "../models/order.js";
import User from "../models/user.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const revenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
    const totalCustomers = await User.countDocuments({ role: "customer" });

    res.json({ totalOrders, totalRevenue, totalCustomers });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};
