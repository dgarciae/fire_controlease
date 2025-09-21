# Directrices de Estilo de Programación para GitHub Copilot

Estas instrucciones guían a Copilot para generar código que se alinee con el estilo de programación funcional (FP) y declarativo de nuestro proyecto.

## 1. Paradigma de Programación: Funcional y Declarativo

**Criterios clave:**

- **Prioridad al Estilo Funcional:** Siempre que sea viable para la tarea, el código generado debe favorecer un estilo de programación **funcional (FP)** y **declarativo**.
  - **Evitar:** Mutaciones de estado internas, bucles `for/while` imperativos y programaci'on defensiva.
  - **Preferir:** Funciones puras, composición de funciones, y el uso de **métodos de Array/Colección declarativos** (`map`, `filter`, `reduce`, `forEach`, etc.) en lugar de la lógica de bucle tradicional.
- **Diseño de Funciones:** Las funciones deben ser tratadas como **unidades atómicas y puras** (cuando la lógica lo permita). Evitar efectos secundarios (side effects) fuera de las capas de orquestación o de E/S (Input/Output).

---

## 2. Inmutabilidad (Immutability)

**Criterios clave:**

- **Variables Inmutables:** Todas las variables, a menos que sean estrictamente necesarias para la sintaxis o el rendimiento, deben declararse como **inmutables**.
  - En JavaScript/TypeScript, usar siempre **`const`** en lugar de `let`.
- **Métodos Inmutables:** Al manipular datos (arrays u objetos), se debe asegurar la **inmutabilidad del estado original**.
  - **Evitar:** Métodos que muten el array/objeto original (`push`, `pop`, `splice`, `sort` en-place).
  - **Preferir:** Técnicas de clonación y extensión para crear nuevas estructuras de datos, como el uso del **operador _spread_ (`...`)** o métodos inmutables como `Array.prototype.slice()`, `map()`, o `Object.assign()` / _spread_ para objetos.

---

## 3. Modularidad y Responsabilidad Única

**Criterios clave:**

- **Funciones de Responsabilidad Única:** La lógica para resolver una _feature_ o un flujo debe dividirse en el mayor número posible de **funciones pequeñas**. Cada función debe tener una **única responsabilidad** bien definida, siguiendo el principio SRP (Single Responsibility Principle).
- **Composición:** Favorecer la composición de estas funciones pequeñas para construir la lógica compleja.

---

## 4. Orquestación del Flujo de Tareas

**Criterios clave:**

- **Función de Orquestación Central:** Cuando un flujo de trabajo requiere la ejecución de múltiples acciones, se debe crear una **función de orquestación (o _controller_)** específica.
- **Rol del Orquestador:** Esta función tiene la única responsabilidad de:
  1.  Llamar a las distintas funciones pequeñas del flujo.
  2.  Actuar como **punto central para la asignación de valores** intermedios a variables inmutables (`const`).
  3.  Gestionar los datos de entrada y la salida final del flujo.

- **Ejemplo de Patrón de Orquestación (Pseudocódigo):**

```javascript
const ejecutarFlujoCaracteristica = (datosEntrada) => {
  // 1. Orquestación: Se asignan los valores de los pasos intermedios.
  const datosFiltrados = filtrarDatos(datosEntrada);
  const datosMapeados = mapearEstructura(datosFiltrados);
  const resultadoFinal = calcularResultado(datosMapeados);

  // 2. La lógica de cada paso (filtrarDatos, mapearEstructura, etc.) debe estar
  // contenida en funciones puras y separadas.

  return resultadoFinal;
};
```
