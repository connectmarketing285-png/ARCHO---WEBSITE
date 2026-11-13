# Studio del blog de ARCHO

Panel de edición del blog (Sanity). Es un proyecto aparte del sitio: tiene su
propio `package.json`, no entra en el bundle de `archo.com.mx` ni en su build, y
se publica en `*.sanity.studio` para que el equipo entre desde el navegador sin
instalar nada.

- Proyecto: `527gs4h8` · Dataset: `production` (público, el sitio lo lee sin token)
- Requiere Node 22.12 o superior

## Comandos

Desde esta carpeta (`studio/`):

```bash
npm install          # la primera vez
npm run dev          # Studio local en http://localhost:3333
npm run validar      # revisa el esquema sin abrir el Studio
npm run deploy       # compila y publica en https://<nombre>.sanity.studio
```

## Publicar el Studio (la primera vez)

1. `npx sanity login`, con la cuenta de Connect que administra el proyecto.
2. `npm run deploy`. La CLI pregunta el nombre del host: el Studio queda en
   `https://<nombre>.sanity.studio`. El nombre es único entre todos los
   proyectos de Sanity; si está tomado, pide otro.
3. Para no volver a escribirlo, ponlo en `sanity.cli.ts` como `studioHost`.

Los despliegues siguientes son solo `npm run deploy`. El dominio
`*.sanity.studio` queda autorizado (CORS) solo; `localhost:3333` también viene
autorizado si el proyecto se creó con la CLI. Si `npm run dev` da un error de
CORS, se añade en sanity.io/manage → proyecto → API → CORS origins, con
credenciales permitidas.

## Invitar al equipo

sanity.io/manage → proyecto → **Members** → **Invite members**, con el correo de
cada persona. Cada invitado entra con Google, GitHub o correo y contraseña.

Rol recomendado para quien escribe: **Editor** (crea, edita y publica). El de
**Administrator** se reserva para quien gestiona el proyecto, porque puede
cambiar la configuración, las claves y los miembros. El plan gratuito tiene un
límite de usuarios: revísalo en la misma pantalla antes de invitar.

## Reglas del esquema que conviene conocer

- **La URL de un artículo no se puede cambiar una vez publicado.** El campo queda
  bloqueado y la validación impide publicar otra. Si de verdad hay que
  cambiarla, la vía es despublicar, cambiarla y volver a publicar, sabiendo que
  la URL vieja dejará de funcionar (404) para quien la tenga guardada o en
  Google.
- **El cuerpo no admite H1.** El título del artículo ya es el H1 de la página.
- **La imagen principal y su texto alternativo son obligatorios.**
- Si se añaden formatos al cuerpo (`schemaTypes/cuerpo.ts`), hay que añadirlos
  también al componente que los pinta en el sitio.
