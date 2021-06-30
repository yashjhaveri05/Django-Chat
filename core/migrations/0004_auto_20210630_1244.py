# Generated by Django 3.2.4 on 2021-06-30 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20210630_1234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='messagemodel',
            name='file_field',
        ),
        migrations.AddField(
            model_name='messagemodel',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='image'),
        ),
    ]