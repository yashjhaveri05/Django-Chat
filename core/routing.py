from core import consumers

from django.conf.urls import url

websocket_urlpatterns = [
    url(r'^wss$', consumers.ChatConsumer.as_asgi()),
]
