# 🌐 TranslateFree Bot

¡Bienvenido a **TranslateFree**! Un bot de Discord profesional para traducción automática entre canales, con soporte para webhooks y comandos personalizados. 🚀

---

## ✨ Características

-   🔄 Traducción automática entre dos idiomas en canales configurados
-   🤖 Traducción usando webhooks (nombre y avatar del usuario original)
-   🛠️ Comandos clásicos (no slash)
-   📦 Fácil de instalar y configurar
-   🗣️ Soporte para múltiples idiomas populares

---

## 📥 Instalación

1. **Instala las dependencias:**
    ```bash
    npm install
    ```
2. **Configura tu bot:**
    - Añade tu token de bot en `index.js` donde dice `client.login('TU_TOKEN_AQUI')`.

---

## ⚙️ Configuración

-   **config.json**

    ```json
    {
        "translateWebhook": true
    }
    ```

    -   Si `translateWebhook` es `true`, el bot usará webhooks para enviar traducciones con el nombre y avatar del usuario original.

---

## 🚀 Uso

-   **Configura un canal para traducción:**
    En Discord, escribe:

    ```
    !translate <idiomaBase> <idiomaDestino>
    ```

    Ejemplo:

    ```
    !translate español ruso
    ```

    El bot guardará la configuración y comenzará a traducir automáticamente los mensajes en ese canal.

-   **Idiomas soportados:**

    -   español, ingles, ruso, francés, alemán, italiano, portugués, japonés, chino
    -   Puedes usar el nombre o el código ISO (ej: `es`, `en`, `ru`)

-   **Traducción automática:**
    -   Si `translateWebhook` está activado, el mensaje original se borra y se envía la traducción usando un webhook con el nombre y avatar del usuario.
    -   Si está desactivado, el bot responde con la traducción en el canal.

---

## 🧑‍💻 Comandos

-   `!translate <idiomaBase> <idiomaDestino>` — Configura el canal para traducción automática.
-   `!cancel` — Desactiva la traducción automática en el canal actual.
-   Puedes agregar más comandos en la carpeta `/commands` siguiendo el formato de ejemplo.

---

## 🖥️ Requisitos

-   Node.js 16+
-   Un bot de Discord y su token

---

## 💡 Consejos

-   Puedes editar `channels.json` manualmente para agregar más canales.
-   Si tienes problemas con permisos de webhook, asegúrate de que el bot tenga permisos de `Manage Webhooks` y `Manage Messages`.

---

## 🏷️ Créditos

Desarrollado por [RaayyDev](https://github.com/RaayyDev) ✨

---

## 🛡️ Licencia

MIT License

---

¡Disfruta usando **TranslateFree**! 🌍🤖
