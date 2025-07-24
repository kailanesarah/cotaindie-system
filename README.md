# CotaIndie

**CotaIndie** é um software web desenvolvido com Next.js e Tailwind CSS para facilitar a criação, visualização e gerenciamento de orçamentos — ideal para pequenas e médias empresas que precisam de agilidade e organização.

---

## Tecnologias utilizadas 

- [Next.js](https://nextjs.org/) — Framework React com foco em performance
- [Tailwind CSS](https://tailwindcss.com/) — Framework utilitário de CSS
- [TypeScript](https://www.typescriptlang.org/) 

# Arquitetura da Aplicação

## Proposta: Arquitetura modular por domínio
A arquitetura modular por domínio organiza a aplicação em módulos independentes, com base nos conceitos do DDD (Domain-Driven Design). Cada domínio da aplicação possui sua própria estrutura de pastas e arquivos, reduzindo o acoplamento e facilitando a escalabilidade.

---

## Vantagens

- **Baixo Acoplamento**: Cada módulo (ex: orçamentos, usuários, produtos) é isolado e independente, facilitando a manutenção e testes.
- **Organização Previsível**: Todos os domínios seguem uma estrutura padrão com `components`, `services`, `schema`, etc.
- **Alta Coesão**: Tudo o que pertence a um domínio está no mesmo lugar.
- **Escalável**: Ideal para projetos com múltiplos domínios.
- **Compatível com App Router** do Next.js (`/app`), separando rotas públicas e privadas com clareza.

---

## 🧱 Estrutura Base



## Estrutura do projeto

```bash

/precix-system/
├── /src/
│   ├── /app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Página inicial
│   │
│   │   ├── (public)/
│   │   │   ├── /login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   └── (private)/
│   │       ├── /orcamentos/
│   │       │   └── page.tsx
│   │       ├── /clientes/
│   │       │   └── page.tsx
│   │       └── layout.tsx          # Layout com proteção de rota
│   │
│   ├── /modules/
│   │   ├── /orcamentos/            #Exemplo de domínio
│   │   │   ├── components/         # Componentes do domínio:  modularização por funcionalidade, e não por tipo técnico
│   │   │   ├── schema/             # Validações (ex: Zod)
│   │   │   ├── constants/          # Constantes (status, opções, etc.)
│   │   │   ├── hooks/              # Custom hooks (useOrcamentos, etc.)
│   │   │   ├── types.ts            # Tipos específicos
│   │   │   ├── utils.ts            # Funções auxiliares
│   │   │   ├── services/           # Camada de aplicação
│   │   │   ├── repository/         # Acesso à API (fetch/axios)
│   │   │   └── use-cases/          # Regras de negócio do domínio
│   │   │
│   │   ├── /clientes/              #Exemplo de domínio
│   │   │   ├── components/
│   │   │   ├── schema/
│   │   │   ├── ...
│   │   │
│   │   └── /login/                 #Exemplo de domínio
│   │       ├── components/
│   │       ├── schema/
│   │       ├── repository/
│   │       ├── services/
│   │       └── use-cases/
│
│   ├── /components/                # Componentes genéricos (botões, inputs)
│   ├── /lib/                       # Funções globais (ex: auth, formatadores)
│   ├── /types/                     # Tipos globais e compartilhados
│   ├── /styles/                    # Tailwind ou CSS geral
│   ├── /db/                        # Prisma ou conexão com banco
│   │   └── schema.prisma
│
├── .env
├── next.config.js
├── tsconfig.json                  
└── package.json

```

---
## Instalação
```bash
# Clone o repositório
git clone https://github.com/kailanesarah/precix-system.git
cd precix-system

# Instale as dependências
npm install

#Executando em desenvolvimento
npm run dev
Acesse o app em: http://localhost:3000

```
## Licença

Este é um **software proprietário**. O uso, modificação, distribuição ou reprodução do código-fonte é proibido, exceto mediante autorização expressa. Todas as contribuições passam por avaliação técnica e jurídica antes de sua incorporação.

### Direitos Autorais

**© 2025 - Alex Magalhães & Kailane Sarah.** Todos os direitos reservados.

Este software é propriedade intelectual de seus autores. Nenhuma parte deste projeto pode ser reproduzida, armazenada em sistema de recuperação ou transmitida, por qualquer forma ou meio, eletrônico, mecânico, fotocópia, gravação ou outro, sem permissão expressa.

Para solicitar autorização ou propor contribuições, entre em contato pelo e-mail: [kailanesarahpro@gmail.com].


### Autores
- [Alex Magalhães](https://github.com/alexmagalhaes)
- [Kailane Sarah](https://github.com/Kailanesarah)
