# Web Project: Star Soccer

Esse projeto traz a parte Cliente (Frontend) e o Servidor da API (Backend) para a aplicação Star Soccer, estruturados para integração e deploy contínuos utilizando Tecnologias Serverless.

## Tech Stack (Tecnologias Utilizadas)

### 🎨 Frontend (`web_project_star_soccer_client`)
- **React.js** (Create React App)
- **Vanilla CSS** para estilização seguindo o padrão BEM (Block Element Modifier).
- **JavaScript (ES6+)**
- API Nativa (Fetch)
- JWT no LocalStorage para persistência de Sessão e Rotas.

### ⚙️ Backend (`web_project_star_soccer_server`)
- **Node.js** com **Express.js**.
- **PostgreSQL** hospedado na **Vercel Postgres** operado via **Prisma ORM**.
- Segurança e Autenticação: **bcrypt** e **jsonwebtoken**.
- Validação de Rotas API: **celebrate** / **Joi**.
- Servidor RESTful via Serverless Functions.

---

## 🚀 Como fazer o Deploy para Vercel

### 1. Criar e Configurar o Banco de Dados (Vercel Postgres)
1. Na sua conta da **Vercel**, crie o primeiro projeto vinculando o seu repositório GitHub e definindo o **Root Directory** como `web_project_star_soccer_server`. 
2. Sem dar o deploy final, vá até a aba **Storage**, clique em **Create Database** e escolha o **Vercel Postgres**.
3. O banco de Dados adicionará variáveis automaticamente ao seu projeto (como `POSTGRES_PRISMA_URL` e `POSTGRES_URL_NON_POOLING`).
4. (Importante) Execute uma Vercel Build. O Vercel rodará `prisma generate` e `prisma db push` (se configurado apropriadamente) para criar todas as Tabelas (User, Match) automaticamente.

### 2. Configurar Variáveis de Ambiente REST
- Além das variáveis do PostgreSQL, adicione também no servidor a variável `JWT_SECRET` contendo qualquer senha/chave secreta forte.

### 3. Deploy do Frontend (React)
1. Crie um **segundo projeto** na Vercel importando este mesmo repositório do Github.
2. Nas configurações desse segundo projeto, altere o **Root Directory** para `web_project_star_soccer_client`.
3. Em *Environment Variables*, adicione a variável com a URL do Backend que você criou no Passo 1:
   - `REACT_APP_API_URL` = `https://sua-url-backend-aqui.vercel.app` (Sem uma barra no final `/`).
4. Finalize o Deploy. O App fará fetch direto no seu servidor Serverless Prisma!
