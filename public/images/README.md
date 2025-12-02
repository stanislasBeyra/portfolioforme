# Guide pour ajouter vos images

## Structure des dossiers

Placez vos images dans les dossiers suivants :

```
public/
  images/
    profile.jpg          # Votre photo de profil (pour la section Hero)
    projects/
      paytou.jpg                    # Image du projet Paytou
      payment-aggregator.jpg        # Image de l'agrégateur de paiement
      budget-manager.jpg            # Image du gestionnaire de budget
      task-manager.jpg              # Image du gestionnaire de tâches
      eti-immo.jpg                  # Image de l'application immobilière
```

## Formats d'images recommandés

- **Format** : JPG, PNG, WebP
- **Taille recommandée** :
  - Photo de profil : 512x512 px (carré)
  - Images de projets : 800x600 px ou 1200x800 px (ratio 4:3 ou 16:9)

## Comment ajouter vos images

1. **Photo de profil** :
   - Placez votre photo dans `public/images/profile.jpg`
   - L'image sera automatiquement affichée dans la section Hero
   - Si l'image n'existe pas, elle sera masquée automatiquement

2. **Images de projets** :
   - Placez les images de vos projets dans `public/images/projects/`
   - Nommez-les selon les noms indiqués ci-dessus
   - Les images s'afficheront automatiquement à côté de chaque projet

## Personnalisation

Si vous souhaitez utiliser des noms d'images différents, modifiez les chemins dans le fichier `app/page.tsx` :

- Ligne ~147 : Photo de profil
- Lignes ~520-570 : Images des projets

## Optimisation

Les images sont automatiquement optimisées par Next.js grâce au composant `Image`. 
Assurez-vous que vos images ne sont pas trop lourdes (recommandé : < 500KB par image).

