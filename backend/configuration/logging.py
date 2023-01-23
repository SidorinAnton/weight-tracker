import logging
import os
import socket
from datetime import datetime


class Formatter(logging.Formatter):
    def __init__(self, *args, **kwargs):
        print("LOG !!!!!!!!!!!")
        super().__init__("{host} {timestamp} {time} {level} {pid}{hash} >>> {message}", None, "{")

    def format(self, record):
        now = datetime.now()

        record.host = socket.gethostname()
        record.time = now.strftime("%Y-%m-%dT%H:%M:%S.%f")
        record.timestamp = int(now.timestamp())
        record.level = record.levelname[0]
        record.pid = os.getpid()

        if getattr(record, "hash", ""):
            record.hash = " " + record.hash.strip()
        else:
            record.hash = ""

        return super().format(record)
