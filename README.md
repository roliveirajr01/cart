# Fullstack Learning Lab 🚀

[![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?logo=vercel)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs)](https://nodejs.org/)

Repositório de estudos práticos para explorar:

- **Next.js 15** com React 19
- **Node.js/Express** com MongoDB
- **Tailwind CSS** para estilização
- **Docker** para containerização

> "A jornada de mil milhas começa com o primeiro passo" - Lao Tzu

## 📌 Sobre o Projeto

Este é um projeto pessoal onde estou:

- Adaptando conceitos de um curso de Node.js que concluí recentemente
- Implementando novas funcionalidades para praticar Next.js
- Experimentando configurações com Docker/Docker Compose
- Aprendendo a utilizar Tailwind UI na prática

**Aviso importante:** Este não é um projeto profissional, mas sim um laboratório de aprendizado onde estou testando diferentes tecnologias e cometendo (e corrigindo) erros intencionais.

## 🛠 Funcionalidades Principais

- Autenticação de usuários
- Upload de arquivos com Multer
- CRUD básico para posts de blog
- Configuração Docker multi-container
- Layout responsivo com Tailwind CSS

## 💻 Stack Tecnológica

| Camada          | Tecnologias                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **Frontend**    | Next.js 15, React 19, Tailwind CSS 3, React Dropzone                        |
| **Backend**     | Node.js 20, Express 4, Mongoose 8, Passport.js                              |
| **Banco**       | MongoDB (via Docker)                                                        |
| **Infra**       | Docker 24, Docker Compose                                                   |
| **Ferramentas** | ESLint, TypeScript 5, PostCSS                                               |

## 📝 Notas de Desenvolvimento

### O Que Estou Praticando:
- [x] Conexão entre containers Docker
- [x] Configuração de ambiente de produção
- [x] Autenticação JWT/sessions
- [ ] Testes E2E
- [ ] Deploy em cloud

### Desafios Encontrados:
- Configurar comunicação entre containers
- Gerenciar diferentes versões de dependências
- Implementar upload de arquivos seguro
- Aprender boas práticas com Docker

## 🚀 Como Executar

Pré-requisitos:
- Docker 24+
- Docker Compose 2.20+

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cart.git

# Inicie os containers
docker-compose up --build

# Acesse:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8081
# - MongoDB: mongodb://localhost:27017