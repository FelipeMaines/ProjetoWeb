Vou verificar a memória do DevOps e a configuração atual de build para te dar comandos exatos de publicação e dizer com precisão se vercel.json é necessário.

Para publicar no Vercel com npx vercel, você pode seguir este fluxo:

Garanta que as dependências estão instaladas:
npm install
Faça login no Vercel:
npx vercel login
Publique o projeto pela primeira vez:
npx vercel
Na configuração interativa, use:
Project name: jwt-decoder
Framework preset: deixe o Vercel detectar, ou escolha Other se pedir
Build command: npm run build
Output directory: jwt-decoder
Install command: npm install
Para publicar em produção depois:
npx vercel --prod
Sobre vercel.json: para uma SPA Angular, eu recomendo sim criar esse arquivo para evitar problemas com rotas client-side. Mesmo que hoje a app esteja só na raiz, o rewrite protege reloads e futuras rotas Angular.

Use este vercel.json na raiz do projeto:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/jwt-decoder",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
Observações rápidas:

O build atual do projeto sai em jwt-decoder, então esse é o output correto.
Se você usar só a rota /, a app pode subir sem vercel.json, mas para Angular SPA ele é a forma correta de evitar 404 em navegação direta.
O Vercel vai servir o index.html e o Angular Router resolve o restante no cliente.