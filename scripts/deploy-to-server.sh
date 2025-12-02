#!/bin/bash

# Script pour transférer et déployer sur le serveur
# Usage depuis local: ./scripts/deploy-to-server.sh [user@server:/path]
# Usage depuis serveur: ./scripts/deploy-to-server.sh (détecte automatiquement)

set -e

# Détecter si on est sur le serveur (en vérifiant le chemin actuel)
CURRENT_DIR=$(pwd)
IS_ON_SERVER=false

if [[ "$CURRENT_DIR" == *"/home/hostrootci/public_html/beyra.hostroot.ci"* ]] || [[ "$CURRENT_DIR" == "/home/hostrootci/public_html/beyra.hostroot.ci" ]]; then
    IS_ON_SERVER=true
fi

# Si on est sur le serveur, extraire et démarrer localement
if [ "$IS_ON_SERVER" = true ]; then
    echo "🖥️  Detected: Running on server"
    echo "📂 Current directory: $CURRENT_DIR"
    
    if [ ! -f ".next-build.tar.gz" ]; then
        echo "❌ Error: .next-build.tar.gz not found in current directory"
        echo "   Make sure the archive has been transferred to the server"
        exit 1
    fi
    
    echo "📥 Extracting archive..."
    tar -xzf .next-build.tar.gz 2>&1 | grep -v "Ignoring unknown extended header keyword" || true
    
    echo "🧹 Cleaning up..."
    rm .next-build.tar.gz
    
    echo "🔄 Restarting application..."
    npm run pm2:start:no-build || pm2 start ecosystem.config.js
    
    echo "📊 Checking status..."
    pm2 status
    
    echo "✅ Deployment completed!"
    echo "🌐 Application should be running on port 1206"
    exit 0
fi

# Sinon, on est en local, transférer et déployer via SSH
echo "💻 Detected: Running from local machine"

# Configuration par défaut pour le déploiement depuis local
DEFAULT_SERVER="hostrootci@cpd-fi2.beyra.hostroot.ci"
DEFAULT_PATH="/home/hostrootci/public_html/beyra.hostroot.ci"

# Si un argument est fourni, l'utiliser, sinon utiliser la valeur par défaut
if [ -z "$1" ]; then
    DEST="${DEFAULT_SERVER}:${DEFAULT_PATH}"
else
    DEST="$1"
fi

if [ ! -f ".next-build.tar.gz" ]; then
    echo "❌ Error: .next-build.tar.gz not found"
    echo "   Run ./scripts/deploy-from-local.sh first to build and create the archive"
    exit 1
fi

echo "📤 Transferring archive to server..."
scp .next-build.tar.gz ${DEST}/

SERVER_HOST="${DEST%%:*}"
SERVER_PATH="${DEST##*:}"

echo "🚀 Deploying on server..."
ssh ${SERVER_HOST} << EOF
cd ${SERVER_PATH}
if [ -f ".next-build.tar.gz" ]; then
    echo "📥 Extracting archive..."
    tar -xzf .next-build.tar.gz 2>&1 | grep -v "Ignoring unknown extended header keyword" || true
    rm .next-build.tar.gz
    echo "🔄 Restarting application..."
    npm run pm2:start:no-build || pm2 start ecosystem.config.js
    echo "📊 Checking status..."
    pm2 status
else
    echo "❌ Error: .next-build.tar.gz not found on server"
    echo "   Make sure the transfer completed successfully"
    exit 1
fi
EOF

echo "✅ Deployment completed!"
echo "🌐 Application should be running on port 1206"

