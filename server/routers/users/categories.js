const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../../models/Categories')
const Categorie = mongoose.model("categories")

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Visualização de categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Erro ao carregar categorias
 */

router.get('/', (req, res) => {
  Categorie.find()
    .lean()
    .sort({ date: 'desc' })
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nome:
 *           type: string
 *         slug:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 */

module.exports = router;