"""
ASGI config for chat project.
It exposes the ASGI callable as a module-level variable named ``application``.
For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chat.settings')

from django.core.asgi import get_asgi_application

application = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter

from channels.auth import AuthMiddlewareStack
from core import routing as core_routing



application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                core_routing.websocket_urlpatterns
            )
        ),


        "https": get_asgi_application(),
    })
