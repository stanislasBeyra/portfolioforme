# Guide de Déploiement

Ce guide explique comment déployer le portfolio avec Docker et GitHub Actions.

## 🐳 Déploiement avec Docker

### Prérequis
- Docker installé
- Docker Compose installé (optionnel mais recommandé)

### Commandes Docker disponibles

```bash
# Construire l'image Docker
npm run docker:build

# Lancer le conteneur
npm run docker:run

# Utiliser Docker Compose (recommandé)
npm run docker:up      # Démarrer en arrière-plan
npm run docker:down    # Arrêter
npm run docker:logs    # Voir les logs
```

### Déploiement manuel avec Docker

1. **Construire l'image** :
   ```bash
   docker build -t my-portfolio:latest .
   ```

2. **Lancer le conteneur** :
   ```bash
   docker run -d -p 1206:1206 --name my-portfolio my-portfolio:latest
   ```

3. **Voir les logs** :
   ```bash
   docker logs -f my-portfolio
   ```

### Déploiement avec Docker Compose

1. **Démarrer** :
   ```bash
   docker-compose up -d
   ```

2. **Arrêter** :
   ```bash
   docker-compose down
   ```

3. **Rebuild et redémarrer** :
   ```bash
   docker-compose up -d --build
   ```

L'application sera accessible sur `http://localhost:1206`

## 🚀 Déploiement avec GitHub Actions

### Configuration des secrets GitHub

Pour activer le déploiement automatique, vous devez configurer les secrets suivants dans votre repository GitHub :

1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Ajoutez les secrets suivants :

   - `SERVER_HOST` : L'adresse IP ou le domaine de votre serveur
   - `SERVER_USER` : Le nom d'utilisateur SSH
   - `SERVER_SSH_KEY` : Votre clé privée SSH

### Workflows disponibles

#### 1. `deploy.yml` - Build et déploiement complet
- Build l'application
- Lance les tests/linter
- Construit l'image Docker
- Déploie sur le serveur via SSH

#### 2. `docker-deploy.yml` - Déploiement Docker optimisé
- Utilise Docker Buildx pour un build optimisé
- Cache les layers Docker
- Déploie avec Docker Compose

### Déploiement automatique

Une fois les secrets configurés, chaque push sur `main` ou `master` déclenchera automatiquement :

1. ✅ Build de l'application
2. ✅ Tests/Linter
3. ✅ Build de l'image Docker
4. ✅ Déploiement sur le serveur

### Configuration du serveur

Sur votre serveur, vous devez :

1. **Installer Docker et Docker Compose** :
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install docker.io docker-compose
   ```

2. **Cloner le repository** :
   ```bash
   git clone <votre-repo-url>
   cd my_portfolio
   ```

3. **Configurer le chemin dans le workflow** :
   Modifiez `/path/to/your/app` dans `.github/workflows/deploy.yml` avec le chemin réel de votre application.

4. **Configurer les permissions SSH** :
   ```bash
   # Sur votre machine locale
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   # Copiez la clé publique sur le serveur
   ssh-copy-id user@your-server
   # Ajoutez la clé privée comme secret GitHub
   ```

## 🔧 Options avancées

### Push vers Docker Hub

Pour pousser l'image vers Docker Hub, décommentez les sections dans les workflows et ajoutez :
- `DOCKER_USERNAME` : Votre nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Votre token Docker Hub

### Déploiement sur plusieurs environnements

Vous pouvez créer des workflows séparés pour staging et production en modifiant les branches déclencheuses.

## 📝 Notes

- Le port par défaut est **1206**
- L'application utilise le mode `standalone` de Next.js pour optimiser la taille de l'image Docker
- Les logs sont disponibles via `docker-compose logs -f` ou `pm2 logs`

