# Generated by Django 4.1.2 on 2022-11-09 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='House',
            fields=[
                ('house_id', models.AutoField(primary_key=True, serialize=False)),
                ('house_number', models.FloatField()),
            ],
            options={
                'db_table': 'house',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('route_id', models.AutoField(primary_key=True, serialize=False)),
                ('route_name', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'route',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Street',
            fields=[
                ('street_id', models.AutoField(primary_key=True, serialize=False)),
                ('street_name', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'street',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RouteComponents',
            fields=[
                ('route', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='city.route')),
                ('follow_up_number', models.IntegerField()),
            ],
            options={
                'db_table': 'route_components',
                'managed': False,
            },
        ),
    ]
