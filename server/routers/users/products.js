const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Product');
const Product = mongoose.model("products");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Visualização de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos com categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao carregar produtos
 */

router.get('/', (req, res) => {
  Product.find()
    .lean()
    .populate("categoria")
    .sort({ date: "desc" })
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((e) => {
      console.error(e);
      res.status(400).json({ error: 'Erro ao carregar produtos' });
    });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         slug:
 *           type: string
 *         descricao:
 *           type: string
 *         conteudo:
 *           type: string
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         preco:
 *           type: number
 *         imagem:
 *           type: string
 *         isVegetariano:
 *           type: boolean
 *         isSemGluten:
 *           type: boolean
 *         avaliacao:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 */

module.exports = router;