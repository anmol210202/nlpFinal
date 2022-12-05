from rest_framework.decorators import api_view
from rest_framework.response import Response
from .backend import find__
import json
@api_view(['GET', 'POST'])
def score(request):
    """
    List all code snippets, or create a new snippet.
    """
    dd = find__(request.data['data'])
    print(dd)
    return Response({"data":json.dumps(dd)})
