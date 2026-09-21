import Activity from "../models/Activity.js";

export const createActivity = async ({
  type,
  title,
  description = "",
  userId = null,
  entityId = null,
  entityType = null,
}) => {
  try {
    const activity = await Activity.create({
      type,
      title,
      description,
      userId,
      entityId,
      entityType,
    });

    return activity;
  } catch (error) {
    console.error("Activity creation error:", error);
    throw error;
  }
};