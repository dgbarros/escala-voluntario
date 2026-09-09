# Escala Voluntário

Um sistema SaaS completo e responsivo desenvolvido para facilitar a gestão de escalas e a organização de voluntários em igrejas. A aplicação permite o cadastro de membros, definição de disponibilidades, personalização de perfis e gerenciamento automatizado de escalas.

## Tecnologias e Decisões de Arquitetura

Este projeto foi construído utilizando tecnologias modernas focadas em escalabilidade, segurança e experiência do desenvolvedor. Abaixo estão as ferramentas escolhidas e o motivo de cada adoção:

*   **Next.js (React + Node.js + TypeScript):** 
    O framework principal da aplicação. Escolhido pela sua excelente integração Full Stack, permitindo lidar com a interface (React), o backend (Node.js/API Routes) e a tipagem estática (TypeScript) em um único repositório. O Next.js garante praticidade, excelente usabilidade e alta escalabilidade com recursos nativos como SSR (Server-Side Rendering) e Server Components.
*   **Supabase (Backend as a Service - BaaS):** 
    Utilizado como a infraestrutura de dados e segurança. O Supabase foi escolhido pois gerencia nativamente toda a complexidade de Autenticação e tokens JWT. Além disso, oferece um painel intuitivo para controle do banco de dados, visualização de tabelas e gerenciamento das políticas de segurança (Row Level Security - RLS) e migrations.
*   **Prisma (ORM):**
    Atua em conjunto com o Supabase para facilitar a modelagem do banco de dados (PostgreSQL) e as consultas tipadas no backend, garantindo segurança e produtividade.
*   **Docker Engine:** 
    A conteinerização foi adotada para o ambiente de desenvolvimento local. Utilizando o Docker Engine, o banco de dados e suas migrations rodam isolados em um container, facilitando o processo de rodar o banco localmente sem a necessidade de recriar a estrutura manualmente a cada configuração.
*   **Tailwind CSS & shadcn/ui:** 
    Para estilização rápida, responsiva e criação de componentes de interface acessíveis e consistentes.

##  CI/CD, Testes e Deploy

O fluxo de entrega contínua foi desenhado para garantir que apenas código testado e funcional chegue ao ambiente de produção.

*   **GitHub Actions (Workflow):** Como boa prática de engenharia, foi criado um pipeline de CI (Continuous Integration). Antes que qualquer código suba para a branch `main`, o workflow faz verificações e testes automatizados. Isso garante a integridade e estabilidade do código antes do merge.
*   **Vercel:** Plataforma de deploy escolhida pela sua integração nativa e fluida com o Next.js e o GitHub. Quando uma Pull Request (PR) é aprovada ou o código é mergeado na `main`, a Vercel realiza o processo de build, roda testes internos e publica o deploy de forma totalmente automatizada.

## Como rodar o projeto localmente

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [Docker Engine](https://docs.docker.com/engine/install/)
*   [Git](https://git-scm.com/)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/escala-voluntario.git](https://github.com/SEU_USUARIO/escala-voluntario.git)
   cd escala-voluntario

2. **Instale as dependências (Clean Install):**
   Para evitar problemas com versões corrompidas ou atualizações indesejadas de pacotes, utilizamos o comando `ci` que respeita estritamente o `package-lock.json`:
   ```bash
   npm ci

3. **Configure as variáveis de ambiente:**
* NEXT_PUBLIC_SUPABASE_URL="sua_url_aqui"
* NEXT_PUBLIC_SUPABASE_ANON_KEY="sua_chave_anon_aqui"
* DATABASE_URL="sua_string_de_conexao_do_banco"

4. **Inicie o banco de dados local com Docker Engine:**
    docker compose up -d

5. **Gere o client do Prisma e sincronize o banco:**
    npx prisma generate
    npx prisma db push

6. **Inicie o servidor de desenvolvimento:**
    npm run dev

O servidor iniciará localmente. Acesse http://localhost:3000 no seu navegador para ver a aplicação rodando.

**Desenvolvido por Douglas Barros.**
