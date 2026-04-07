#!/usr/bin/env python3
"""
AlgoViz — Simple HTTP server to serve the Algorithm Visualizer.
Run: python3 server.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import os
import webbrowser
import threading
import signal
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Colorful terminal output
        code = args[1] if len(args) > 1 else '???'
        color = '\033[92m' if str(code).startswith('2') else '\033[91m'
        reset = '\033[0m'
        cyan  = '\033[96m'
        print(f"  {color}[{code}]{reset} {cyan}{args[0]}{reset}")

    def end_headers(self):
        # Add CORS headers for local dev
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


def open_browser(url, delay=0.8):
    """Open browser after a short delay to let server start."""
    import time
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print(f"\n  \033[93m→ Browser opened at {url}\033[0m\n")
    except Exception:
        pass


def run():
    url = f"http://localhost:{PORT}"

    print("\n" + "═" * 52)
    print("  \033[96m[ALGO VIZ]\033[0m  Algorithm Visualizer Server")
    print("═" * 52)
    print(f"  \033[92m✓\033[0m  Serving from: {DIRECTORY}")
    print(f"  \033[92m✓\033[0m  URL: \033[4m{url}\033[0m")
    print(f"  \033[93m→\033[0m  Press Ctrl+C to stop")
    print("═" * 52 + "\n")

    # Try to open browser automatically
    t = threading.Thread(target=open_browser, args=(url,), daemon=True)
    t.start()

    def handle_sigint(sig, frame):
        print("\n\n  \033[91m[STOPPED]\033[0m  Server shut down.\n")
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_sigint)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.allow_reuse_address = True
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    # Allow custom port via argument
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port: {sys.argv[1]}, using default {PORT}")
    run()
