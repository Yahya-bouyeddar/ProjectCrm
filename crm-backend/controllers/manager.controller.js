// controllers/manager.controller.js
import Lead from "../models/lead.model.js"; // Import the Lead model

// Get all leads assigned to this manager
export const getAssignedLeads = async (req, res) => {
  try {
    const managerId = req.user._id; // Assuming you have the manager's ID from the JWT token
    const leads = await Lead.find({ managerId });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assigned leads", error: err });
  }
};
// , async (req, res) => {
//   try {
//     const managerId = req.user._id;  // Id du manager à partir du token
//     const leads = await Lead.find({ managerId });  // Trouve les leads assignés à ce manager
//     res.json(leads);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur lors de la récupération des leads." });
//   }
// });

// Update lead status or notes
export const updateLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status, notes } = req.body;
    const lead = await Lead.findOne({ _id: leadId, managerId: req.user._id }); // Ensure only manager can update assigned leads

    if (!lead) {
      return res.status(404).json({ message: "Lead not found or not assigned to you" });
    }

    if (status) lead.status = status;
    if (notes) lead.notes = [...lead.notes, notes]; // Assuming notes is an array in the lead model
    await lead.save();
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ message: "Error updating lead", error: err });
  }
};
export const updateLeadStatus = async (req, res) => {
    const { id } = req.params;  // Récupère l'ID du lead depuis les paramètres de l'URL
    const { status, notes } = req.body;  // Récupère le nouveau statut et les notes depuis le body de la requête
  
    try {
      // Cherche le lead avec l'ID donné
      const lead = await Lead.findById(id);
      if (!lead) {
        return res.status(404).json({ message: "Lead non trouvé." });
      }
  
      // Met à jour le statut et les notes du lead
      lead.status = status || lead.status;
      lead.notes = notes || lead.notes;
  
      // Sauvegarde le lead mis à jour
      await lead.save();
      
      // Retourne la réponse avec le lead mis à jour
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur lors de la mise à jour du statut du lead." });
    }
  };

