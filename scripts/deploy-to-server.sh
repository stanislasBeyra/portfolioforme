#!/bin/bash

# Script pour transférer et déployer sur le serveur
# Usage: ./scripts/deploy-to-server.sh [user@server:/path]

set -e

# Configuration par défaut
DEFAULT_SERVER="hostrootci@cpd-fi2.beyra.hostroot.ci"
DEFAULT_PATH="/home/hostrootci/public_html/beyra.hostroot.ci"
DEST="${1:-${DEFAULT_SERVER}:${DEFAULT_PATH}}"

if [ ! -f ".next-build.tar.gz" ]; then
    echo "❌ Error: .next-build.tar.gz not found"
    echo "   Run ./scripts/deploy-from-local.sh first to build and create the archive"
    exit 1
fi

echo "📤 Transferring archive to server..."
scp .next-build.tar.gz ${DEST}/

echo "🚀 Deploying on server..."
ssh ${DEST%%:*} << EOF
cd ${DEST##*:}
echo "📥 Extracting archive..."
tar -xzf .next-build.tar.gz
rm .next-build.tar.gz
echo "🔄 Restarting application..."
npm run pm2:start:no-build || pm2 start ecosystem.config.js
echo "📊 Checking status..."
pm2 status
EOF

echo "✅ Deployment completed!"
echo "🌐 Application should be running on port 1206"

