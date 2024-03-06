import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ err: "Invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN);

    req.user = {
      userId: payload.userId,
      name: payload.name,
      image: payload.image
    };

    next();
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};
