# 🏃 Londrina Run — Painel de Treinos

Painel pessoal para acompanhar o plano de corrida da **Maratona de Londrina 10km**.

**Meta:** Sub 55min · Alvo: ~50min  
**Prova:** 05 de julho de 2026

---

## 🚀 Deploy no GitHub Pages (passo a passo)

### 1. Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: `londrina-run`
3. Marque como **Public**
4. Clique em **Create repository**

### 2. Fazer o upload do arquivo

**Opção A — pelo site do GitHub (mais fácil):**
1. No repositório criado, clique em **"uploading an existing file"**
2. Arraste o arquivo `index.html` para a área indicada
3. Clique em **Commit changes**

**Opção B — via Git (terminal):**
```bash
git init
git add index.html
git commit -m "Painel de treinos Londrina Run"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/londrina-run.git
git push -u origin main
```

### 3. Ativar o GitHub Pages

1. No repositório, vá em **Settings** (engrenagem)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Branch: **main** · Pasta: **/ (root)**
5. Clique em **Save**

### 4. Acessar o painel

Após ~1 minuto, seu painel estará disponível em:

```
https://SEU_USUARIO.github.io/londrina-run/
```

---

## 📱 Funcionalidades

- ⏱ **Countdown** em tempo real até a prova
- ✅ **Marcar treinos** como concluídos
- 📋 **Registrar dados** de cada treino (distância, pace, duração, elevação, observações)
- 📊 **Estatísticas** automáticas (km acumulados, melhor pace, progresso geral)
- 💾 **Dados salvos localmente** no navegador (localStorage)

---

## 💡 Dica

Adicione o link aos seus favoritos no celular como **"Adicionar à tela inicial"** para ter acesso rápido após cada treino!
