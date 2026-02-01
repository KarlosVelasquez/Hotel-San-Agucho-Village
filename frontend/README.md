# Frontend — Sistema Hotel San Agucho

SPA en React con arquitectura por features. Preparada para reservas, autenticación, roles y consumo de API REST.

## Comandos
Instalar dependencias:
- npm install

Arranque en desarrollo:
- npm run dev

Build de producción:
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

## Responsabilidades
- assets: recursos estáticos.
- styles: estilos globales y temas.
- routes: configuración de rutas.
- guards: validación de autenticación y roles.
- context: estado global.
- hooks: hooks reutilizables.
- services: acceso a API y auth.
- utils: helpers compartidos.
- components: UI reutilizable.
- pages: vistas de alto nivel.
- features: módulos por dominio.

## Decisiones
- Arquitectura por features para escalar sin sobre-ingeniería.
- Separación clara entre UI, lógica y datos.
