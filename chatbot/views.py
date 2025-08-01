from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .qa_chain import get_rag_chain

class ChatbotAPIView(APIView):
    def post(self, request):
        question = request.data.get("question", "")
        if not question:
            return Response({"error": "No question provided."}, status=status.HTTP_400_BAD_REQUEST)

        rag_chain = get_rag_chain()
        result = rag_chain.run(question)
        return Response({"answer": result})
