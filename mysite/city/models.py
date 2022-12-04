
from django.db import models


class Street(models.Model):
    street_id = models.AutoField(primary_key=True)
    street_name = models.CharField(max_length=50, unique=True)

    class Meta:
        managed = False
        db_table = 'street'
        unique_together = (('street_id', 'street_name'),)

    def __str__(self):
        return f"{self.street_name}"


class House(models.Model):
    house_id = models.AutoField(primary_key=True)
    street = models.ForeignKey(Street, models.DO_NOTHING)
    house_number = models.FloatField()

    class Meta:
        managed = False
        db_table = 'house'
        unique_together = (('street_id', 'house_number'),)

    def __str__(self):
        return f"{self.street}, {self.house_number}"


class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    route_name = models.CharField(max_length=50, blank=True, null=True, unique=True)

    class Meta:
        managed = False
        db_table = 'route'

    def __str__(self):
        return self.route_name

class RouteComponents(models.Model):
    route_comp_id = models.AutoField(primary_key=True)
    route = models.ForeignKey(Route, models.DO_NOTHING)
    follow_up_number = models.IntegerField()
    house = models.ForeignKey(House, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'route_components'
        unique_together = (('route_id', 'follow_up_number'),)

    def __str__(self):
        return f"{self.route}: {self.follow_up_number}; {self.house}"
