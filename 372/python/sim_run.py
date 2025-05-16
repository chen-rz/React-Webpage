import sys
import threading
from pydantic import BaseModel
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

# Define a model for the expected parameters
class TrainingParams(BaseModel):
    dataset: str
    model: str
    strategy: str
    epochs: int

@fastapi_app.post("/start")
def start_process(params: TrainingParams):
    # Access parameters from the request
    print(f"Received parameters: dataset={params.dataset}, model={params.model}, strategy={params.strategy}, epochs={params.epochs}")
    
    # Run the training task in a new thread (so FastAPI stays responsive)
    threading.Thread(target=long_running_task).start()
    return {"status": "started", "params": params.dict()}


# The actual training simulation: replace this with your FL training
def long_running_task():
    
    sys.stdout = wsStream  # Redirect stdout to the WebSocket stream
    sys.stderr = wsStream  # Redirect stderr to the same WebSocket stream
    
    import time
    import random

    print("INFO flwr 2025-05-15 17:13:35,211 | app.py:175 | Starting Flower simulation, config: ServerConfig(num_rounds=500, round_timeout=None)")
    time.sleep(1)
    print("2025-05-15 17:13:37,593 INFO worker.py:1612 -- Started a local Ray instance. View the dashboard at http://127.0.0.1:8265")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:38,609 | app.py:210 | Flower VCE: Ray initialized with resources: {'object_store_memory': 128172523929.0, 'memory': 289069222503.0, 'CPU': 52.0, 'node:__internal_head__': 1.0, 'node:10.128.201.131': 1.0, 'GPU': 8.0, 'accelerator_type:G': 1.0}")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:38,609 | app.py:224 | Flower VCE: Resources for each Virtual Client: {'num_cpus': 4, 'num_gpus': 0}")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:38,632 | app.py:270 | Flower VCE: Creating VirtualClientEngineActorPool with 13 actors")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:38,633 | server.py:89 | Initializing global parameters")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:38,633 | server.py:276 | Requesting initial parameters from one random client")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:42,891 | server.py:280 | Received initial parameters from one random client")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:13:42,891 | server.py:91 | Evaluating initial parameters")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:14:47,681 | server.py:94 | initial parameters (loss, other metrics): 0.0460516881942749, {'accuracy': 0.1}")
    time.sleep(1)
    print("INFO flwr 2025-05-15 17:14:47,681 | server.py:104 | FL starting")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 17:15:28,253 | strategy.py:188 | Round 1 selected cids [11, 27, 39, 13, 29, 23, 22, 32, 12, 5, 24, 38, 41, 47, 31]")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 17:15:28,254 | strategy.py:197 | Round 1 offloading plan: {11: 0, 27: 0, 39: 0, 13: 0, 29: 1, 23: 1, 22: 1, 32: 1, 12: 0, 5: 1, 24: 0, 38: 1, 41: 0, 47: 0, 31: 0}")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 17:15:28,437 | server.py:222 | fit_round 1: strategy sampled 15 clients (out of 50)")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:09:32,024 | server.py:236 | fit_round 1 received 15 results and 0 failures")
    time.sleep(1)
    print("WARNING flwr 2025-05-15 18:09:38,569 | strategy.py:774 | No fit_metrics_aggregation_fn provided")
    time.sleep(1)
    print("INFO flwr 2025-05-15 18:10:40,781 | server.py:125 | fit progress: (1, 0.04518366396427154, {'accuracy': 0.2052}, 3353.099472189322)")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:10:40,783 | server.py:173 | evaluate_round 1: strategy sampled 15 clients (out of 50)")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:11:10,372 | server.py:187 | evaluate_round 1 received 15 results and 0 failures")
    time.sleep(1)
    print("WARNING flwr 2025-05-15 18:11:10,372 | strategy.py:809 | No evaluate_metrics_aggregation_fn provided")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:11:46,056 | strategy.py:113 | Involvement history: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:11:46,074 | strategy.py:188 | Round 2 selected cids [8, 2, 18, 7, 42, 6, 45, 20, 17, 44, 0, 1, 15, 27, 39]")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:11:46,075 | strategy.py:197 | Round 2 offloading plan: {8: 1, 2: 0, 18: 1, 7: 0, 42: 0, 6: 0, 45: 1, 20: 1, 17: 0, 44: 0, 0: 1, 1: 0, 15: 0, 27: 0, 39: 1}")
    time.sleep(1)
    print("DEBUG flwr 2025-05-15 18:11:46,108 | server.py:222 | fit_round 2: strategy sampled 15 clients (out of 50)")

    for i in range(10):
        ptcptng_devices = random.sample(range(50), 15)
        print(f"Training Round {i} ... Participating Devices: {ptcptng_devices}")  # These lines are sent live to frontend
        time.sleep(1)
    print("[Training] Done!")  # Final log message

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

    print("⚠ Try a very very long line of text to see how it handles it.")
    time.sleep(1)
    print("Yesterday, December 7, 1941 - a date which will live in infamy - the United States of America was suddenly and deliberately attacked by naval and air forces of the Empire of Japan.")
    time.sleep(1)
    print("The United States was at peace with that nation and, at the solicitation of Japan, was still in conversation with its government and its emperor looking toward the maintenance of peace in the Pacific. Indeed, one hour after Japanese air squadrons had commenced bombing in the American island of Oahu, the Japanese ambassador to the United States and his colleague delivered to our Secretary of State a formal reply to a recent American message. While this reply stated that it seemed useless to continue the existing diplomatic negotiations, it contained no threat or hint of war or armed attack. It will be recorded that the distance of Hawaii from Japan makes it obvious that the attack was deliberately planned many days or even weeks ago. During the intervening time, the Japanese government has deliberately sought to deceive the United States by false statements and expressions of hope for continued peace.")
    time.sleep(1)
    print("The attack yesterday on the Hawaiian Islands has caused severe damage to American naval and military forces. I regret to tell you that very many American lives have been lost. In addition, American ships have been reported torpedoed on the high seas between San Francisco and Honolulu.")
    time.sleep(1)
    print("Yesterday, the Japanese government also launched an attack against Malaya. Last night, Japanese forces attacked Hong Kong. Last night, Japanese forces attacked Guam. On the same day, Japanese forces attacked the Philippine Islands. Last night, the Japanese attacked Wake Island. And this morning, the Japanese attacked Midway Island.")
    time.sleep(1)
    print("Japan has, therefore, undertaken a surprise offensive extending throughout the Pacific area. The facts of yesterday speak for themselves. The people of the United States have already formed their opinions and well understand the implications to the very life and safety of our nation.")
    time.sleep(1)
    print("As commander in chief of the Army and Navy, I have directed that all measures be taken for our defense. But always will we remember the character of the onslaught against us. No matter how long it may take us to overcome this premeditated invasion, the American people in their righteous might will win through to absolute victory.")
    time.sleep(1)
    print("I believe that I interpret the will of the Congress and of the people when I assert that we will not only defend ourselves to the uttermost, but will make it very certain that this form of treachery shall never endanger us again.")
    time.sleep(1)
    print("Hostilities exist. There is no blinking at the fact that our people, our territory and our interests are in grave danger. With confidence in our armed forces, with the unbounded determination of our people, we will gain the inevitable triumph - so help us God.")
    time.sleep(1)
    print("I ask that the Congress declare that since the unprovoked and dastardly attack by Japan on Sunday, December 7, 1941, a state of war has existed between the United States and the Japanese Empire.")
    time.sleep(1)

    print("Now, let's switch to a poem: 'The Gunpowder Plot' by Anonymous")
    time.sleep(1)
    print("Remember, remember, the fifth of November,")
    time.sleep(1)
    print("The Gunpowder Treason and Plot.")
    time.sleep(1)
    print("I see no reason why Gunpowder Treason")
    time.sleep(1)
    print("Should ever be forgot.")
    time.sleep(1)
    print("Guy Fawkes, Guy Fawkes, 'twas his intent")
    time.sleep(1)
    print("To blow up the King and Parliament.")
    time.sleep(1)
    print("Three score barrels of powder below")
    time.sleep(1)
    print("To prove old England's overthrow.")
    time.sleep(1)
    print("By God's providence, he was catch'd")
    time.sleep(1)
    print("With a dark lantern and burning match.")
    time.sleep(1)

    print("Now, let's switch to a song in French: 'L'hymne à l'amour' by Édith Piaf")
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
