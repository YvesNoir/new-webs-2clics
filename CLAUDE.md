# Proyecto Web Inmobiliarias - Constructor tipo Wix

## Descripción del Proyecto
Sistema web para inmobiliarias con constructor visual tipo Wix. Cada cliente tendrá su propia instancia personalizable con bloques prediseñados.

## Stack Tecnológico
- **Frontend/Backend**: Next.js con TypeScript
- **Base de datos**: PostgreSQL (futuro) - por ahora diseñar para migración fácil
- **Estilos**: Tailwind CSS
- **ORM**: Prisma (recomendado para TypeScript + PostgreSQL)

## Arquitectura del Proyecto

### Entidades de Base de Datos
1. **Propiedades**
   - Información básica (título, descripción, precio, ubicación)
   - Imágenes/multimedia
   - Características (habitaciones, baños, m², etc.)
   - Estado (disponible, vendida, alquilada)

2. **Agentes**
   - Datos personales y contacto
   - Foto de perfil
   - Propiedades asignadas

3. **Contactos/Consultas**
   - Datos del interesado
   - Propiedad consultada
   - Mensaje/consulta
   - Estado (nueva, respondida, cerrada)

4. **Configuración del Sitio**
   - Colores corporativos
   - Logo
   - Información de la inmobiliaria
   - Configuración de bloques seleccionados
   - Layout del sitio

### Funcionalidades Principales

#### Panel de Administración (`/edit-admin`)
- **Constructor Visual**: Pantalla dividida con preview en tiempo real
- **Gestión de Bloques**: Selección entre 3-4 bloques prediseñados
- **Configuración**: Colores, logo, información de la empresa
- **Gestión de Propiedades**: CRUD completo
- **Gestión de Agentes**: CRUD completo
- **Consultas Recibidas**: Visualización y gestión

#### Sitio Público
- **Páginas dinámicas** basadas en configuración de bloques
- **Listado de propiedades** con filtros
- **Detalle de propiedad**
- **Formularios de contacto**
- **Páginas institucionales**

### Bloques Prediseñados (Inicial)
1. **Hero Banner**: Imagen principal + texto + CTA
2. **Carrusel Propiedades Destacadas**: Slider con propiedades seleccionadas
3. **Búsqueda Rápida**: Formulario de filtros básicos
4. **Información Inmobiliaria**: Datos de contacto + descripción

### Estructura de Directorios
```
/src
  /app
    /edit-admin         # Panel administrativo
    /(public)           # Sitio público dinámico
  /components
    /admin              # Componentes del panel admin
    /blocks             # Bloques reutilizables
    /ui                 # Componentes base (shadcn/ui)
  /lib
    /db                 # Configuración Prisma
    /utils              # Utilidades
  /types                # Tipos TypeScript
```

### Autenticación
- **Un solo admin por instalación**
- Acceso a `/edit-admin` protegido
- Futuro: agentes con acceso limitado a consultas

### Deployment
- **Instancia única por cliente**
- Cada inmobiliaria tendrá su propia URL y base de datos
- Configuración inicial durante instalación

## Comandos de Desarrollo
```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run lint         # Linting
npm run typecheck    # Verificación TypeScript
```

## Próximos Pasos
1. Configurar proyecto Next.js con TypeScript
2. Instalar Tailwind CSS
3. Configurar Prisma con esquema inicial
4. Crear estructura básica de directorios
5. Implementar autenticación básica
6. Desarrollar primer bloque (Hero Banner)
7. Crear panel admin básico

# IMPORTANTE - IDIOMA
SIEMPRE responde en CASTELLANO/ESPAÑOL.
NUNCA respondas en inglés, sin importar el contexto o la pregunta.
Todas las respuestas, explicaciones, comentarios y comunicación debe ser en castellano.
Los nombres de variables, funciones y archivos pueden seguir convenciones en inglés, pero toda explicación debe ser en castellano.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.