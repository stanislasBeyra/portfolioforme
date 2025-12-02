# Solution : Build Local et Transfert

Comme le serveur rencontre des problèmes avec WebAssembly lors du build, voici comment construire localement et transférer :

## Méthode 1 : Build local + Transfert manuel

### Sur votre machine locale :

1. **Construire l'application** :
   ```bash
   npm run build
   ```

2. **Créer une archive du dossier .next** :
   ```bash
   tar -czf .next.tar.gz .next
   ```

3. **Transférer sur le serveur** :
   ```bash
   scp .next.tar.gz hostrootci@cpd-fi2.beyra.hostroot.ci:/home/hostrootci/beyra.hostroot.ci/
   ```

### Sur le serveur :

1. **Aller dans le dossier de l'application** :
   ```bash
   cd /home/hostrootci/beyra.hostroot.ci
   ```

2. **Extraire l'archive** :
   ```bash
   tar -xzf .next.tar.gz
   rm .next.tar.gz
   ```

3. **Démarrer avec PM2 (sans build)** :
   ```bash
   npm run pm2:start:no-build
   ```

## Méthode 2 : Utiliser le script automatique

### Sur votre machine locale :

```bash
./scripts/build-and-transfer.sh hostrootci@cpd-fi2.beyra.hostroot.ci:/home/hostrootci/beyra.hostroot.ci
```

Ce script fait automatiquement :
- Build local
- Compression
- Transfert
- Extraction sur le serveur
- Démarrage PM2

## Méthode 3 : Utiliser rsync (plus efficace)

### Sur votre machine locale :

```bash
npm run build
rsync -avz --delete .next/ hostrootci@cpd-fi2.beyra.hostroot.ci:/home/hostrootci/beyra.hostroot.ci/.next/
```

### Sur le serveur :

```bash
cd /home/hostrootci/beyra.hostroot.ci
npm run pm2:start:no-build
```

## Note importante

Assurez-vous que :
- Les versions de Node.js sont compatibles (local et serveur)
- Les dépendances `node_modules` sont installées sur le serveur
- Le fichier `package.json` est à jour sur le serveur

