# Generated by Django 4.1.2 on 2022-11-09 18:30

from django.db import migrations

def create_data(apps, schema_editor):
    Route = apps.get_model('city', 'Route')
    Route(route_name="toHome").save()

    Street = apps.get_model('city', 'Street')
    Street(street_name="Улица 40 лет октября").save()
class Migration(migrations.Migration):

    dependencies = [
        ('city', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
