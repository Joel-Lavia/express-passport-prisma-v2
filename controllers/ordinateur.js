const bcrypt = require("bcrypt");
const prisma = require("../db/prisma");

const getOrdinateurs = async (req, res) => {
  try {
    const ordinateur = await prisma.ordinateur.findMany();
    res.status(200).json(ordinateur);
  } catch (error) {
    res.status(500);
  }
};
const createOrdinateur = async (req, res) => {
  try {
  const ordinateur = await prisma.ordinateur.create({
      data: {
        model: req.body.model,
      },
    });
    res.status(201).json(ordinateur);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getOrdinateurs,
  createOrdinateur,
};
