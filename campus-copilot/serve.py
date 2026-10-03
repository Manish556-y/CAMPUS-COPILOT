#!/usr/bin/env python3
"""
Campus Copilot - Local Web Server Launcher
Runs a lightweight HTTP server on port 8000 and automatically opens the application in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    os.chdir(DIRECTORY)
    # Enable address reuse so restarts don't hit "Address already in use"
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"  🏛️ CAMPUS COPILOT - University Web Application")
        print(f"  🚀 Server running at: {url}")
        print(f"  📂 Serving from: {DIRECTORY}")
        print("  Press Ctrl+C to stop the server.")
        print("=" * 60)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down Campus Copilot server. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    main()
