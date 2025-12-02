#!/bin/bash

# Script à exécuter sur le serveur pour extraire et démarrer l'application
# Usage: ./scripts/extract-and-start.sh

set -e

if [ ! -f ".next-build.tar.gz" ]; then
    echo "❌ Error: .next-build.tar.gz not found in current directory"
    exit 1
fi

echo "📥 Extracting archive..."
tar -xzf .next-build.tar.gz

echo "🧹 Cleaning up..."
rm .next-build.tar.gz

echo "🔄 Restarting application..."
npm run pm2:start:no-build || pm2 start ecosystem.config.js

echo "📊 Checking status..."
pm2 status

echo "✅ Deployment completed!"
echo "🌐 Application should be running on port 1206"

