# Proyecto Fase 1 Qnave

> UNIVERSIDAD SAN CARLOS DE GUATEMALA
> FACULTAD DE INGENIERÍA  
> ESCUELA DE CIENCIAS Y SISTEMAS  
> LABORATORIO ANALISIS Y DISEÑO DE SISTEMAS 2   
> SECCIÓN A

| Nombre                          | Carnet    |
| ------------------------------- | --------- |
| Jose Carlos Moreira Paz         | 201701015 |
| Paula Gabriela García Reinoso   | 201700823 |
| José Fernando Recinos Acuté     | 201114236 |
| Vernik Carlos Alexander Yaxon Ortiz| 201712057 |

## Índice

- [Proyecto Fase 1](#ayd2_proyectof1_g3)
  - [Antecedentes](#antecedentes)
  - [Core del negocio](#core-del-negocio)
    - [Descripción](#descripción)
    - [Casos de uso alto nivel](#casos-de-uso-alto-nivel)
  - [Requerimientos](#requerimientos)
    - [Requerimientos Funcionales](#requerimientos-funcionales)
    - [Requerimientos no Funcionales](#requerimientos-no-funcionales)
  - [Casos de uso expandidos](#casos-de-uso-expandidos)
    - [Casos de uso para rol de conductor](#casos-de-uso-para-el-rol-de-conductor)
    - [Casos de uso para rol de usuario](#casos-de-uso-para-el-rol-de-usuario)
    - [Casos de uso para rol de asistente](#casos-de-uso-para-el-rol-de-asistente)
    - [Casos de uso para rol de administrador](#casos-de-uso-para-el-rol-de-administrador)
  - [Diagrama de Componentes](#diagrama-de-componentes)
  - [Matrices de trazabilidad](#matrices-de-trazabilidad)
  - [Estilos arquitectónicos](#estilos-arquitectónicos)
  - [Diagrama Entidad Relacion](#diagrama-entidad-relación)
  - [Prototipos](#prototipos)
    

## Antecedentes
- **Creciente Inseguridad y sus Efectos en la Operatividad**: La ola de delincuencia organizada en Guatemala ha sido un desafío dificil de manejar, afectando la confianza tanto de los conductores como de los usuarios. Los incidentes de asaltos y fraudes no solo deterioraron la percepción de seguridad, sino que también resultaron en la pérdida de personal clave, lo que afectó gravemente la capacidad operativa de las empresas de trasporte provado.
- **Crecimiento de la industra de Transporte Privado en la actualidad** : A nivel mundial, las aplicaciones de transporte privado, como Uber, inDrive, y Yango, han transformado la manera en que las personas se desplazan en entornos urbanos. La comodidad de solicitar un viaje a través de una aplicación, junto con opciones de pago digital y seguimiento en tiempo real, ha creado un estándar global en la industria del transporte, impulsando una demanda creciente y cambiando las expectativas de los usuarios en términos de seguridad y eficiencia.
- **Tendencias**: El avance de tecnologías móviles y la penetración del uso de smartphones han permitido la creación de aplicaciones más robustas y adaptables. Esto incluye el uso de APIs de geolocalización, sistemas de pago en línea, y algoritmos de optimización de rutas, que son esenciales para el funcionamiento eficiente de una aplicación de transporte.
- **Competencia**: Con la inseguridad afectando, los usuarios prefieren utilizar las aplicaciones que garanticen su seguridad y servicios más confiables. Esta situación resalta la importancia de desarrollar una solución tecnológica que no solo modernice las operaciones, sino que también recupere la confianza del mercado.
- **Regulacion**: La expansión global de las aplicaciones de transporte privado ha llevado a un aumento en la regulación gubernamental, con muchos países implementando leyes para proteger a los usuarios y garantizar condiciones laborales justas para los conductores. Empresas como Uber han tenido que adaptarse a regulaciones que varían de un país a otro, incluyendo la adopción de seguros, licencias especiales, y estándares de seguridad. Esto subraya la importancia de desarrollar una aplicación que no solo sea segura y eficiente, sino también conforme a las regulaciones locales y capaz de adaptarse a posibles cambios legales futuros.
- **Necesidad de Innovación**: Reconociendo las limitaciones de su sistema actual, Por ello se decide explorar soluciones tecnológicas que mejoren la seguridad y eficiencia del servicio. Aunque se presentó una propuesta preliminar por parte de un programador freelance, las deficiencias en la documentación y la falta de claridad en la propuesta generaron preocupaciones sobre la viabilidad y sostenibilidad a largo plazo de la solución.
- **Expectativas**: El objetivo de modernizar Qnave es desarrollar una solución integral que aborde los desafíos actuales y siente las bases para el crecimiento futuro, incluyendo un software flexible y escalable, medidas de seguridad avanzadas, y mejoras en la experiencia del usuario y la eficiencia operativa.

## Core del negocio

### Descripción
Qnave inicio sus operaciones en el año 2020 para dar solución a las problematicas del pais, desde su creación la compañia se ha enfrentado a los retos derivados de la pandemia global, esto impulso a Qnave a darle un giro de negocio para satisfacer las necesidades mas importantes de los clientes para ello el modelo se basa en llamadas telefónicas entre los usuarios y los conductores, esta modalidad permitió mantener a flote la empresa por un periodo de tiempo pero pronto surgieron mas desafios que complicaron el funcionamiento de la empresa.

La delincuencia fue un factor detonante en la modalidad y el giro del negocio que optaba Qnave, al aumentar la ola de inseguridad y el crimen organizado en el pais, los conductores y usuarios fueron los mas afectados obligando a los conductores a buscar otras maneras de ganarse la vida con trabajos de menor riesgo y los usuarios al sentirse inseguros optaban por utilizar los servicios de las otras empresas competidoras.

Se busca generar una solucion y proponer una documentación completa y satisfacer todos los problemas y conflictos que actualmente aquejan a la empresa Qnave, se requiere satisfacer las expectativas en terminos de seguridad, escalabilidad y viabilidad a largo plazo, ademas se propone que los costos de operacion del sistema no sean excesivamente altos ya que la sostenibilidad a largo plazo es una de las prioridades.

## Casos de Uso de alto nivel

### CDU de alto nivel

![D](./img/CDU_AltoNivel.png)

### Primera descomposición

![D](./img/CDU_SistemaViajes.png)

![D](./img/CDU_Asistente.png)

![D](./img/CDU_Admin.png)


 
## Requerimientos


### Requerimientos funcionales 
1. Registro de Usuario (RF1): Los usuarios, conductor o asistente  deben poder registrarse proporcionando la informacion correspondiente a su rol.
2. Inicio de Sesión(RF2): Los usuarios deben poder iniciar sesión en la aplicación utilizando su correo electrónico y contraseña.
3. Modificar información(RF3): El usuario, conductor o asistente puede cambiar algún dato personal que ingresó al registrarse.
4. Calificar conductor(RF4):Después de un viaje, el usuario puede darle una calificación al conductor.
5. Ver información del conductor(RF5): el usuario puede ver la informacion del conductor que hara su viaje.
6. Reportar algún problema(RF6): El usuario puede reportar el problema desde la aplicación.
7. Métodos de pago(RF7): El usuario puede pagar en efectivo o con tarjeta.
8. Guardar ubicación de viaje(RF8): El usuario puede guardar direcciones frecuentes.
9. Administracion de viajes(RF9): Un usuario puede perdir, o cancelar un viaje. Cuando un usuario solicita un viaje, la notificación se envía a todos los conductores. El sistema evita que dos conductores acepten al mismo pasajero, asegurando que solo uno lo tome.
10. Reportar un problema(RF10): Si el conductor enfrenta algún problema, puede reportarlo en la plataforma, describiendo lo ocurrido y la fecha en que sucedió.
11. Calificar usuarios(RF11): El conductor puede calificar al usuario después de completar un viaje, usando un sistema de estrellas, para evaluar su comportamiento.
12. Ver información del usuario(RF12): el conductor puede revisar la información básica del usuario, como su nombre, calificación general, y comentarios de otros conductores.
13. Finalizar viaje(RF13): Cuando el conductor llega al destino, debe indicar que el viaje ha terminado. La plataforma registrará la fecha y detalles del viaje.
14. Resumen de ganancias(RF14): El conductor puede ver cuánto ha ganado. A medianoche, la plataforma guarda ese total en un historial y lo reinicia para el día siguiente. También puede ver el acumulado total de todas sus ganancias anteriores.
15. Aceptar solicitud de empleo a conductores(RF15): El asistente revisa las solicitudes de empleo de los conductores. 
16. Ver información de los conductores(RF16): El asistente puede ver detalles sobre los conductores. 
17. Dar de baja a un conductor(RF17): El asistente puede dar de baja a un conductor por incumplir políticas, recibir muchas quejas, o a solicitud del propio conductor. 
18. Ver información de los usuarios(RF18): El asistente también puede ver información de los usuarios registrados.
19. Dar de baja a un usuario(RF19): En caso de comportamiento inapropiado, el asistente puede dar de baja a un usuario.
20. Generar ofertas para los usuarios(RF20): El asistente puede crear ofertas especiales para los usuarios, aplicando descuentos según lo considere necesario.
21. Ver solicitud de cambios de información del conductor(RF21): El asistente revisa los documentos que los conductores envían para actualizar su información y realiza los cambios necesarios.
22. Reporte de los vehículos(RF22): El asistente puede generar y ver reportes detallados sobre los vehiculos.
23. Generar reportes(RF23): El administrador puede crear reportes que muestren datos importantes sobre el funcionamiento de la plataforma, incluyendo las calificaciones de usuarios y conductores, estadísticas de registro, uso, y ganancias.
24. Ver calificaciones(RF24): El administrador tiene acceso a las calificaciones de todos los usuarios y conductores, lo que le permite monitorear la calidad del servicio.
25. Estadísticas registro(RF25): El administrador puede ver gráficos que muestran la cantidad de usuarios, conductores, y asistentes registrados en la plataforma.
26. Estadísticas de uso(RF26): El administrador puede ver gráficos que muestran cuántos viajes se han completado, cuántos se han cancelado, y cuántos están en espera.
27. Reporte de Ganancia(RF27): El administrador puede ver cuánto ha ganado la plataforma, tanto en bruto como en neto, con cada viaje. Puede filtrar estos reportes por fecha para un control más detallado.
28. Contratar asistentes(RF28): El administrador puede contratar nuevos asistentes, creando sus perfiles en el sistema, asignándoles credenciales, y configurando sus permisos según el rol que desempeñarán.
29. Dar de baja a un asistente(RF29): Si un asistente ya no es necesario o no está cumpliendo con sus funciones, el administrador puede desactivar su cuenta y reasignar sus tareas a otros miembros del equipo. Esta acción queda registrada en el sistema para seguimiento.
### Requerimientos no funcionales 
1. Seguridad(RNF1): La aplicación debe garantizar la protección de los datos personales de los usuarios y la información de pago.
2. Escalabilidad(RFN2): El sistema debe ser capaz de manejar un aumento en el número de usuarios y solicitudes de viaje sin degradar el rendimiento.
3. Usabilidad(RFN3): La interfaz de usuario debe ser intuitiva y fácil de usar, garantizando una buena experiencia para el usuario.
4. Disponibilidad(RFN4): La aplicación debe estar disponible y operativa en todo momento, con un tiempo de inactividad mínimo.
5. Rendimiento(RFN5): La aplicación debe responder rápidamente a las solicitudes de los usuarios, con tiempos de carga mínimos.
6. Compatibilidad(RFN6): La aplicación debe ser compatible con diferentes dispositivos y sistemas operativos móviles.
7. Autenticación Segura(RFN7): El sistema debe contar con mecanismos robustos de autenticación y autorización para asegurar que cada tipo de usuarios este autorizado para acceder a sus funcionalidades respectivas.
8. Soporte para Usuarios Simultáneos(RFN8): La aplicación debe soportar un gran número de usuarios y conductores simultáneamente sin degradar el rendimiento.
9. Cumplimiento Normativo(RFN9): El sistema debe cumplir con regulaciones locales e internacionales aplicables, como las de protección de datos, y mantener un registro detallado de todas las transacciones y actividades para auditorías.

## Casos de uso expandidos 

### Casos de Uso para el Rol de Conductor

#### Inicio de sesión conductor: CDU001
| **Descripción** | El conductor inicia sesión en la plataforma utilizando su correo y contraseña, o su código de trabajador asignado al registrarse. |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor accede a la página de inicio de sesión.                                                |
|                 | 2. Ingresa su correo y contraseña, o su código de trabajador.                                           |
|                 | 3. El sistema valida las credenciales.                                                                 |
|                 | 4. Si las credenciales son correctas, el sistema permite el acceso.                                     |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si las credenciales son incorrectas, el sistema muestra un mensaje de error.                        |

#### Aceptar viaje conductor CDU: CDU002
| **Descripción** | El conductor acepta un viaje solicitado por un usuario.                                                |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El sistema notifica al conductor sobre un nuevo viaje disponible.                                    |
|                 | 2. El conductor revisa la información del usuario y del viaje.                                          |
|                 | 3. El conductor acepta el viaje.                                                                        |
|                 | 4. El sistema asigna el viaje al conductor y notifica al usuario.                                       |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si otro conductor acepta el viaje primero, el sistema notifica que el viaje ya ha sido tomado.     |

#### Cancelar viaje conductor CDU: CDU003
| **Descripción** | El conductor cancela un viaje que ya había aceptado.                                                    |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor selecciona el viaje en curso.                                                          |
|                 | 2. Cancela el viaje proporcionando una razón.                                                          |
|                 | 3. El sistema registra la cancelación y notifica al usuario.                                           |
|                 | 4. El sistema reasigna el viaje a otro conductor disponible.                                           |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si no hay otro conductor disponible, el sistema notifica al usuario que el viaje ha sido cancelado.|

#### Finalizar viaje CDU: CDU004
| **Descripción** | El conductor finaliza un viaje cuando llega al destino.                                                |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor indica en la aplicación que ha llegado al destino.                                     |
|                 | 2. El sistema registra la finalización del viaje y actualiza las ganancias del conductor.              |
|                 | 3. El usuario es notificado de la finalización del viaje.                                              |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si el sistema no puede registrar la finalización, el conductor debe intentar nuevamente.           |

#### Información conductor CDU: CDU005
| **Descripción** | El conductor actualiza su información personal o la de su vehículo enviando un documento (PDF) con los cambios que quiere hacer. |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor, Asistente                                                                                   |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor accede a su perfil y selecciona la opción de modificar información.                     |
|                 | 2. Sube un documento (PDF) con los cambios que desea realizar.                                         |
|                 | 3. El sistema notifica al asistente sobre la solicitud de modificación.                                 |
|                 | 4. El asistente revisa la solicitud y aprueba o rechaza los cambios.                                    |
|                 | 5. El sistema actualiza la información si la solicitud es aprobada.                                     |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si el documento no cumple con los requisitos, el sistema notifica al conductor para corregirlo.     |

#### Reporte de problama conductor CDU: CDU006
| **Descripción** | El conductor reporta un problema en la plataforma, describiendo lo ocurrido y la fecha en que sucedió.  |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor accede a la opción de reportar un problema.                                            |
|                 | 2. Describe el problema y selecciona la fecha en que ocurrió.                                          |
|                 | 3. El sistema registra el reporte y lo envía al equipo de soporte.                                     |
|                 | 4. El equipo de soporte revisa y gestiona el reporte.                                                  |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si la descripción del problema es insuficiente, el sistema solicita más detalles.                  |

#### Calificar usuario CDU: CDU007
| **Descripción** | El conductor califica al usuario después de completar un viaje, usando un sistema de estrellas.         |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor finaliza el viaje.                                                                     |
|                 | 2. El sistema muestra la opción de calificar al usuario.                                               |
|                 | 3. El conductor selecciona una calificación de 1 a 5 estrellas y, opcionalmente, deja un comentario.    |
|                 | 4. El sistema registra la calificación y el comentario.                                                |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si el conductor no deja una calificación, el sistema lo guarda como "Sin calificación".            |

#### Conductor ve información usuario CDU: CDU008
| **Descripción** | El conductor revisa la información básica del usuario antes de aceptar un viaje.                       |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor recibe la notificación de un viaje disponible.                                         |
|                 | 2. Revisa la información básica del usuario, como nombre, calificación general, y comentarios de otros conductores. |
|                 | 3. Decide si acepta o no el viaje basado en la información proporcionada.                               |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si el sistema no puede mostrar la información, el conductor solo puede ver los detalles mínimos del viaje. |

#### Resumen de ganancias conductor CDU: CDU009
| **Descripción** | El conductor visualiza un resumen de sus ganancias diarias y el acumulado total.                       |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Actores**     | Conductor                                                                                              |
| **Secuencia Normal** | **Paso**                                                                                               |
|                 | 1. El conductor accede a la opción de "Resumen de Ganancias".                                          |
|                 | 2. El sistema muestra las ganancias del día actual.                                                    |
|                 | 3. A medianoche, el sistema guarda el total diario en un historial y reinicia el conteo.               |
|                 | 4. El conductor puede ver un historial con el acumulado total de todas sus ganancias anteriores.       |
| **Excepciones** | **Paso**                                                                                                   |
|                 | A1. Si el sistema no puede calcular las ganancias, el conductor recibe un mensaje de error.           |


### Casos de Uso para el Rol de Usuario

#### Inicio de sesion CDU: CDU010
| **Descripción** | El usuario inicia sesión en la plataforma utilizando su correo y contraseña, o su cuenta de redes sociales. |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario accede a la página de inicio de sesión.                                                      |
|                 | 2. Ingresa su correo y contraseña, o selecciona la opción de iniciar sesión con redes sociales.            |
|                 | 3. El sistema valida las credenciales o autentica con la red social.                                       |
|                 | 4. Si las credenciales son correctas, el sistema permite el acceso.                                         |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si las credenciales son incorrectas, el sistema muestra un mensaje de error.                           |
|                 | A2. Si la autenticación con la red social falla, el sistema sugiere intentar nuevamente o usar otra opción. |

#### Solicitar viaje usuario CDU: CDU011
| **Descripción** | El usuario solicita un viaje indicando su ubicación actual y su destino.                                      |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario accede a la opción de "Solicitar Viaje" en la plataforma.                                      |
|                 | 2. Ingresa su ubicación actual y el destino deseado.                                                        |
|                 | 3. El sistema calcula la tarifa estimada y muestra los detalles del viaje.                                   |
|                 | 4. El usuario confirma la solicitud del viaje.                                                              |
|                 | 5. El sistema notifica a los conductores disponibles en la zona.                                            |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si no hay conductores disponibles, el sistema informa al usuario y sugiere intentar más tarde.          |

#### Cancelar viaje usuario CDU: CDU012
| **Descripción** | El usuario cancela un viaje que ya había solicitado.                                                         |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario selecciona el viaje en curso.                                                                 |
|                 | 2. Cancela el viaje proporcionando una razón.                                                               |
|                 | 3. El sistema registra la cancelación y notifica al conductor asignado.                                     |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si el viaje ya ha comenzado, el sistema informa al usuario que la cancelación no es posible.            |

#### Ver informacion conductor CDU: CDU013
| **Descripción** | El usuario revisa la información básica del conductor antes de que el viaje comience.                       |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario recibe la notificación de que un conductor ha aceptado su solicitud de viaje.                 |
|                 | 2. Revisa la información básica del conductor, como nombre, calificación general, y comentarios de otros usuarios. |
|                 | 3. El usuario puede decidir si procede con el viaje o lo cancela basado en la información proporcionada.    |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si el sistema no puede mostrar la información, el usuario solo puede ver los detalles mínimos del conductor. |

#### Calificar conductor CDU: CDU014
| **Descripción** | El usuario califica al conductor después de completar un viaje, usando un sistema de estrellas.             |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El viaje finaliza y el sistema muestra la opción de calificar al conductor.                              |
|                 | 2. El usuario selecciona una calificación de 1 a 5 estrellas y, opcionalmente, deja un comentario.          |
|                 | 3. El sistema registra la calificación y el comentario.                                                    |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si el usuario no deja una calificación, el sistema lo guarda como "Sin calificación".                  |

#### Información de perfil usuario CDU: CDU015
| **Descripción** | El usuario actualiza su información personal en su perfil de la plataforma.                                 |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario accede a su perfil en la plataforma.                                                          |
|                 | 2. Selecciona la opción de modificar su información personal.                                               |
|                 | 3. Realiza los cambios necesarios y guarda la información.                                                 |
|                 | 4. El sistema actualiza la información del usuario en la base de datos.                                     |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si el sistema no puede guardar los cambios, muestra un mensaje de error solicitando que intente nuevamente. |

#### Ver historial de viajes CDU: CDU016
| **Descripción** | El usuario revisa su historial de viajes completados.                                                       |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario accede a la opción de "Historial de Viajes".                                                  |
|                 | 2. El sistema muestra una lista de todos los viajes completados por el usuario.                             |
|                 | 3. El usuario puede seleccionar un viaje específico para ver más detalles.                                 |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si el sistema no puede acceder al historial, muestra un mensaje de error indicando la falta de datos.   |

#### Recepción de ofertas usuario CDU: CDU0017
| **Descripción** | El usuario recibe ofertas especiales y descuentos generados por el asistente.                               |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario, Asistente                                                                                          |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El asistente genera una oferta especial o descuento.                                                     |
|                 | 2. El sistema notifica al usuario sobre la nueva oferta disponible.                                         |
|                 | 3. El usuario revisa la oferta en su perfil o en la sección de notificaciones.                               |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si la oferta ya no es válida, el sistema informa al usuario cuando intenta aplicarla.                   |

#### Reporte de problema usuario CDU: CDU018
| **Descripción** | El usuario reporta un problema con un viaje o con la plataforma.                                             |
|-----------------|------------------------------------------------------------------------------------------------------------|
| **Actores**     | Usuario                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                   |
|                 | 1. El usuario accede a la opción de reportar un problema.                                                  |
|                 | 2. Describe el problema y selecciona el viaje relacionado, si aplica.                                      |
|                 | 3. El sistema registra el reporte y lo envía al equipo de soporte.                                         |
|                 | 4. El equipo de soporte revisa y gestiona el reporte.                                                      |
| **Excepciones** | **Paso**                                                                                                       |
|                 | A1. Si la descripción del problema es insuficiente, el sistema solicita más detalles.                      |

### Casos de Uso para el Rol de Asistente

#### Inicio de sesion asistente CDU: CDU019
| **Descripción** | El asistente inicia sesión en la plataforma utilizando su correo y contraseña, o su código de trabajador. |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la página de inicio de sesión.                                                  |
|                 | 2. Ingresa su correo y contraseña, o su código de trabajador.                                            |
|                 | 3. El sistema valida las credenciales.                                                                   |
|                 | 4. Si las credenciales son correctas, el sistema permite el acceso.                                      |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si las credenciales son incorrectas, el sistema muestra un mensaje de error.                         |

#### Aceptar solicitud de conductor CDU: CDU020
| **Descripción** | El asistente revisa y acepta las solicitudes de empleo de nuevos conductores.                            |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la lista de solicitudes de empleo de conductores.                               |
|                 | 2. Revisa la información y documentos proporcionados por el solicitante.                                 |
|                 | 3. Si todo está en orden, aprueba la solicitud.                                                          |
|                 | 4. El sistema notifica al conductor que su solicitud ha sido aprobada.                                   |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si la información está incompleta o es incorrecta, el asistente rechaza la solicitud e informa al solicitante. |

#### Ver información conductores CDU: CDU021
| **Descripción** | El asistente revisa los detalles de los conductores, incluyendo historial de viajes y calificaciones.     |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la sección de conductores en la plataforma.                                     |
|                 | 2. Selecciona un conductor específico para revisar su historial y calificaciones.                        |
|                 | 3. El sistema muestra la información detallada del conductor.                                            |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si el sistema no puede acceder a la información del conductor, muestra un mensaje de error.          |

#### Dar de baja conductor CDU: CDU022
| **Descripción** | El asistente da de baja a un conductor debido a incumplimientos o a solicitud del propio conductor.       |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la lista de conductores activos.                                               |
|                 | 2. Selecciona al conductor que desea dar de baja.                                                        |
|                 | 3. Registra el motivo de la baja en el sistema.                                                          |
|                 | 4. El sistema desactiva la cuenta del conductor y guarda el registro.                                    |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si la baja no puede ser procesada, el sistema muestra un mensaje de error.                           |

#### Ver información de usuarios CDU: CDU023
| **Descripción** | El asistente revisa la información de los usuarios registrados en la plataforma.                         |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la lista de usuarios en la plataforma.                                          |
|                 | 2. Selecciona un usuario específico para ver su historial de viajes y comentarios recibidos.             |
|                 | 3. El sistema muestra la información detallada del usuario.                                              |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si el sistema no puede acceder a la información del usuario, muestra un mensaje de error.            |

#### Dar de baja usuario CDU: CDU024
| **Descripción** | El asistente da de baja a un usuario debido a comportamiento inapropiado.                                |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la lista de usuarios activos.                                                   |
|                 | 2. Selecciona al usuario que desea dar de baja.                                                          |
|                 | 3. Registra el motivo de la baja en el sistema.                                                          |
|                 | 4. El sistema desactiva la cuenta del usuario y guarda el registro.                                      |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si la baja no puede ser procesada, el sistema muestra un mensaje de error.                           |

#### Generar ofertas CDU: CDU025
| **Descripción** | El asistente genera ofertas especiales y descuentos para los usuarios de la plataforma.                  |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la sección de ofertas en la plataforma.                                         |
|                 | 2. Crea una nueva oferta, definiendo los parámetros como porcentaje de descuento y período de validez.   |
|                 | 3. El sistema guarda la oferta y la notifica a los usuarios elegibles.                                   |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si la oferta no puede ser guardada, el sistema muestra un mensaje de error.                          |

#### Ver solicitud de cambio de informacion CDU: CDU026
| **Descripción** | El asistente revisa y procesa las solicitudes de cambios de información de los conductores.              |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la lista de solicitudes de cambio de información.                               |
|                 | 2. Revisa los documentos y detalles proporcionados por el conductor.                                     |
|                 | 3. Si todo está en orden, aprueba el cambio y el sistema actualiza la información.                       |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si los documentos son insuficientes o incorrectos, el asistente rechaza la solicitud e informa al conductor. |

#### Reporte de vehiculos CDU: CDU027
| **Descripción** | El asistente genera y revisa reportes detallados sobre los vehículos que utilizan los conductores.        |
|-----------------|---------------------------------------------------------------------------------------------------------|
| **Actores**     | Asistente                                                                                               |
| **Secuencia Normal** | **Paso**                                                                                                |
|                 | 1. El asistente accede a la sección de reportes de vehículos en la plataforma.                           |
|                 | 2. Selecciona los parámetros para generar el reporte, como rango de fechas y tipo de vehículo.           |
|                 | 3. El sistema genera el reporte y lo muestra en pantalla.                                                |
| **Excepciones** | **Paso**                                                                                                    |
|                 | A1. Si el reporte no puede ser generado, el sistema muestra un mensaje de error.                         |

### Casos de Uso para el Rol de Administrador

#### Generación de reportes CDU: CDU028
| **Descripción** | El administrador genera reportes sobre el funcionamiento de la plataforma, incluyendo estadísticas y calificaciones. |
|-----------------|--------------------------------------------------------------------------------------------------------------------|
| **Actores**     | Administrador                                                                                                      |
| **Secuencia Normal** | **Paso**                                                                                                           |
|                 | 1. El administrador accede a la sección de reportes en la plataforma.                                             |
|                 | 2. Selecciona el tipo de reporte que desea generar (calificaciones, estadísticas, ganancias, etc.).               |
|                 | 3. Define los parámetros para el reporte, como rango de fechas o tipo de usuario/conductor.                       |
|                 | 4. El sistema genera el reporte y lo muestra en pantalla.                                                         |
| **Excepciones** | **Paso**                                                                                                               |
|                 | A1. Si el reporte no puede ser generado, el sistema muestra un mensaje de error.                                  |

#### Ver calificaciones CDU: CDU029
| **Descripción** | El administrador revisa las calificaciones de usuarios y conductores para monitorear la calidad del servicio.      |
|-----------------|-------------------------------------------------------------------------------------------------------------------|
| **Actores**     | Administrador                                                                                                     |
| **Secuencia Normal** | **Paso**                                                                                                          |
|                 | 1. El administrador accede a la sección de calificaciones en la plataforma.                                       |
|                 | 2. Selecciona el tipo de calificaciones que desea revisar (usuarios o conductores).                               |
|                 | 3. El sistema muestra una lista de calificaciones con detalles adicionales como comentarios.                     |
| **Excepciones** | **Paso**                                                                                                              |
|                 | A1. Si el sistema no puede acceder a las calificaciones, muestra un mensaje de error.                             |

#### Gestionar cuentas CDU: CDU030
| **Descripción** | El administrador gestiona las cuentas de todos los usuarios y conductores, incluyendo la activación, desactivación, o eliminación. |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Actores**     | Administrador                                                                                                                         |
| **Secuencia Normal** | **Paso**                                                                                                                              |
|                 | 1. El administrador accede a la sección de gestión de cuentas en la plataforma.                                                    |
|                 | 2. Selecciona la cuenta de un usuario o conductor específico.                                                                        |
|                 | 3. Realiza la acción deseada (activar, desactivar o eliminar la cuenta).                                                             |
|                 | 4. El sistema procesa la acción y actualiza el estado de la cuenta.                                                                  |
| **Excepciones** | **Paso**                                                                                                                                |
|                 | A1. Si la acción no puede ser completada, el sistema muestra un mensaje de error.                                                   |

#### Asignación de roles CDU: CDU031
| **Descripción** | El administrador contrata y asigna roles a los usuarios y conductores, definiendo los permisos que tendrán en la plataforma.                   |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Actores**     | Administrador                                                                                                                         |
| **Secuencia Normal** | **Paso**                                                                                                                              |
|                 | 1. El administrador accede a la sección de roles en la plataforma.                                                                  |
|                 | 2. Selecciona el usuario o conductor al que desea asignar un rol.                                                                   |
|                 | 3. Define el rol y los permisos correspondientes (vendedor, comprador, etc.).                                                       |
|                 | 4. El sistema guarda los cambios y actualiza los permisos del usuario/conductor.                                                    |
| **Excepciones** | **Paso**                                                                                                                                |
|                 | A1. Si los roles no pueden ser asignados, el sistema muestra un mensaje de error.                                                   |

#### Ver reporte de transacciones CDU: CDU032
| **Descripción** | El administrador revisa reportes detallados sobre las transacciones realizadas en la plataforma.                                      |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Actores**     | Administrador                                                                                                                         |
| **Secuencia Normal** | **Paso**                                                                                                                              |
|                 | 1. El administrador accede a la sección de reportes de transacciones en la plataforma.                                               |
|                 | 2. Selecciona los parámetros para generar el reporte, como rango de fechas y tipo de transacción.                                    |
|                 | 3. El sistema genera el reporte y lo muestra en pantalla.                                                                             |
| **Excepciones** | **Paso**                                                                                                                                |
|                 | A1. Si el reporte no puede ser generado, el sistema muestra un mensaje de error.                                                     |

## Diagrama de componentes
![D](./img/DiagramaComponentes.png)
## Matrices de Trazabilidad

a. Stakeholders vrs Requerimientos  
b. Stakeholders vrs CDU  
c. Requerimiento vrs CDU  


## Estilos Arquitectónicos

## SOA (Service-Oriented Architecture)

### Descripción
El estilo arquitectónico SOA se centra en la organización de los sprotocolo de ervicios como componentes distribuidos que interactúan entre si. Estos servicios son autónomos, independientes y permiten la reutilización y escalabilidad en la solución. SOA es ideal para este tipo de aplicaciones que necesitan integrar múltiples servicios y facilitar la comunicación entre ellos, proporcionando flexibilidad y manteniendo la modularidad.

### Características Clave
- **Desacoplamiento**: Cada servicio es independiente y desacoplado de los demás.
- **Interoperabilidad**: Los servicios pueden ser consumidos por diferentes aplicaciones, independientemente de las tecnologías utilizadas.
- **Reusabilidad**: Los servicios pueden ser reutilizados en diferentes aplicaciones y contextos.
- **Escalabilidad**: SOA permite escalar horizontalmente al desplegar servicios en múltiples instancias.

### Implementación en el Proyecto
- **Backend**: El backend en Node.js/Express expondrá servicios RESTful que podrán ser consumidos por el frontend y otros servicios.
- **Frontend**: El frontend en React interactuará con los servicios RESTful proporcionados por el backend.
- **Integración de Servicios**: Se integrarán servicios externos como AWS S3 para el almacenamiento de imágenes y servicios de correo electrónico para notificaciones.

## Estilo Arquitectónico: Arquitectura en Capas

### Descripción
La Arquitectura en Capas organiza el sistema en diferentes niveles, donde cada capa tiene una responsabilidad específica. Esto facilita la separación de preocupaciones, mejora la mantenibilidad y permite que cada capa evolucione de manera independiente.

### Capas Definidas
1. **Capa de Presentación (Frontend)**: Implementada en React, maneja la interacción con el usuario final, proporcionando una interfaz gráfica que comunica con la capa de lógica de negocio.
2. **Capa de Lógica de Negocio (Backend)**: Implementada en Node.js con Express, contiene la lógica de negocio de la aplicación, validaciones, y procesamiento de datos.
3. **Capa de Persistencia de Datos (Base de Datos)**: Utiliza MySQL como base de datos relacional en la nube, con Sequelize como ORM para manejar las interacciones con la base de datos.
4. **Capa de Servicios Externos**: Incluye servicios como AWS S3 para almacenamiento de imágenes y servicios de correo para notificaciones y recuperación de contraseñas.

### Implementación en el Proyecto
- **Frontend**: React manejará la capa de presentación, interactuando con la API del backend.
- **Backend**: Node.js/Express se encargará de la lógica de negocio y servirá como intermediario entre el frontend y la base de datos.
- **Persistencia**: Sequelize gestionará las interacciones con MySQL, aplicando los modelos de datos definidos.
- **Servicios Externos**: Integración con AWS S3 para almacenamiento y servicios de correo para notificaciones.

## Integración de SOA y Arquitectura en Capas

### Descripción
La combinación de SOA y Arquitectura en Capas en este proyecto permite crear una solución modular, escalable y bien organizada. SOA facilita la creación de servicios independientes que pueden ser reutilizados o escalados según sea necesario, mientras que la Arquitectura en Capas asegura una separación clara de responsabilidades dentro de la aplicación.

### Implementación en el Proyecto
- **Servicios Independientes**: Cada funcionalidad principal (registro, inicio de sesión, gestión de usuarios, etc.) será implementada como un servicio RESTful independiente, respetando la arquitectura SOA.
- **Capas Claramente Definidas**: Estos servicios se integrarán en la Arquitectura en Capas, donde cada capa maneja una parte específica del procesamiento (presentación, lógica de negocio, persistencia).

## Seguridad

### Descripción
La seguridad es una consideración transversal en la arquitectura. Se implementarán medidas de seguridad en cada capa y servicio para proteger la aplicación y los datos sensibles de los usuarios.

### Implementación de Seguridad
- **Autenticación y Autorización**: Implementada usando JWT para asegurar que solo usuarios autenticados puedan acceder a los servicios.
- **Cifrado de Datos**: Uso de bcrypt para cifrar contraseñas y `crypto` para cifrar datos sensibles antes de almacenarlos en la base de datos.
- **SSL/TLS**: Para proteger la transmisión de datos entre el frontend y el backend.


#### 1. Descripción General de la Combinación SOA con Capas
En esta combinación:

**Arquitectura SOA**: Se encarga de dividir el sistema en diferentes servicios autónomos que exponen sus funcionalidades a través de interfaces (APIs). Cada servicio se ocupa de un conjunto específico de funcionalidades del negocio (Usuarios, Conductores, Pagos, etc.).

**Arquitectura en Capas**: Cada servicio dentro de la arquitectura SOA se organiza internamente en capas, como la capa de presentación, capa de lógica de negocio, capa de acceso a datos, y capa de persistencia.

#### 2. Estructura Interna de un Servicio en Capas
Supongamos que tienes un servicio de "Usuarios" en tu arquitectura SOA. Este servicio podría estar organizado internamente en las siguientes capas:

**Capa de Presentación (Frontend)**:
Responsabilidad: Maneja la interacción con los usuarios (esto puede ser un componente frontend en React, pero en un servicio puro, esta capa se refiere al manejo de las solicitudes HTTP).
Tecnología: Express.js maneja las solicitudes y respuestas HTTP.

**Capa de Lógica de Negocio**:
Responsabilidad: Contiene la lógica de la aplicación, como validaciones, transformaciones de datos, y la coordinación entre diferentes partes del servicio.
Tecnología: Aquí usarías controladores en Express o funciones de servicios.

**Capa de Acceso a Datos (DAO)**:
Responsabilidad: Interactúa con la base de datos y otros sistemas de persistencia.
Tecnología: Sequelize, para manejar las consultas SQL de manera ORM.

**Capa de Persistencia**:
Responsabilidad: Se encarga del almacenamiento y recuperación de datos.
Tecnología: MySQL como base de datos.

![D](/Estilo/Estilos_arquitectonicos.drawio.svg)

### Ejemplo de implementación de los servicios de estilos por capas y SOA

```
Ejemplo de una estructura para el estilo en backend 
con Nodejs/Express

/services
  /user-service
    /controllers (Capa de Lógica de Negocio)
      - userController.js`
    /models (Capa de Persistencia)
      - User.js`
    /routes (Capa de Presentación)
      - userRoutes.js`
    /services (Capa de Lógica de Negocio)
      - userService.js`
    /dao (Capa de Acceso a Datos)
      - userDAO.js`
    /config (Configuración y utilidades)
      - database.js`
    - app.js` (Entrada del servicio)
  
  /auth-service
    /controllers (Capa de Lógica de Negocio)
      - authController.js`
    /models (Capa de Persistencia)
      - AuthToken.js`
    /routes (Capa de Presentación)
      - authRoutes.js`
    /services (Capa de Lógica de Negocio)
      - authService.js`
    /dao (Capa de Acceso a Datos)
      - authDAO.js`
    /config (Configuración y utilidades)
      - securityConfig.js`
    - app.js` (Entrada del servicio)
  
  /payment-service
    /controllers (Capa de Lógica de Negocio)
      - paymentController.js`
    /models (Capa de Persistencia)
      - Payment.js`
    /routes (Capa de Presentación)
      - paymentRoutes.js`
    /services (Capa de Lógica de Negocio)
      - paymentService.js`
    /dao (Capa de Acceso a Datos)
      - paymentDAO.js`
    /config (Configuración y utilidades)
      - paymentGateway.js`
    - app.js` (Entrada del servicio)


```

```
Ejemplo de una estructura para el estilo en frontend con React

/src
  /components (Componentes Reutilizables)
    /User
      - UserForm.js`
      - UserList.js`
      - UserProfile.js`
    /Auth
      - LoginForm.js`
      - RegisterForm.js`
  
  /pages (Páginas Principales)
    - LoginPage.js`
    - RegisterPage.js`
    - UserProfilePage.js`
    - PaymentPage.js`
  
  /services (Capa de Servicios)
    - userService.js`
    - authService.js`
    - paymentService.js`
  
  /hooks (Custom Hooks)
    - useAuth.js`
    - useUser.js`
  
  /context (Contextos Globales)
    - AuthContext.js`
    - UserContext.js`
  
  /utils (Utilidades)
    - apiClient.js` (Configuración de Axios para llamadas HTTP)
    - validators.js` (Funciones de validación)
  
  /assets (Recursos Estáticos)
    - logo.png`
    - styles.css`
  
  /routes (Gestión de Rutas)
    - AppRoutes.js`
  
  /config (Configuraciones)
    - config.js` (Configuración global de la aplicación)
  
  - App.js` (Entrada principal de la aplicación)
  - index.js` (Punto de entrada)

```

## Diagrama Entidad Relación

![Entidad Relación](/Entidad_Relacion/MED_DB.png "Modelo Entidad Relación")

## Prototipos 

#### Inicio de sesión

![Inicio de sesión](/Prototipo/Prototipado-Inicio%20de%20Sesion.drawio.svg "Prototipo de inicio de sesión")

#### Home

![Home](/Prototipo/Prototipado-Home.drawio.svg "Home")

#### Registro de Usuarios

![Registro de Usuarios](/Prototipo/Prototipado-Registro_Usuario.drawio.svg "Prototipo de Registro de Usuarios")

#### Modificación de datos

![Modificación de datos](/Prototipo/Prototipado-Modificacion_Datos.drawio.svg "Prototipo de Modificación de datos")

#### Solicitar nuevo viaje

![Solicitar nuevo viaje](/Prototipo/Prototipado-Solicitar_Viaje.drawio.svg "Solicitar nuevo viaje")

#### Aceptar nuevo viaje conductor

![Aceptar nuevo viaje conductor](/Prototipo/Prototipado-Aceptar_viaje_conductor.drawio.svg "Aceptar nuevo viaje conductor")
