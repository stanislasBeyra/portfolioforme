# Guide de Résolution des Problèmes de Build

## Problème : WebAssembly Out of Memory

Si vous rencontrez l'erreur `WebAssembly.instantiate(): Out of memory`, voici plusieurs solutions :

### Solution 1 : Vérifier la RAM disponible

```bash
free -h
```

Si vous avez moins de 16GB de RAM disponible, le build peut échouer.

### Solution 2 : Utiliser le build low-memory

```bash
npm run pm2:start:low-memory
```

Ce script utilise des optimisations supplémentaires pour réduire l'utilisation mémoire.

### Solution 3 : Construire localement et transférer

Si le serveur n'a pas assez de RAM, construisez localement :

1. **Sur votre machine locale** :
   ```bash
   npm run build
   ```

2. **Transférez le dossier `.next`** sur le serveur :
   ```bash
   scp -r .next user@server:/path/to/app/
   ```

3. **Sur le serveur**, démarrez seulement PM2 :
   ```bash
   pm2 start ecosystem.config.js
   ```

### Solution 4 : Augmenter la swap (mémoire virtuelle)

Si vous avez de l'espace disque disponible, créez un fichier swap :

```bash
# Créer un fichier swap de 8GB
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Rendre permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Solution 5 : Désactiver complètement certaines optimisations

Si nécessaire, vous pouvez temporairement désactiver plus d'optimisations dans `next.config.ts` :

```typescript
experimental: {
  optimizeCss: false,
  webpackMemoryOptimizations: true,
},
```

### Solution 6 : Utiliser Docker avec limite mémoire

Si vous utilisez Docker, vous pouvez limiter la mémoire allouée au build :

```yaml
# Dans docker-compose.yml
services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
    mem_limit: 16g
    memswap_limit: 16g
```

## Vérifications

1. **Version de Node.js** : Assurez-vous d'utiliser Node.js 18.17.0 ou supérieur
   ```bash
   node -v
   ```

2. **Espace disque** : Vérifiez que vous avez assez d'espace
   ```bash
   df -h
   ```

3. **Processus en cours** : Vérifiez les processus qui consomment de la mémoire
   ```bash
   top
   # ou
   htop
   ```

## Configuration actuelle

- Mémoire heap : 16GB (`--max-old-space-size=16384`)
- WebAssembly : Désactivé dans webpack
- Optimisations mémoire : Activées (`webpackMemoryOptimizations: true`)
- Parallélisme : Limité à 1 pour réduire l'utilisation mémoire

