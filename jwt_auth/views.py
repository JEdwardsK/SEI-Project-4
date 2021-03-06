from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.conf import settings
import jwt

from .serializers.common import UserSerializer


User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        # run user through serializer
        user_to_create = UserSerializer(data=request.data)
        # check if user is valid
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        # get some data off the request
        email = request.data.get('email')
        password = request.data.get('password')

        # get the user from the db
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid credentials')
        if not user_to_login.check_password(password): # check password against hashed version in db
            raise PermissionDenied(detail='Invalid credentials')

        # generate expiry time for token
        token_expiry = datetime.now() + timedelta(days=7)
        #generate token
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(token_expiry.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({ 'token': token, 'message': f'Welcome back {user_to_login.username}'})

class UserDetailView(APIView):

        # identify the user from the request id
    def get(self, _request, pk):
        # get the user from the database
        try:
            user = User.objects.get(pk = pk)
            print('user: ', user)
        except User.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested user")
        # return the user found in the response
        serialised_user = UserSerializer(user)
        return Response(serialised_user.data, status = status.HTTP_200_OK)
