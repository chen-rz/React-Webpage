import sys
import time
import threading
import asyncio  # For async operations (non-blocking)
from fastapi import FastAPI, WebSocket  # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore

# Create the FastAPI app
fastapi_app = FastAPI()

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A list to keep track of all connected WebSocket clients
clients = []

# This is the main event loop for the FastAPI app (required for async operations)
main_event_loop = asyncio.get_event_loop()

# WebSocket endpoint: frontend connects here to receive live logs
@fastapi_app.websocket("/ws/logs")
async def log_stream(websocket: WebSocket):
    await websocket.accept()  # Accept the connection
    clients.append(websocket)  # Add to our client list
    try:
        # Keep the connection open (doing nothing here, just holding)
        while True:
            await asyncio.sleep(1)
    except:
        clients.remove(websocket)  # Remove if client disconnects

# This function sends a line of log text to all connected clients
def broadcast_log(line: str):
    for ws in clients:
        try:
            asyncio.run_coroutine_threadsafe(ws.send_text(line), main_event_loop)
        except:
            pass


# This is a fake file-like object that catches `print()` output
# and forwards it to the WebSocket clients instead of the console
class StreamToWebSocket:
    def write(self, buf):
        if buf.strip():  # Don't send empty lines
            broadcast_log(buf)  # Send log line to all WebSocket clients

    def flush(self):
        pass  # Required method for file-like interface (not needed here)

wsStream = StreamToWebSocket()

# REST API: Called from frontend to start training
@fastapi_app.post("/start")
def start_process():
    # Run the training task in a new thread (so FastAPI stays responsive)
    threading.Thread(target=long_running_task).start()
    return {"status": "started"}


# The actual training simulation: replace this with your FL training
def long_running_task():
    
    sys.stdout = wsStream  # Redirect stdout to the WebSocket stream
    sys.stderr = wsStream  # Redirect stderr to the same WebSocket stream

    print("Hello, world!") # English
    time.sleep(1)
    print("你好，世界！") # Chinese
    time.sleep(1)
    print("Bonjour, le monde !") # French
    time.sleep(1)
    print("Hola, mundo !") # Spanish
    time.sleep(1)
    print("Hallo, Welt !") # German
    time.sleep(1)
    print("Ciao, mondo !") # Italian
    time.sleep(1)
    print("こんにちは、世界！") # Japanese
    time.sleep(1)
    print("안녕하세요, 세계!")  # Korean
    time.sleep(1)
    print("Привет, мир!")  # Russian
    time.sleep(1)
    print("مرحبا بالعالم")  # Arabic
    time.sleep(1)
    print("שלום עולם")  # Hebrew
    time.sleep(1)
    print("नमस्ते दुनिया")  # Hindi
    time.sleep(1)
    print("Olá, mundo!")  # Portuguese
    time.sleep(1)
    print("Merhaba dünya")  # Turkish
    time.sleep(1)
    print("สวัสดีชาวโลก")  # Thai
    time.sleep(1)
    print("Xin chào thế giới")  # Vietnamese
    time.sleep(1)
    print("Γειά σου Κόσμε")  # Greek
    time.sleep(1)
    print("Cześć świecie")  # Polish
    time.sleep(1)
    print("Hej världen")  # Swedish
    time.sleep(1)
    print("Hallo wereld")  # Dutch
    time.sleep(1)

    lyrics = [
        "Le ciel bleu sur nous peut s'effondrer",
        "Et la terre peut bien s'écrouler",
        "Peu m'importe si tu m'aimes",
        "Je me fous du monde entier",
        "Tant que l'amour inondera mes matins",
        "Tant que mon corps frémira sous tes mains",
        "Peu m'importent les problèmes",
        "Mon amour, puisque tu m'aimes",
        "J'irais jusqu'au bout du monde",
        "Je me ferais teindre en blonde",
        "Si tu me le demandais",
        "J'irais décrocher la lune",
        "J'irais voler la fortune",
        "Si tu me le demandais",
        "Je renierais ma patrie",
        "Je renierais mes amis",
        "Si tu me le demandais",
        "On peut bien rire de moi",
        "Je ferais n'importe quoi",
        "Si tu me le demandais",
        "Si un jour la vie t'arrache à moi",
        "Si tu meurs que tu sois loin de moi",
        "Peu m'importe si tu m'aimes",
        "Car moi je mourrai aussi",
        "Nous aurons pour nous l'éternité",
        "Dans le bleu de toute l'immensité",
        "Dans le ciel, plus de problèmes",
        "Mon amour, crois-tu qu'on s'aime ?",
        "Dieu réunit ceux qui s'aiment"
    ]

    for line in lyrics:
        print(line)
        time.sleep(1)

    for i in range(10):
        print(f"[Training] Round {i} ...")  # These lines are sent live to frontend
        time.sleep(1)
    print("[Training] Done!")  # Final log message
