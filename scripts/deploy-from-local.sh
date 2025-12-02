#!/bin/bash

# Script pour construire localement et déployer sur le serveur
# Usage: ./scripts/deploy-from-local.sh

set -e

echo "🔨 Building application locally..."
NODE_OPTIONS='--max-old-space-size=16384' npm run build

if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed or .next directory not found"
    exit 1
fi

echo "📦 Creating archive..."
tar -czf .next-build.tar.gz .next package.json

echo "✅ Build completed successfully!"
echo ""
echo "📤 To transfer to server, run:"
echo "   scp .next-build.tar.gz hostrootci@cpd-fi2.beyra.hostroot.ci:/home/hostrootci/beyra.hostroot.ci/"
echo ""
echo "📥 Then on the server, run:"
echo "   cd /home/hostrootci/beyra.hostroot.ci"
echo "   tar -xzf .next-build.tar.gz"
echo "   rm .next-build.tar.gz"
echo "   npm run pm2:start:no-build"

