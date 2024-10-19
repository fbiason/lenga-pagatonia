# GRUPO_7_LENGA_PATAGONIA documentation!

## Description

El grupo 7 analizaremos los datos de producción proporcionados por la empresa Lenga Patagonia, para evaluar la calidad de la madera extraida en distintas temporadas y áreas de explotación, con el fin de identificar patrones de calidad que permitan optimizar la gestión forestal y productiva. Integrantes: Biason Franco; Lapa Gustavo; Pérez Enzo; Cuevas Daniela.

## Commands

The Makefile contains the central entry points for common tasks related to this project.

### Syncing data to cloud storage

* `make sync_data_up` will use `aws s3 sync` to recursively sync files in `data/` up to `s3://s3://my-aws-bucket/data/`.
* `make sync_data_down` will use `aws s3 sync` to recursively sync files from `s3://s3://my-aws-bucket/data/` to `data/`.


