#!/bin/bash

# Script pour construire localement et transférer sur le serveur
# Usage: ./scripts/build-and-transfer.sh user@server:/path/to/app

set -e

echo "🔨 Building application locally..."
NODE_OPTIONS='--max-old-space-size=16384' npm run build

if [ -z "$1" ]; then
    echo "❌ Error: Please provide server destination"
    echo "Usage: ./scripts/build-and-transfer.sh user@server:/path/to/app"
    exit 1
fi

DEST=$1

echo "📦 Compressing .next directory..."
tar -czf .next.tar.gz .next

echo "📤 Transferring files to server..."
scp .next.tar.gz $DEST/

echo "🚀 Extracting and starting on server..."
ssh ${DEST%%:*} "cd ${DEST##*:} && tar -xzf .next.tar.gz && rm .next.tar.gz && pm2 restart my-portfolio || pm2 start ecosystem.config.js"

echo "🧹 Cleaning up local files..."
rm .next.tar.gz

echo "✅ Done! Application should be running on server."

