# Donaciones por internet — Guía para decidir

**¿Para quién es esto?** Para el equipo de la iglesia que va a decidir si queremos
recibir donaciones con tarjeta por internet, además de como lo hacemos hoy.

**No necesitas saber nada de tecnología para leer esto.** Todo está explicado con
palabras sencillas. Al final hay una lista de cosas que tenemos que decidir juntos.

> Este documento **no** te dice qué hacer. Solo explica las opciones para que
> nosotros decidamos con calma y con toda la información.

---

## 1. ¿Cómo recibimos donaciones HOY?

Hoy usamos **Zelle**. La persona abre la aplicación de su banco, escribe nuestro
correo (`bethelcasadediosbroward@gmail.com`) y nos envía el dinero.

**Lo bueno de Zelle:**
- ✅ Es **gratis**. No nos quitan nada; llega el 100%.
- ✅ El dinero cae **directo** a la cuenta del banco.
- ✅ Ya funciona, ya lo tenemos.

**Lo no tan bueno de Zelle:**
- ❌ Es **manual**: la persona tiene que abrir su banco y escribir el correo a mano.
- ❌ **No sirve con tarjeta** de crédito o débito.
- ❌ **No se puede poner automático** (por ejemplo, "dona $50 cada mes solo").
- ❌ **No manda recibo** solo (el que sirve para los impuestos).
- ❌ Si alguien **no tiene Zelle** o vive fuera de EE. UU., no puede donar así.

---

## 2. ¿Qué sería lo NUEVO que estamos evaluando?

Recibir donaciones **con tarjeta** directamente en nuestra página web, con un botón
de "Donar".

Para eso se usa una empresa llamada **Stripe**.

> 🧠 **¿Qué es Stripe, en simple?**
> Es como la **maquinita de tarjetas** que hay en las tiendas... pero por internet.
> La persona pone los datos de su tarjeta en nuestra página, y el dinero llega a la
> cuenta del banco de la iglesia. Stripe es solo el "intermediario" que cobra la
> tarjeta de forma segura.

**Lo bueno de agregar tarjeta (Stripe):**
- ✅ La persona dona en **1 clic**, sin salir de la página.
- ✅ Acepta **tarjetas** de crédito y débito.
- ✅ Se puede poner **automático** (donación mensual sin que la persona haga nada).
- ✅ Manda **recibos** solo (buenos para los impuestos).
- ✅ Sirve para gente **sin Zelle** o de **otros países**.

**Lo no tan bueno:**
- ❌ **Cobra una comisión** por cada donación (más abajo se explica cuánto).
- ❌ Hay que **configurarlo** una vez (papeles, cuenta, etc.).
- ❌ Alguien tiene que **estar pendiente** de él.

---

## 3. Lo más importante: NO hay que elegir uno u otro

No tenemos que quitar Zelle. Podemos **tener los dos al mismo tiempo**:

- Quien quiera donar **gratis** → sigue usando **Zelle**.
- Quien prefiera **tarjeta** o donar **automático cada mes** → usa el botón nuevo.

Así, la comisión de Stripe **solo se aplica a quien elige tarjeta**. El resto sigue
igual que hoy.

---

## 4. ¿Cuánto cobra Stripe? (la comisión)

Por cada donación con tarjeta, Stripe se queda un pedacito. Como referencia
(a inicios de 2026 — hay que confirmar el número del día):

- Aproximadamente **2.9% + $0.30** por donación.
- Las iglesias sin fines de lucro (501(c)(3)) pueden pedir un **descuento**
  (aproximadamente **2.2% + $0.30**).

**Ejemplo fácil:** si alguien dona **$100** con tarjeta, Stripe se queda como **$3**
y a la iglesia le llegan como **$97**.

> 💡 Con Zelle esto **no pasa** (llega el 100%). Por eso conviene tener las dos:
> la tarjeta es una **comodidad** que cuesta un poquito; Zelle sigue siendo gratis.

---

## 5. Palabras que suenan feas, explicadas fácil (glosario)

| Palabra rara | Qué significa, en cristiano |
|---|---|
| **Stripe** | La "maquinita de tarjetas por internet". El intermediario que cobra. |
| **Comisión / fee** | El pedacito que se queda el intermediario por cada donación con tarjeta. |
| **Payout** | Cuando Stripe **deposita** en el banco de la iglesia el dinero acumulado. |
| **Dominio** | La dirección de la página: `bethelcasadedios.com`. |
| **HTTPS / el candadito** | Que la página es **segura** (los datos viajan protegidos). Sale un candado en el navegador. |
| **Recibo / tax receipt** | El papel que comprueba la donación, para los impuestos. |
| **Donación recurrente** | Donar **automático** cada mes, sin volver a hacerlo a mano. |
| **2FA (doble verificación)** | Una **segunda llave** para entrar a una cuenta (además de la contraseña, un código al teléfono). Más seguridad. |
| **Chargeback (contracargo)** | Cuando alguien le reclama a su banco un cobro y pide que se lo devuelvan. |
| **Fraude de tarjetas** | Ver la sección 6. 👇 |

---

## 6. Sobre la seguridad y el fraude (importante y sencillo)

**¿Es seguro poner un botón de tarjeta?** Sí, **si se hace bien**. Los datos de la
tarjeta **nunca** se guardan en nuestra página; los maneja Stripe, que es una empresa
grande y especializada en eso.

**Un riesgo real que debemos conocer:** los estafadores a veces usan los botones de
donación de las iglesias para **probar tarjetas robadas** (mandan muchas donaciones
pequeñas para ver cuáles tarjetas todavía sirven).

- No es que "roben" a la iglesia: usan **nuestro botón** para probar **tarjetas que
  ellos ya robaron** en otro lado.
- **Cómo se evita:** Stripe trae un "guardián" automático (se llama **Radar**) que
  detecta y bloquea esto. Además se pueden poner límites y una pequeña verificación
  ("no soy un robot").

> 👉 La parte técnica de esta protección la resolvemos nosotros al construirlo.
> Aquí solo es para que sepan que **existe** y que **hay cómo protegerse**.

---

## 7. Lo que necesitamos ANTES de poder recibir tarjetas

Esto es como una receta: hay pasos que van **en orden**. No se puede el último sin el
primero.

- [ ] **1. Permiso para usar la página web.** La iglesia ya tiene su dirección
      (`bethelcasadedios.com`). Necesitamos **autorización y acceso** para poder
      trabajar en ella. *(Hoy no sabemos quién la administra — hay que averiguarlo.)*
- [ ] **2. Decidir qué pasa con la página actual.** ¿La nueva reemplaza a la de
      ahora, o conviven? (Decisión de la iglesia.)
- [ ] **3. Cuenta de banco de la iglesia.** El dinero de Stripe cae ahí. Debe ser una
      cuenta **a nombre de la iglesia**, no de una persona.
- [ ] **4. Papeles de la iglesia.** Stripe pide comprobar que somos una organización
      real: número fiscal (**EIN**), dirección, y un documento del **responsable**.
- [ ] **5. Un correo de la iglesia para esto.** (Ya tenemos
      `bethelcasadediosbroward@gmail.com`; hay que decidir si usamos ese u otro solo
      para finanzas.)
- [ ] **6. Prueba antes de abrirlo a todos.** Hacer una donación de prueba para
      confirmar que todo funciona.

> ⏳ **Ojo con los tiempos:** Stripe tarda unos **días** en verificar los papeles, y
> el **primer depósito** al banco puede tardar **1 a 2 semanas**. Después ya es rápido
> (2 días hábiles). No es instantáneo al principio.

---

## 8. Cosas que debemos decidir juntos (checklist para la reunión)

**Sobre la idea general**
- [ ] ¿Queremos **agregar** donaciones con tarjeta, o por ahora seguimos **solo con
      Zelle**?
- [ ] Si agregamos tarjeta, ¿**mantenemos Zelle** también? (recomendado, pero lo
      decide la iglesia)

**Sobre el dinero**
- [ ] ¿Estamos de acuerdo con la **comisión** (~3%) para las donaciones con tarjeta?
- [ ] ¿La iglesia **absorbe** la comisión, o le damos al donante la opción de
      **cubrirla** él mismo? (Stripe permite las dos.)

**Sobre quién se encarga**
- [ ] ¿**Quién** va a administrar la cuenta (revisar avisos, depósitos, problemas)?
- [ ] ¿**Quién** revisa el correo de finanzas?
- [ ] ¿**Quién** lleva las cuentas / contabilidad de lo que entra?

**Sobre lo legal y los donantes**
- [ ] ¿Queremos **recibos automáticos** y un **resumen anual** para los donantes?
- [ ] ¿Necesitamos agregar a la página una **Política de Privacidad** y **Términos**?
      (Normalmente sí, cuando se cobran cosas por internet.)

**Sobre las opciones para donar**
- [ ] ¿Queremos permitir **donación mensual automática**?
- [ ] ¿Queremos separar por **fondos** (diezmo, misiones, construcción…)?
- [ ] ¿Qué formas de pago? (tarjeta, Apple/Google Pay, etc.)

**Para averiguar**
- [ ] ¿**Quién administra** `bethelcasadedios.com` hoy? (registrador / dónde está
      alojada / quién tiene las contraseñas)

---

## 9. Resumen en 4 frases

1. Hoy recibimos donaciones por **Zelle**: gratis, directo, pero manual y sin tarjeta.
2. Podemos **agregar** un botón de **tarjeta** en la web usando **Stripe**, que cobra
   una pequeña comisión (~3%).
3. **No hay que elegir**: se pueden tener **los dos**; la comisión solo aplica a quien
   use tarjeta.
4. Antes de lanzarlo necesitamos **permiso para la web**, **cuenta de banco de la
   iglesia**, **papeles**, y **decidir quién lo maneja**.

---

*Documento de apoyo para la conversación del equipo. La información de comisiones y
requisitos puede cambiar; se confirma antes de decidir. No constituye asesoría
financiera ni legal.*
