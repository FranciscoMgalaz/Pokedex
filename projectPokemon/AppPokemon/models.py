from django.db import models

class Pokemon(models.Model):
    nombre = models.CharField(max_length=30)
    tipo1 = models.CharField(max_length=30)
    tipo2 = models.CharField(max_length=30, blank=True, null=True)
    region = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
