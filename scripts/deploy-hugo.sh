#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
HUGO_DIR="$WORKSPACE_DIR/projects/aitoolreviewr"
PUBLIC_DIR="$WORKSPACE_DIR/public"

cd "$HUGO_DIR"
hugo --gc --minify

# Copy build output to repo root public/ for CF Pages
rm -rf "${PUBLIC_DIR:?}"/*
cp -r public/* "$PUBLIC_DIR/"

echo "✅ Hugo build and deploy complete"
