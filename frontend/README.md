# Frontend — Sistema Hotel San Agucho

SPA en React finalizada, con arquitectura por features y lista para consumo de API REST, autenticacion y roles.

## Estado
Hecho y listo para desplegar.

## Comandos
Instalar dependencias:
- npm install

Arranque en desarrollo:
- npm run dev

Build de produccion:
- npm run build

Preview del build:
- npm run preview

## Estructura
src/
- assets/
  - images/
  - icons/
  - fonts/
- styles/
  - base/
  - components/
  - layouts/
  - themes/
- routes/
- guards/
- context/
- hooks/
- services/
  - api/
  - auth/
- utils/
- components/
  - layout/
  - common/
- pages/
- features/
  - auth/
    - pages/
    - components/
    - services/
    - hooks/
  - reservas/
    - pages/
    - components/
    - services/
  - habitaciones/
    - pages/
    - components/
    - services/
  - usuarios/
    - pages/
    - components/
    - services/

## Notas de implementacion
- Arquitectura por features para escalar sin sobre-ingenieria.
- Separacion clara entre UI, logica y datos.

## Autor
Karlos Cajibioy
