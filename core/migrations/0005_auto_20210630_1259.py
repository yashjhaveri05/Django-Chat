# Generated by Django 3.2.4 on 2021-06-30 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20210630_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='messagemodel',
            name='file_field',
            field=models.FileField(blank=True, null=True, upload_to='', verbose_name='file_field'),
        ),
        migrations.AlterField(
            model_name='messagemodel',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='image'),
        ),
    ]
