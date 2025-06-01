# Guia do DesafioFitness - Versão Otimizada para Vercel

Este é um aplicativo web completo para acompanhamento de desafios de emagrecimento, com sistema de cadastro, login, registro diário de progresso, visualização de histórico, e diversos recursos motivacionais.

## 🚀 Recursos Principais

- **Cadastro e Login de Usuárias**
- **Dashboard Interativo e Motivacional**
- **Registro Diário** de peso, sono, água, alimentação e treinos
- **Histórico de Progresso** com visualizações claras
- **Sistema de Medalhas e Conquistas**
- **Frases Motivacionais** que mudam automaticamente
- **Histórias de Sucesso** para adicionar fotos de resultados
- **Interface Futurista** nas cores preto, laranja fosco e branco

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona perfeitamente em:
- Celulares
- Tablets
- Desktops

## 🔧 Tecnologias Utilizadas

- React
- HTML5
- CSS3
- JavaScript
- LocalStorage para armazenamento de dados

## 📋 Como Usar

### Instalação Local

1. Descompacte o arquivo zip
2. Abra o terminal na pasta do projeto
3. Execute `npm install` para instalar as dependências
4. Execute `npm start` para iniciar o servidor de desenvolvimento
5. Acesse http://localhost:3000 no navegador

### Deploy no Vercel

Este projeto está configurado especificamente para deploy no Vercel:

1. Crie uma conta no [Vercel](https://vercel.com) se ainda não tiver
2. Instale a CLI do Vercel: `npm i -g vercel`
3. No terminal, na pasta do projeto, execute: `vercel login`
4. Após o login, execute: `vercel`
5. Siga as instruções na tela para completar o deploy

**Importante**: O arquivo `vercel.json` já está incluído no projeto para garantir que o roteamento funcione corretamente e evitar a tela branca.

## 🎨 Personalização

### Frases Motivacionais
Edite o arquivo `src/components/cards/MotivationCard.js` para adicionar ou modificar as frases motivacionais.

### Histórias de Sucesso
Para adicionar histórias de sucesso com fotos reais:
1. Adicione as imagens na pasta `public/images/`
2. Edite o arquivo `src/components/cards/SuccessStoriesCard.js`

### Medalhas e Conquistas
Personalize as medalhas e conquistas no arquivo `src/components/cards/MedalsCard.js`

### Cores e Estilos
Os principais arquivos de estilo estão em `src/styles/`:
- `global.css` - Estilos globais
- `dashboard.css` - Estilos do dashboard
- `cards.css` - Estilos dos cards
- `animations.css` - Animações e efeitos visuais

## 💾 Armazenamento de Dados

Todos os dados são armazenados localmente no navegador da usuária através do localStorage:
- Informações de cadastro e login
- Registros diários
- Histórico de progresso
- Conquistas e medalhas

Isso significa que os dados persistem mesmo após fechar o navegador, mas não são compartilhados entre dispositivos diferentes.

## 🔄 Estrutura do Projeto

- `src/components/` - Componentes reutilizáveis
  - `auth/` - Componentes de autenticação
  - `cards/` - Cards interativos
  - `engagement/` - Recursos de engajamento
  - `ui/` - Elementos de interface
- `src/pages/` - Páginas principais
- `src/styles/` - Arquivos CSS
- `public/` - Arquivos estáticos

## 📝 Notas Importantes

- O arquivo `vercel.json` na raiz do projeto é essencial para o funcionamento correto no Vercel
- Não remova ou modifique este arquivo, pois ele garante que o roteamento funcione corretamente
- Se precisar fazer alterações no código, sempre execute `npm run build` antes de fazer um novo deploy
