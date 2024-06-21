# Generated by Django 4.2.6 on 2024-06-20 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
                ('tipo1', models.CharField(max_length=30)),
                ('tipo2', models.CharField(blank=True, max_length=30, null=True)),
                ('region', models.CharField(max_length=100)),
            ],
        ),
    ]
