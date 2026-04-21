# Web Project: Star Soccer

Esse projeto traz a parte Cliente (Frontend) e o Servidor da API (Backend) para a aplicação Star Soccer, estruturados para integração e deploy contínuos.

## Tech Stack (Tecnologias Utilizadas)

### 🎨 Frontend (`web_project_star_soccer_client`)
- **React.js** (Create React App)
- **Vanilla CSS** para estilização seguindo o padrão BEM (Block Element Modifier).
- **JavaScript (ES6+)**
- Fetch API para consumo assíncrono.
- JWT no LocalStorage para persistência de Sessão e Rotas Protegidas.

### ⚙️ Backend (`web_project_star_soccer_server`)
- **Node.js** com **Express.js**.
- **MongoDB** através do **Mongoose** (ODM) para o Banco de Dados NoSQL.
- Segurança e Autenticação: **bcrypt** e **jsonwebtoken**.
- Validação de Rotas: **celebrate** / **Joi**.
- Servidor RESTful API com rotas modeladas para `Usuários` e `Partidas (Matches)`.

---

## 🚀 Como fazer o Deploy para Vercel

O projeto foi dividido em duas pastas principais. Pode ser distribuído muito facilmente da seguinte forma na plataforma Vercel:

### 1. Preparação (Variáveis de Ambiente / `.env`)
Você precisará ter um Banco de Dados **MongoDB** hospedado (recomenda-se o uso gratuito no MongoDB Atlas). Copie a string de conexão.

### 2. Deploy do Backend (Serverless API)
1. Na Vercel, crie um novo projeto importando este repositório.
2. Nas configurações do projeto, altere o **Root Directory** para `web_project_star_soccer_server`.
3. Em *Environment Variables*, adicione:
   - `MONGODB_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `(suachavesecreta)`
   - `NODE_ENV` = `production`
4. Dê o Deploy. Ele irá gerar um link, como `https://sua-api.vercel.app`. **Guarde esse link**.

### 3. Deploy do Frontend (React)
1. Na Vercel, crie um **segundo projeto** importando o MESMO repositório.
2. Nas configurações, altere o **Root Directory** para `web_project_star_soccer_client`.
3. Em *Environment Variables*, adicione o endereço da sua API que foi construída no passo anterior:
   - `REACT_APP_API_URL` = `https://sua-api.vercel.app` (Não use uma barra final `/`).
4. Finalize o Deploy. Seu aplicativo React agora está ao vivo e conectando com o banco de forma unificada!

---

## 💻 Rodando Localmente

1. Execute `npm install` tanto na pasta `_client` quanto na pasta `_server`.
2. Configure seu`.env` espelhando os arquivos `.env.example`.
3. Utilize `npm start` no frontend (porta 3000) e `npm run dev` no backend (porta 3001).
