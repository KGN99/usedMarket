import os
import sys
from pathlib import Path

from django.core.asgi import get_asgi_application

# This allows easy placement of apps within the interior
# conversa_dj directory.

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(ROOT_DIR / "api"))

# If DJANGO_SETTINGS_MODULE is unset, default to the local settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

# This application object is used by any ASGI server configured to use this file.
django_application = get_asgi_application()

# Import websocket application here, so apps from django_application are loaded first
from api import routing  # noqa isort:skip

from channels.routing import ProtocolTypeRouter, URLRouter  # noqa isort:skip


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
    }
)