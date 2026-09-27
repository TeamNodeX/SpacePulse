#Import this class and replace cv2.VideoCapture with LatestFrameStream
import cv2
import threading
import queue

class LatestFrameStream:
    """Designed to be a drop-in replacement for cv2.VideoCapture that always returns
    the most recent frame, discarding any stale ones in between."""

    def __init__(self, source):
        self.cap = cv2.VideoCapture(source)
        if not self.cap.isOpened():
            raise RuntimeError(f"Could not open stream: {source}")
        self.q = queue.Queue(maxsize=1)
        self.stopped = False
        self.thread = threading.Thread(target=self._reader, daemon=True)
        self.thread.start()

    def _reader(self):
        while not self.stopped:
            ret, frame = self.cap.read()
            if not ret:
                continue  # or trigger reconnect logic
            if not self.q.empty():
                try:
                    self.q.get_nowait()  # drop the stale frame
                except queue.Empty:
                    pass
            self.q.put(frame)

    def read(self):
        """Matches cv2.VideoCapture.read() signature: (ret, frame)."""
        frame = self.q.get()
        return True, frame

    def isOpened(self):
        return self.cap.isOpened()

    def release(self):
        self.stopped = True
        self.thread.join()
        self.cap.release()
