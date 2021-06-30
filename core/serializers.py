from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from core.models import MessageModel
from rest_framework.serializers import ModelSerializer, CharField


class MessageModelSerializer(ModelSerializer):
    user = CharField(source='user.username', read_only=True)
    recipient = CharField(source='recipient.username')

    def create(self, validated_data):
        print(validated_data)
        print("abc")
        image = validated_data['image']
        file_field = validated_data['file_field']
        body=validated_data['body']
        user = self.context['request'].user
        recipient = get_object_or_404(
            User, username=validated_data['recipient']['username'])
        # if image and not body:
        #     msg = MessageModel(recipient=recipient,image=image,user=user)
        # elif body and not image:
        #     msg = MessageModel(recipient=recipient,body=body,user=user)
        # else:
        msg = MessageModel(recipient=recipient,body=body,image=image,file_field=file_field,user=user)
        msg.save()
        return msg

    class Meta:
        model = MessageModel
        fields = ('id', 'user', 'recipient', 'timestamp', 'body', 'image', 'file_field')


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)