// controllers/employer.controller.js
import Lead from "../models/lead.model.js"; // Make sure to import the Lead model
import User from "../models/user.model.js"; // Import the User model for manager operations


export const createLead = async (req, res) => {
  try {
    const { contactName, contactEmail, companyName, managerId } = req.body;
    const lead = new Lead({
      contactName,
      contactEmail,
      companyName,
      managerId,
    });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: "Error creating lead", error: err });
  }
};

// Update a lead
export const updateLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status } = req.body; // Update lead status or other fields
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: "Error updating lead", error: err });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    await Lead.findByIdAndDelete(leadId);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lead", error: err });
  }
};

// Get dashboard stats for employer (count of leads)
export const getDashboardStats = async (req, res) => {
  try {
    const inProgressCount = await Lead.countDocuments({ status: "IN_PROGRESS" });
    const completedCount = await Lead.countDocuments({ status: "COMPLETED" });
    const canceledCount = await Lead.countDocuments({ status: "CANCELED" });
    res.status(200).json({ inProgressCount, completedCount, canceledCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: err });
  }
};

// Manage managers

export const listManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" });
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const createManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const manager = new User({
      name,
      email,
      password,
      role,
    });
    await manager.save();
    res.status(201).json(manager);
  } catch (err) {
    res.status(500).json({ message: "Error creating manager", error: err });
  }
};

export const updateManager = async (req, res) => {
  try {
    const { managerId } = req.params;
    const { name, email, password } = req.body;
    const updatedManager = await User.findByIdAndUpdate(
      managerId,
      { name, email, password },
      { new: true }
    );
    res.status(200).json(updatedManager);
  } catch (err) {
    res.status(500).json({ message: "Error updating manager", error: err });
  }
};

export const deleteManager = async (req, res) => {
  try {
    const { managerId } = req.params;
    await User.findByIdAndDelete(managerId);
    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting manager", error: err });
  }
};
