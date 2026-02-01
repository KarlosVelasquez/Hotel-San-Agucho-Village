# Backend — HotelSanAgucho.Api

API REST en ASP.NET Core con arquitectura en capas. Preparada para EF Core (Code First), JWT, validaciones, roles y SQL Server.

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

## Responsabilidades
- Controllers: endpoints HTTP.
- Services: lógica de negocio.
- Repositories: acceso a datos.
- Interfaces: contratos.
- Models/Entities: entidades del dominio.
- DTOs: modelos de request/response.
- Data/DbContext: EF Core y configuraciones.
- Middlewares: cross-cutting (errores, JWT).
- Migrations: historial EF Core.
- Configuration: configuración de dependencias y opciones.

## Decisiones
- Capas explícitas para separar responsabilidades y facilitar pruebas.
- DTOs para aislar el modelo del contrato público.
- Repositorios para encapsular EF Core.
