# PRD - Decodificador de JWT

**Version:** v1.0
**Last Updated:** 2026-05-24
**Status:** Draft

---

## Visão Geral

O Decodificador de JWT é uma ferramenta web de produtividade para desenvolvedores que permite colar um token JWT, visualizar seu conteúdo de forma clara e manter um histórico local dos tokens recentemente analisados. O produto é frontend-only, construído em Angular + TypeScript, com persistência exclusiva em `localStorage`.

O foco é reduzir o tempo gasto em inspeções manuais de tokens durante desenvolvimento, debug, integração com APIs e validação de payloads.

### Problema que o produto resolve

Desenvolvedores frequentemente precisam abrir, decodificar e revisar JWTs sem depender de ferramentas pesadas, extensões de navegador ou serviços externos. O fluxo ideal precisa ser rápido, visual e seguro para uso cotidiano.

### Objetivo do produto

Entregar uma ferramenta simples, ágil e confiável para:

- Decodificar JWTs em segundos.
- Exibir header, payload e metadados de forma visual e legível.
- Guardar um histórico local dos tokens decodificados recentemente.
- Funcionar sem backend, sem banco de dados e sem criação de conta.

### Não objetivos

- Validar assinatura do JWT contra chaves remotas.
- Armazenar dados em banco de dados ou sincronizar entre dispositivos.
- Implementar autenticação, login ou perfis de usuário.
- Cobrir múltiplas ferramentas no primeiro release.

---

## Público-Alvo

- Desenvolvedores frontend, backend e fullstack.
- Pessoas que trabalham com APIs, autenticação e integrações.
- Times que precisam de uma ferramenta rápida para inspeção local de JWTs.

---

## Escopo do MVP

### Em escopo

- Campo para colar ou digitar um JWT.
- Decodificação automática ou acionada por botão.
- Visualização separada de `header`, `payload` e `signature`.
- Exibição de metadados úteis, como algoritmo, `iat`, `exp` e status de expiração quando disponíveis.
- Tratamento de erro para token inválido ou malformado.
- Histórico local dos tokens decodificados recentemente.
- Remover um item do histórico.
- Limpar todo o histórico.
- Persistência em `localStorage`.

### Fora de escopo no MVP

- Editor avançado de claims.
- Validação de assinatura.
- Importação/exportação de arquivos.
- Compartilhamento por link.
- Sincronização em nuvem.
- Suporte a múltiplos usuários.

---

## Fluxo Principal do Usuário

### 1. Input do token

O usuário acessa a ferramenta e encontra um campo principal para colar um JWT. A interface deve aceitar um token completo com três partes separadas por ponto.

A experiência deve minimizar fricção:

- Colar e decodificar rapidamente.
- Permitir limpeza do campo.
- Sinalizar imediatamente quando o formato estiver inválido.

### 2. Decodificação visual

Depois do input, a ferramenta exibe o conteúdo do JWT de forma organizada e fácil de ler.

O usuário deve conseguir ver:

- Header formatado em JSON.
- Payload formatado em JSON.
- Informações resumidas do token.
- Alertas visuais para expiração, quando aplicável.

A apresentação deve favorecer leitura rápida no dia a dia, com foco em clareza e escaneabilidade.

### 3. Histórico local

Cada token decodificado com sucesso entra em um histórico recente salvo no `localStorage`.

O histórico deve permitir:

- Reabrir um token anterior com um clique.
- Remover um item específico.
- Limpar o histórico inteiro.

O histórico existe apenas no dispositivo atual e deve ser tratado como conveniência local, não como fonte de verdade.

---

## Requisitos Funcionais

### RF1 - Entrada de JWT

A aplicação deve aceitar um token JWT via campo de texto único.

### RF2 - Decodificação

A aplicação deve decodificar header e payload do JWT e exibir o resultado em formato legível.

### RF3 - Erros de validação

A aplicação deve informar quando o token estiver vazio, malformado ou impossível de decodificar.

### RF4 - Visualização de metadados

A aplicação deve exibir metadados úteis do token, quando disponíveis.

### RF5 - Histórico local

A aplicação deve salvar os tokens decodificados recentemente no `localStorage`.

### RF6 - Reuso do histórico

A aplicação deve permitir abrir novamente um token a partir do histórico.

### RF7 - Gerenciamento do histórico

A aplicação deve permitir remover um item e limpar todo o histórico.

### RF8 - Persistência local somente

A aplicação não deve depender de banco de dados, backend ou sessão remota para funcionar.

---

## Critérios de Aceitação

1. O usuário consegue colar um JWT válido e visualizar header e payload decodificados em menos de 2 segundos em condições normais de uso.
2. Quando o token é inválido ou malformado, a interface exibe uma mensagem clara de erro sem quebrar a página.
3. O usuário consegue ver o token decodificado em um layout visualmente separado por seções, sem precisar ler JSON cru em uma única linha.
4. O histórico local registra automaticamente tokens válidos decodificados com sucesso.
5. O histórico persiste após recarregar a página no mesmo dispositivo e no mesmo navegador.
6. O usuário consegue reabrir um item do histórico e visualizar seus dados imediatamente.
7. O usuário consegue remover um token específico do histórico.
8. O usuário consegue limpar todo o histórico com uma ação explícita.
9. A aplicação continua funcional sem conexão com internet depois de carregada.
10. Nenhum dado é enviado para backend ou armazenado fora do navegador.

---

## Métricas de Sucesso

- Tempo médio para decodificar e exibir o token.
- Percentual de usuários que reutilizam o histórico.
- Número médio de tokens analisados por sessão.
- Taxa de erro por token malformado.
- Uso recorrente da ferramenta por desenvolvedores no dia a dia.

---

## Requisitos Não Funcionais

- A aplicação deve ser responsiva e usável em desktop e notebook.
- A interface deve priorizar leitura rápida e baixo atrito.
- O armazenamento local deve ser simples, previsível e robusto contra dados inválidos.
- A solução deve ser fácil de evoluir para novas ferramentas de produtividade no futuro.

---

## Premissas e Restrições

- O projeto é frontend-only.
- Angular + TypeScript é a base técnica do frontend.
- `localStorage` é a única camada de persistência.
- O produto não depende de autenticação nem de banco de dados.
- JWTs podem conter dados sensíveis; a interface deve evitar exposição desnecessária e não enviar conteúdo para serviços externos.

---

## Próximos Passos Recomendados

1. Shardar este PRD em `docs/prd/` para apoiar a criação de stories.
2. Pedir ao @architect a arquitetura do frontend Angular.
3. Pedir ao @sm a decomposição em stories de implementação.

---

_Last Updated: 2026-05-24 | AIOX Framework Team_
