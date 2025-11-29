# Bingo Offline (React Native)

Aplicación móvil creada con React Native CLI para gestionar cartones de bingo totalmente offline. Permite crear, duplicar, editar y jugar con cartones B-I-N-G-O (1–75) sin conexión, almacenando todo en AsyncStorage.

## Estructura
- `App.js`: entrada principal que envuelve la navegación en el provider global.
- `src/components`: componentes reutilizables (cartones, reboleteo, inputs).
- `src/context`: contexto global con persistencia en AsyncStorage.
- `src/screens`: pantallas (Inicio, creación, edición, detalle, reboleteo, calendario).
- `src/navigation`: navegación Drawer + Stack con menú “☰”.
- `src/utils/bingo.js`: helpers de normalización, marcado y progreso.

## Scripts
- `npm start` – inicia Metro.
- `npm run android` – lanza en dispositivo/emulador Android (requiere entorno nativo configurado).
- `./gradlew assembleRelease` – compila APK de producción desde la carpeta `android` (añade el SDK y NDK necesarios).

## Notas
- Toda la data (cartones, reboleteo y marcados) se guarda en AsyncStorage para uso offline.
- La entrada de balotas se normaliza siempre a formato Letra+Número (ej. `B2`, `N33`).
- El calendario muestra cartones ordenados automáticamente por porcentaje de progreso.
