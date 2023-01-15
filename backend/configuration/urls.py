from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(("entrypoint.urls", "entrypoint"), namespace="entrypoint")),
    path("api/v1/", include(("weight_tracker.urls", "weight_tracker"), namespace="weight_tracker")),
]


if settings.DEBUG:
    urlpatterns += [
        path("silk/", include("silk.urls", namespace="silk")),
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
        path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    ]
