# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Street(models.Model):
    street_id = models.AutoField(primary_key=True)
    street_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'street'

    def __str__(self):
        return self.street_name


class House(models.Model):
    house_id = models.AutoField(primary_key=True)
    street = models.ForeignKey(Street, models.DO_NOTHING)
    house_number = models.FloatField()

    class Meta:
        managed = False
        db_table = 'house'
        unique_together = (('street_id', 'house_number'),)

    def __str__(self):
        return f"{self.street_id}, {self.house_number}"


class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    route_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'route'

    def __str__(self):
        return self.route_name

class RouteComponents(models.Model):
    route = models.OneToOneField(Route, models.DO_NOTHING, primary_key=True)
    follow_up_number = models.IntegerField()
    house = models.ForeignKey(House, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'route_components'
        unique_together = (('route_id', 'follow_up_number'),)

    def __str__(self):
        return f"{self.route_id}: {self.follow_up_number}; {self.house_id}"
