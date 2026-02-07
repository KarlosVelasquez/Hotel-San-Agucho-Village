# Backend — HotelSanAgucho.Api

API REST en ASP.NET Core finalizada, con arquitectura en capas y preparada para EF Core (Code First), JWT, validaciones, roles y SQL Server.

## Estado
Hecho y listo para integrar con el frontend.

## Comandos
Restaurar dependencias:
- dotnet restore

Ejecutar en desarrollo:
- dotnet run

## Estructura
- Controllers/
- Services/
- Repositories/
- Interfaces/
- Models/
  - Entities/
- DTOs/
  - Auth/
  - Reservas/
  - Habitaciones/
  - Usuarios/
- Data/
  - Configurations/
- Middlewares/
- Migrations/
- Configuration/

## Notas de implementacion
- Capas explicitas para separar responsabilidades y facilitar pruebas.
- DTOs para aislar el modelo del contrato publico.
- Repositorios para encapsular EF Core.

## Autor
Karlos Cajibioy
