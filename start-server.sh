#!/bin/bash

# Krim AI Website Server Launcher
# This script ensures the local server starts correctly on macOS

echo "🚀 Starting Krim AI Website Server..."
echo ""

# Function to check if port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to find an available port
find_available_port() {
    local port=$1
    while check_port $port; do
        echo "⚠️  Port $port is in use, trying next port..."
        port=$((port + 1))
    done
    echo $port
}

# Kill any existing Python servers
echo "🧹 Cleaning up any existing servers..."
pkill -f "python3 -m http.server" 2>/dev/null

# Change to dist directory
cd "$(dirname "$0")/dist" || {
    echo "❌ Error: dist folder not found. Please run 'npm run build' first."
    exit 1
}

# Find available port starting from 8080
PORT=$(find_available_port 8080)

echo "✅ Starting server on port $PORT..."
echo ""

# Start Python HTTP server
python3 -m http.server $PORT --bind 127.0.0.1 &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Test if server is running
if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ | grep -q "200"; then
    echo "✅ Server is running successfully!"
    echo ""
    echo "======================================"
    echo "🌐 Access your site at:"
    echo "   http://localhost:$PORT"
    echo ""
    echo "🔺 The triangle favicon should appear in your browser tab!"
    echo ""
    echo "📝 To stop the server, press Ctrl+C"
    echo "======================================"
    echo ""
    
    # Keep script running and handle Ctrl+C
    trap "echo ''; echo '🛑 Stopping server...'; kill $SERVER_PID 2>/dev/null; exit 0" INT TERM
    
    # Wait for the server process
    wait $SERVER_PID
else
    echo "❌ Failed to start server. Please check for errors."
    kill $SERVER_PID 2>/dev/null
    exit 1
fi