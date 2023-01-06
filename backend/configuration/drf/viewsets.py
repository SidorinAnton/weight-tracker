from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet


class BaseListModelViewSet(mixins.ListModelMixin, GenericViewSet):
    pass


class BaseRetrieveModelViewSet(mixins.RetrieveModelMixin, GenericViewSet):
    @extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)])
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class BaseCreateModelViewSet(mixins.CreateModelMixin, GenericViewSet):
    pass


class BaseUpdateModelViewSet(mixins.UpdateModelMixin, GenericViewSet):
    @extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)])
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)])
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class BaseDestroyModelViewSet(mixins.DestroyModelMixin, GenericViewSet):
    @extend_schema(
        parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)],
        request=None,
        responses=None,
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
