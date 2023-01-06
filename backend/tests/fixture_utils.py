import copy
from typing import Dict

from _pytest.fixtures import SubRequest


def get_marker_kwargs(pytest_fixture_request: SubRequest, pytest_marker_name: str, **kwargs):
    """
    Example:
        @pytest.mark.user__factory(username="Name")
        def test_get_ok(user):
            pass

    Here we mark "user" fixture and try to override "username".
    So, we need to get these values (kwargs)

    Result:
        {"username": "Name"}
    """
    markers = [*pytest_fixture_request.node.iter_markers(pytest_marker_name)]
    result = copy.deepcopy(kwargs)
    for m in reversed(markers):
        result.update(copy.deepcopy(m.kwargs))
    return result


def get_factory_kwargs(pytest_fixture_request: SubRequest, factory_name: str, **kwargs) -> Dict:
    """ """
    factory_kwarg = get_marker_kwargs(pytest_fixture_request, f"{factory_name}__factory")
    factory_kwarg.update(kwargs)
    return factory_kwarg
