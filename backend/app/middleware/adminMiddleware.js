export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const role = req.user.role
    ?.trim()
    .replace(/^["']|["']$/g, "");

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Administrator privileges are required.",
    });
  }

  next();
};