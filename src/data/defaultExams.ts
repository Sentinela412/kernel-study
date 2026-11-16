import { Exam } from '../types';

export interface SubjectModuleInfo {
  code: string;
  shortName: string;
  fullName: string;
  iconType: 'hardware' | 'database' | 'web' | 'os';
}

export const ASIR_MODULES: SubjectModuleInfo[] = [
  {
    code: 'A1S2627ASIR',
    shortName: 'Fundamentos de hardware',
    fullName: 'A1S2627ASIR - Fundamentos de hardware',
    iconType: 'hardware',
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Gestión de bases de datos',
    fullName: 'A1S2627ASIR - Gestión de bases de datos',
    iconType: 'database',
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Implantación de aplicaciones web',
    fullName: 'A1S2627ASIR - Implantación de aplicaciones web',
    iconType: 'web',
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Implantación de sistemas operativos',
    fullName: 'A1S2627ASIR - Implantación de sistemas operativos',
    iconType: 'os',
  },
];

export const DEFAULT_EXAMS: Exam[] = [
  // 1. FUNDAMENTOS DE HARDWARE
  {
    id: 'asir-hardware',
    title: 'A1S2627ASIR - Fundamentos de hardware',
    description: 'Arquitectura de ordenadores, buses de datos PCIe/SATA, microprocesadores, memoria RAM (DDR4/DDR5), fuentes de alimentación, BIOS/UEFI y mantenimiento de equipos.',
    category: 'Fundamentos de hardware',
    timeLimitMinutes: 20,
    penaltyRatio: 0.33, // 3 fallos restan 1 acierto
    createdAt: '2026-02-01T08:00:00.000Z',
    author: 'Kernel Study',
    questions: [
      {
        id: 'hw-1',
        text: '¿Cuál de los siguientes niveles de memoria caché suele estar integrado dentro del propio núcleo de la CPU y ofrece la menor latencia de acceso?',
        options: [
          'Caché L1 (Nivel 1)',
          'Caché L2 (Nivel 2)',
          'Caché L3 (Nivel 3 compartida)',
          'Memoria RAM principal'
        ],
        correctIndex: 0,
        explanation: 'La memoria caché L1 está integrada directamente en cada núcleo del procesador, dividida habitualmente en L1 de datos y L1 de instrucciones, ofreciendo los tiempos de acceso más rápidos (1-2 ciclos de reloj).'
      },
      {
        id: 'hw-2',
        text: 'En una placa base moderna con interfaz PCIe 4.0, ¿cuál es el ancho de banda teórico aproximado por carril (lane, x1) en cada dirección?',
        options: [
          'Aproximadamente 500 MB/s',
          'Aproximadamente 1 GB/s',
          'Aproximadamente 2 GB/s',
          'Aproximadamente 8 GB/s'
        ],
        correctIndex: 2,
        explanation: 'PCIe 4.0 proporciona aproximadamente 1.97 GB/s (~2 GB/s) por carril en cada dirección (el doble que PCIe 3.0 con ~1 GB/s). Un slot PCIe 4.0 x16 alcanza cerca de 31.5 GB/s.'
      },
      {
        id: 'hw-3',
        text: '¿Qué estándar de fuente de alimentación garantiza una eficiencia energética mínima del 80% con cargas del 20%, 50% y 100%?',
        options: [
          'Certificación ATX v2.4',
          'Certificación 80 PLUS',
          'Certificación Energy Star 5.0',
          'Estándar PFC Activo clase A'
        ],
        correctIndex: 1,
        explanation: 'La certificación 80 PLUS garantiza que la fuente de alimentación convierte al menos el 80% de la energía de la red eléctrica en corriente continua útil, reduciendo la disipación térmica.'
      },
      {
        id: 'hw-4',
        text: 'En una configuración de almacenamiento RAID 5 con 4 discos de 2 TB cada uno, ¿cuál es la capacidad útil total disponible para almacenar datos?',
        options: [
          '2 TB (1 disco)',
          '4 TB (2 discos)',
          '6 TB (3 discos útiles, 1 para paridad distribuida)',
          '8 TB (todos los discos sumados)'
        ],
        correctIndex: 2,
        explanation: 'En RAID 5 la capacidad neta es (N - 1) * tamaño, donde N es el número de discos. Con 4 discos de 2 TB: (4 - 1) * 2 TB = 6 TB útiles, dedicando el equivalente a 1 disco a información de paridad distribuida.'
      },
      {
        id: 'hw-5',
        text: '¿Cuál es la función principal de la rutina POST (Power-On Self-Test) que ejecuta la BIOS/UEFI al pulsar el botón de encendido?',
        options: [
          'Cargar el núcleo del sistema operativo en el sector de arranque MBR.',
          'Comprobar y verificar el correcto funcionamiento del hardware básico (CPU, memoria RAM, vídeo y teclado).',
          'Desfragmentar las unidades SSD NVMe para acelerar la inicialización.',
          'Configurar las direcciones IP de la tarjeta de red mediante DHCP.'
        ],
        correctIndex: 1,
        explanation: 'El POST es una secuencia de diagnóstico de bajo nivel ejecutada por el firmware de la placa para verificar la integridad del procesador, módulos de memoria RAM, tarjeta gráfica y dispositivos críticos antes de ceder el control al gestor de arranque.'
      },
      {
        id: 'hw-6',
        text: '¿Qué ventaja fundamental ofrece la memoria RAM con tecnología ECC (Error-Correcting Code) empleada en servidores?',
        options: [
          'Permite duplicar la velocidad de frecuencia en MHz respecto a la RAM estándar.',
          'Es capaz de detectar y corregir automáticamente errores de un solo bit en la memoria (Single-Bit Errors).',
          'Permite conectarse directamente a ranuras PCIe sin pasar por el controlador de memoria.',
          'Elimina la necesidad de utilizar disipadores térmicos.'
        ],
        correctIndex: 1,
        explanation: 'La memoria ECC incluye bits adicionales de paridad para detectar y corregir al vuelo errores de bit causados por interferencias electromagnéticas o radiación cósmica, evitando caídas inesperadas del sistema en servidores.'
      },
      {
        id: 'hw-7',
        text: '¿Qué protocolo de interfaz de almacenamiento fue desarrollado específicamente para memorias flash no volátiles a través de carriles directos PCI Express?',
        options: [
          'AHCI (Advanced Host Controller Interface)',
          'NVMe (Non-Volatile Memory Express)',
          'SCSI Paralelo',
          'SATA III a 6 Gbps'
        ],
        correctIndex: 1,
        explanation: 'NVMe fue concebido desde cero para unidades SSD modernas, sustituyendo al veterano protocolo AHCI (pensado para discos duros mecánicos) y ofreciendo múltiples colas de comandos con mínima latencia y conexión directa por PCIe.'
      },
      {
        id: 'hw-8',
        text: 'Al manipular componentes internos de un equipo informático, ¿cuál es la medida preventiva indispensable para evitar daños por descargas electrostáticas (ESD)?',
        options: [
          'Utilizar siempre guantes de lana aislantes.',
          'Utilizar una pulsera antiestática conectada a una toma de tierra o chasis metálico.',
          'Limpiar las ranuras de la placa base con agua destilada.',
          'Trabajar sobre una superficie de moqueta o alfombra de plástico.'
        ],
        correctIndex: 1,
        explanation: 'La pulsera antiestática deriva la carga electrostática del técnico hacia tierra o al chasis metálico descargado, impidiendo que una descarga invisible dañe los microcircuitos de silicio sensibles.'
      },

      // ── UD1: Hardware y componentes del equipo ──
      {
        id: 'hw-ud1-1',
        category: 'ud1',
        text: '¿Qué tipo de tarjeta gráfica utiliza parte de la memoria RAM del sistema para la visualización de datos?',
        options: ['PCI', 'Externa', 'Integrada', 'Dedicada'],
        correctIndex: 2,
        explanation: 'La tarjeta gráfica integrada no tiene su propia memoria VRAM, sino que comparte parte de la RAM del sistema para las tareas de renderizado.'
      },
      {
        id: 'hw-ud1-2',
        category: 'ud1',
        text: '¿Qué tecnología permite la conexión de múltiples dispositivos en una sola cadena en entornos empresariales?',
        options: ['PATA', 'SATA', 'SCSI', 'USB'],
        correctIndex: 2,
        explanation: 'SCSI (Small Computer System Interface) permite encadenar múltiples dispositivos (hasta 15 en SCSI estándar) en un único bus, muy utilizado en entornos empresariales y servidores.'
      },
      {
        id: 'hw-ud1-3',
        category: 'ud1',
        text: '¿Qué función cumple el chipset en una placa base moderna?',
        options: [
          'Sustituir a la fuente de alimentación',
          'Convertir señales HDMI en señales de red',
          'Coordinar la comunicación entre el procesador y otros subsistemas de la placa',
          'Almacenar permanentemente los archivos del usuario'
        ],
        correctIndex: 2,
        explanation: 'El chipset actúa como el centro de control de la placa base, gestionando el flujo de datos entre la CPU, la RAM, el almacenamiento y los periféricos.'
      },
      {
        id: 'hw-ud1-4',
        category: 'ud1',
        text: '¿Qué tecnología de conexión permite la transmisión de datos a través de ondas electromagnéticas?',
        options: ['Coaxial', 'Wi-Fi', 'Ethernet', 'Par trenzado'],
        correctIndex: 1,
        explanation: 'Wi-Fi utiliza ondas de radio (electromagnéticas) para la transmisión inalámbrica de datos, a diferencia de Ethernet, coaxial y par trenzado que son medios de transmisión cableados.'
      },
      {
        id: 'hw-ud1-5',
        category: 'ud1',
        text: '¿Por qué PCIe es relevante al elegir una tarjeta de expansión?',
        options: [
          'Porque sustituye a la memoria RAM',
          'Porque impide instalar controladores de dispositivo',
          'Porque determina el formato de los documentos ofimáticos',
          'Porque define el tipo de ranura, el ancho de banda y la compatibilidad física y lógica'
        ],
        correctIndex: 3,
        explanation: 'PCIe (Peripheral Component Interconnect Express) define la versión (3.0, 4.0, 5.0), el número de carriles (x1, x4, x8, x16) y por tanto la compatibilidad física y el ancho de banda disponible para la tarjeta.'
      },
      {
        id: 'hw-ud1-6',
        category: 'ud1',
        text: 'Al diagnosticar reinicios por temperatura elevada en un equipo de alto rendimiento, ¿qué componente se revisaría primero?',
        options: [
          'La configuración del gestor de arranque',
          'La licencia del sistema operativo',
          'El nombre del grupo de trabajo',
          'El sistema de refrigeración y la correcta aplicación de pasta térmica'
        ],
        correctIndex: 3,
        explanation: 'Los reinicios por temperatura elevada suelen deberse a una refrigeración insuficiente o a pasta térmica seca/mal aplicada entre el procesador y el disipador, lo que impide la correcta disipación del calor.'
      },
      {
        id: 'hw-ud1-7',
        category: 'ud1',
        text: '¿Qué componente de la placa base permite la conexión de múltiples dispositivos periféricos?',
        options: ['Chipset', 'CMOS', 'BIOS', 'Ranuras de expansión'],
        correctIndex: 3,
        explanation: 'Las ranuras de expansión (PCIe, PCI) permiten añadir tarjetas adicionales como gráficas, de red, de sonido o capturadoras, ampliando las capacidades del sistema.'
      },
      {
        id: 'hw-ud1-8',
        category: 'ud1',
        text: '¿Qué tipo de memoria se utiliza en las tarjetas gráficas dedicadas para mejorar el rendimiento gráfico?',
        options: ['VRAM', 'DRAM', 'EEPROM', 'SRAM'],
        correctIndex: 0,
        explanation: 'La VRAM (Video RAM) es un tipo de memoria de alta velocidad diseñada específicamente para almacenar texturas, framebuffers y otros datos gráficos en tarjetas gráficas dedicadas.'
      },
      {
        id: 'hw-ud1-9',
        category: 'ud1',
        text: '¿Qué elemento almacena temporalmente los datos e instrucciones que la CPU necesita de forma inmediata?',
        options: [
          'El chasis del equipo',
          'La memoria RAM',
          'La ROM del firmware',
          'La tarjeta de red'
        ],
        correctIndex: 1,
        explanation: 'La memoria RAM (Random Access Memory) es la memoria de trabajo del sistema: almacena temporalmente el sistema operativo, aplicaciones y datos activos para que la CPU pueda acceder a ellos rápidamente.'
      },
      {
        id: 'hw-ud1-10',
        category: 'ud1',
        text: '¿Qué herramienta permite detectar y supervisar los sensores térmicos en sistemas basados en Linux?',
        options: ['HWMonitor', 'lm-sensors', 'SpeedFan', 'CoreTemp'],
        correctIndex: 1,
        explanation: 'lm-sensors es un paquete de Linux que permite leer los sensores de temperatura, voltaje y velocidad de ventiladores integrados en la placa base y otros componentes hardware.'
      },
      {
        id: 'hw-ud1-11',
        category: 'ud1',
        text: '¿Qué tipo de refrigeración es más eficiente para sistemas de alto rendimiento?',
        options: [
          'Refrigeración por aire',
          'Ventilación pasiva',
          'Disipadores de aire',
          'Refrigeración líquida'
        ],
        correctIndex: 3,
        explanation: 'La refrigeración líquida (AIO o custom loop) transfiere el calor mediante un líquido refrigerante hacia un radiador, siendo más eficiente que el aire para sistemas de alto rendimiento o overclocking.'
      },
      {
        id: 'hw-ud1-12',
        category: 'ud1',
        text: 'Durante la secuencia de arranque, ¿qué función cumple UEFI frente a BIOS heredada?',
        options: [
          'Ofrecer un firmware más flexible, compatible con GPT y funciones de arranque seguro',
          'Eliminar la necesidad de memoria RAM',
          'Convertir discos SSD en memoria ROM',
          'Sustituir físicamente la placa base'
        ],
        correctIndex: 0,
        explanation: 'UEFI (Unified Extensible Firmware Interface) supera a la BIOS clásica al soportar discos GPT de más de 2 TB, ofrecer interfaz gráfica, Secure Boot y tiempos de arranque más rápidos.'
      },
      {
        id: 'hw-ud1-13',
        category: 'ud1',
        text: 'En una placa base con varios bancos de RAM, ¿qué dato debe comprobarse antes de ampliar memoria para evitar incompatibilidades?',
        options: [
          'La marca del monitor conectado al equipo',
          'El sistema de archivos usado en el disco principal',
          'Solo el color de los disipadores de los módulos',
          'El tipo de módulo, la velocidad admitida y la capacidad máxima soportada por placa y CPU'
        ],
        correctIndex: 3,
        explanation: 'Antes de ampliar la RAM es imprescindible consultar el manual de la placa para conocer el tipo de módulo compatible (DDR4/DDR5), la frecuencia máxima admitida y la capacidad total soportada.'
      },
      {
        id: 'hw-ud1-14',
        category: 'ud1',
        text: '¿Qué tipo de bus se utiliza para conectar dispositivos de almacenamiento en sistemas modernos?',
        options: ['PATA', 'USB', 'SATA', 'SCSI'],
        correctIndex: 2,
        explanation: 'SATA (Serial ATA) es el estándar actual para conectar discos duros y SSDs en sistemas de consumo, superando a PATA (IDE) por su menor tamaño de cable, mayor velocidad y soporte de hot-swap.'
      },
      {
        id: 'hw-ud1-15',
        category: 'ud1',
        text: '¿Qué tecnología de almacenamiento ofrece las mayores velocidades de lectura y escritura?',
        options: ['SSD', 'CD-ROM', 'DVD', 'HDD'],
        correctIndex: 0,
        explanation: 'Los SSD (Solid State Drive), especialmente los NVMe por PCIe, ofrecen velocidades muy superiores a los HDD mecánicos y a los medios ópticos, al no tener partes móviles y acceder directamente a celdas de memoria flash.'
      },
      {
        id: 'hw-ud1-16',
        category: 'ud1',
        text: '¿Qué técnica de conexión entre tarjetas gráficas permite mejorar el rendimiento gráfico en sistemas NVIDIA?',
        options: ['SLI', 'RAID', 'AHCI', 'CrossFire'],
        correctIndex: 0,
        explanation: 'SLI (Scalable Link Interface) es la tecnología de NVIDIA para combinar dos o más tarjetas gráficas, repartiendo la carga de renderizado entre ellas para mejorar el rendimiento (CrossFire es el equivalente de AMD).'
      },
      {
        id: 'hw-ud1-17',
        category: 'ud1',
        text: '¿Qué dispositivo de almacenamiento secundario de solo una escritura tiene más capacidad de almacenamiento?',
        options: ['HDD', 'EEPROM', 'BD-R', 'DVD-RW'],
        correctIndex: 2,
        explanation: 'El BD-R (Blu-ray Disc Recordable) permite una sola escritura y ofrece una capacidad de 25 GB (capa simple) o 50 GB (doble capa), muy superior a los DVD-RW (4,7 GB) entre los medios ópticos de una sola escritura.'
      },
      {
        id: 'hw-ud1-18',
        category: 'ud1',
        text: '¿Qué tipo de bus permite la conexión de tarjetas gráficas de alto rendimiento en la placa base?',
        options: ['ISA', 'AGP', 'PCI-Express (PCIe)', 'USB'],
        correctIndex: 2,
        explanation: 'PCI-Express (PCIe) x16 es el estándar actual para tarjetas gráficas de alto rendimiento, ofreciendo gran ancho de banda bidireccional para mover grandes volúmenes de datos entre la GPU y el sistema.'
      },
      {
        id: 'hw-ud1-19',
        category: 'ud1',
        text: '¿Qué tecnología permite la conexión de dispositivos de almacenamiento con soporte para intercambio en caliente?',
        options: ['RAID', 'IDE', 'PATA', 'AHCI'],
        correctIndex: 3,
        explanation: 'AHCI (Advanced Host Controller Interface) es la interfaz lógica que habilita funciones avanzadas de SATA como el hot-swap (intercambio en caliente de unidades) y el NCQ (Native Command Queuing).'
      },
      {
        id: 'hw-ud1-20',
        category: 'ud1',
        text: '¿Qué tipo de conexión es preferida para configuraciones multimonitor y resoluciones ultrapanorámicas?',
        options: ['HDMI', 'VGA', 'DisplayPort', 'DVI'],
        correctIndex: 2,
        explanation: 'DisplayPort soporta mayores resoluciones, tasas de refresco y profundidad de color que HDMI estándar, y mediante MST (Multi-Stream Transport) permite conectar varios monitores en cadena (daisy chain) desde un solo puerto.'
      }
    ]
  },

  // 2. GESTIÓN DE BASES DE DATOS
  {
    id: 'asir-bases-datos',
    title: 'A1S2627ASIR - Gestión de bases de datos',
    description: 'Diseño conceptual y lógico, modelo relacional, normalización (1FN a 3FN), lenguaje SQL (DDL, DML, DCL), transacciones ACID, índices y procedimientos almacenados.',
    category: 'Gestión de bases de datos',
    timeLimitMinutes: 20,
    penaltyRatio: 0.33,
    createdAt: '2026-02-01T08:30:00.000Z',
    author: 'Kernel Study',
    questions: [
      {
        id: 'gbd-1',
        text: 'En el diseño de bases de datos relacionales, una tabla se encuentra en Segunda Forma Normal (2FN) si y solo si:',
        options: [
          'Está en 1FN y todos los atributos no clave tienen dependencia funcional completa respecto a la clave primaria.',
          'No contiene atributos nulos en ninguna de sus columnas.',
          'Está en 1FN y no existen dependencias funcionales transitivas entre atributos no clave.',
          'Tiene como mínimo dos claves foráneas vinculadas a tablas externas.'
        ],
        correctIndex: 0,
        explanation: 'La 2FN exige que la relación esté en 1FN y que ningún atributo no clave dependa solo de una parte de la clave primaria (dependencia parcial), lo cual afecta especialmente a tablas con claves primarias compuestas.'
      },
      {
        id: 'gbd-2',
        text: 'En lenguaje SQL, ¿cuál es la diferencia fundamental entre las cláusulas WHERE y HAVING?',
        options: [
          'WHERE solo puede usarse en sentencias UPDATE, mientras que HAVING es para SELECT.',
          'WHERE filtra filas individuales antes de que se realice la agregación, mientras que HAVING filtra grupos generados por GROUP BY.',
          'WHERE solo acepta comparaciones de texto y HAVING solo comparaciones numéricas.',
          'No existe diferencia técnica, son sinónimos intercambiables.'
        ],
        correctIndex: 1,
        explanation: 'La cláusula WHERE filtra registros individuales antes de calcular funciones de agrupación (SUM, COUNT, AVG), mientras que HAVING evalúa condiciones sobre los grupos resultantes del GROUP BY.'
      },
      {
        id: 'gbd-3',
        text: '¿Qué propiedad de las transacciones (ACID) garantiza que, una vez confirmada (COMMIT), los cambios persistirán incluso ante un fallo del suministro eléctrico?',
        options: [
          'Atomicidad (Atomicity)',
          'Consistencia (Consistency)',
          'Aislamiento (Isolation)',
          'Durabilidad (Durability)'
        ],
        correctIndex: 3,
        explanation: 'La Durabilidad asegura que los datos modificados por una transacción confirmada queden almacenados de forma permanente en memoria secundaria (disco o logs de rehacer/WAL), sobreviviendo a reinicios o caídas.'
      },
      {
        id: 'gbd-4',
        text: '¿Qué tipo de sentencia SQL pertenece al subconjunto DDL (Data Definition Language)?',
        options: [
          'SELECT',
          'INSERT INTO',
          'ALTER TABLE',
          'GRANT SELECT'
        ],
        correctIndex: 2,
        explanation: 'ALTER TABLE (junto con CREATE y DROP) es una instrucción DDL que modifica la estructura o esquema de los objetos de la base de datos, mientras que INSERT/SELECT son DML y GRANT es DCL.'
      },
      {
        id: 'gbd-5',
        text: 'Si se ejecuta una consulta con un LEFT JOIN entre la tabla "Clientes" (izquierda) y "Pedidos" (derecha), ¿qué registros se obtendrán?',
        options: [
          'Únicamente los clientes que tengan al menos un pedido registrado.',
          'Todos los clientes, tengan o no pedidos asociados (los pedidos ausentes se rellenan con NULL).',
          'Solo los pedidos huérfanos que no pertenezcan a ningún cliente.',
          'El producto cartesiano sin filtrar de ambas tablas.'
        ],
        correctIndex: 1,
        explanation: 'LEFT JOIN conserva todas las filas de la tabla izquierda (Clientes); si no existe coincidencia en la tabla derecha (Pedidos), las columnas de la tabla derecha devuelven NULL.'
      },
      {
        id: 'gbd-6',
        text: '¿Qué estructura de datos utilizan comúnmente los motores de bases de datos relacionales (como MySQL o PostgreSQL) para implementar índices eficientes?',
        options: [
          'Árboles B / B+ (B-Tree)',
          'Listas enlazadas simples',
          'Colas FIFO circulares',
          'Pilas LIFO en memoria de vídeo'
        ],
        correctIndex: 0,
        explanation: 'Los árboles B-Tree y B+Tree mantienen los datos ordenados en nodos equilibrados, permitiendo búsquedas, inserciones y accesos por rango con complejidad logarítmica O(log n).'
      },
      {
        id: 'gbd-7',
        text: '¿Qué comando SQL revierte todas las operaciones ejecutadas dentro de una transacción activa que aún no ha sido consolidada?',
        options: [
          'UNDO ALL',
          'ROLLBACK',
          'RESTORE TABLE',
          'DROP TRANSACTION'
        ],
        correctIndex: 1,
        explanation: 'ROLLBACK deshace todas las modificaciones efectuadas desde el inicio de la transacción o hasta el último SAVEPOINT, devolviendo la base de datos a su estado consistente previo.'
      },
      {
        id: 'gbd-8',
        text: '¿Qué restricción de integridad asegura que no puedan existir dos filas con el mismo valor en una columna, permitiendo habitualmente valores NULL?',
        options: [
          'PRIMARY KEY',
          'FOREIGN KEY',
          'UNIQUE',
          'CHECK'
        ],
        correctIndex: 2,
        explanation: 'La restricción UNIQUE garantiza que todos los valores no nulos de una o varias columnas sean distintos entre sí en toda la tabla.'
      },

      // ── TEST EVALUABLE 1 (UD1-UD2-UD3) ──
      {
        id: 'gbd-t1-1',
        category: 'gbd-test1',
        text: '¿Qué nivel de la arquitectura ANSI/SPARC recoge las vistas de los usuarios?',
        options: [
          'Nivel interno',
          'Nivel de transacciones',
          'Nivel físico',
          'Nivel externo'
        ],
        correctIndex: 3,
        explanation: 'El nivel externo o de vistas describe la parte de la base de datos que interesa a cada usuario o grupo de usuarios particular, ocultando el resto.'
      },
      {
        id: 'gbd-t1-2',
        category: 'gbd-test1',
        text: 'Respecto al diseño conceptual de datos, independiente del SGBD, señala la opción correcta:',
        options: [
          'El modelo relacional es el único modelo posible en el diseño conceptual.',
          'Depende necesariamente del SGBD que se vaya a utilizar.',
          'Ninguna de las opciones anteriores',
          'Puede elaborarse mediante un modelo orientado a objetos.'
        ],
        correctIndex: 3,
        explanation: 'El diseño conceptual es independiente del SGBD y puede modelarse mediante diferentes enfoques de alto nivel, como el modelo Entidad-Relación o un modelo orientado a objetos (UML).'
      },
      {
        id: 'gbd-t1-3',
        category: 'gbd-test1',
        text: 'En los Sistemas de Gestión de Bases de Datos basados en la arquitectura de tres niveles de ANSI, las definiciones de las estructuras de datos se conservan en el componente llamado:',
        options: [
          'Ninguna de las opciones anteriores',
          'Motor de la base de datos',
          'Log o Registro de transacciones',
          'Diccionario de datos o Catálogo'
        ],
        correctIndex: 3,
        explanation: 'El diccionario de datos (o catálogo del sistema) almacena los metadatos: esquemas, definiciones de tablas, vistas, restricciones, tipos y permisos.'
      },
      {
        id: 'gbd-t1-4',
        category: 'gbd-test1',
        text: '¿Qué fragmentación distribuye diferentes filas de una tabla entre ubicaciones?',
        options: [
          'Normalización',
          'Fragmentación horizontal',
          'Replicación completa',
          'Fragmentación vertical'
        ],
        correctIndex: 1,
        explanation: 'La fragmentación horizontal divide una tabla en subconjuntos de filas (tuplas) distribuidas en distintos nodos, mientras que la vertical divide por columnas (atributos).'
      },
      {
        id: 'gbd-t1-5',
        category: 'gbd-test1',
        text: '¿Qué requisito añade la tercera forma normal?',
        options: [
          'Permitir grupos repetitivos',
          'Eliminar la clave primaria',
          'Duplicar datos calculados',
          'Eliminar dependencias transitivas de atributos no clave'
        ],
        correctIndex: 3,
        explanation: 'La 3FN exige estar en 2FN y que ningún atributo no clave dependa transitivamente de la clave primaria (ningún atributo no clave determina a otro atributo no clave).'
      },
      {
        id: 'gbd-t1-6',
        category: 'gbd-test1',
        text: 'En los sistemas de información orientados a procesos, cuando para llegar al dato que nos interesa se realiza, a partir de una clave, un acceso a una tabla intermedia que contiene el puntero a ubicación de los datos buscados, se están usando un:',
        options: [
          'Fichero plano',
          'Fichero relativo',
          'Ninguna de las opciones anteriores',
          'Fichero indexado'
        ],
        correctIndex: 3,
        explanation: 'En los ficheros indexados, un índice o tabla intermedia asocia cada clave al puntero o dirección física donde se ubica el registro en el fichero de datos.'
      },
      {
        id: 'gbd-t1-7',
        category: 'gbd-test1',
        text: '¿Qué elemento del modelo relacional corresponde a una fila de una tabla?',
        options: [
          'Atributo',
          'Tupla',
          'Dominio',
          'Restricción'
        ],
        correctIndex: 1,
        explanation: 'En el modelo relacional formal, cada fila o registro de una tabla recibe el nombre de tupla, mientras que cada columna es un atributo.'
      },
      {
        id: 'gbd-t1-8',
        category: 'gbd-test1',
        text: '¿Qué indica una cardinalidad mínima igual a cero?',
        options: [
          'La relación es obligatoria',
          'La entidad es débil',
          'La participación de la entidad en la relación es opcional',
          'Solo puede existir una instancia'
        ],
        correctIndex: 2,
        explanation: 'Una cardinalidad mínima de 0 (0,n o 0,1) significa que una instancia de la entidad puede existir sin relacionarse obligatoriamente con ninguna instancia de la otra entidad (participación opcional).'
      },
      {
        id: 'gbd-t1-9',
        category: 'gbd-test1',
        text: '¿Qué debe hacerse antes de dibujar el MER a partir de un enunciado complejo?',
        options: [
          'Ejecutar un SELECT',
          'Asignar permisos DCL',
          'Crear directamente tablas físicas',
          'Extraer supuestos semánticos, restricciones y reglas de negocio'
        ],
        correctIndex: 3,
        explanation: 'Antes de modelar, es esencial analizar los requisitos, identificar las reglas de negocio y redactar supuestos semánticos claros para resolver posibles ambigüedades.'
      },
      {
        id: 'gbd-t1-10',
        category: 'gbd-test1',
        text: '¿Qué operación del álgebra relacional permite combinar filas relacionadas de dos tablas?',
        options: [
          'Diferencia',
          'Proyección',
          'Selección',
          'JOIN o composición'
        ],
        correctIndex: 3,
        explanation: 'La operación JOIN (junta o composición) combina tuplas de dos relaciones basándose en una condición de emparejamiento entre sus atributos comunes.'
      },
      {
        id: 'gbd-t1-11',
        category: 'gbd-test1',
        text: 'En la arquitectura de tres niveles, el nivel del SGBD más cercano al usuario final es:',
        options: [
          'Nivel Interno o Físico.',
          'Nivel Conceptual.',
          'Nivel Externo.',
          'Ninguna de las opciones anteriores'
        ],
        correctIndex: 2,
        explanation: 'El nivel externo es el más cercano al usuario, ya que proporciona las vistas personalizadas adaptadas a las necesidades de cada usuario o aplicación.'
      },
      {
        id: 'gbd-t1-12',
        category: 'gbd-test1',
        text: 'El diagrama ER de un enunciado de requisitos es una solución única de diseño conceptual.',
        options: [
          'Todas las opciones anteriores',
          'Falso',
          'Verdadero',
          'Ninguna de las opciones anteriores'
        ],
        correctIndex: 1,
        explanation: 'Falso. Para un mismo enunciado de requisitos pueden existir múltiples diseños E-R válidos según el criterio de abstracción, priorización y análisis del diseñador.'
      },
      {
        id: 'gbd-t1-13',
        category: 'gbd-test1',
        text: '¿Por qué no existe siempre un único diagrama E-R correcto para un mismo caso?',
        options: [
          'Porque las entidades no pueden tener atributos',
          'Porque el MER no admite relaciones',
          'Porque el modelado depende de decisiones de análisis y requisitos priorizados',
          'Porque el diseño conceptual depende del motor físico'
        ],
        correctIndex: 2,
        explanation: 'El modelado conceptual implica decisiones de diseño subjetivas (como elegir si algo se modela como atributo o entidad) en función de las prioridades del negocio.'
      },
      {
        id: 'gbd-t1-14',
        category: 'gbd-test1',
        text: 'En la transformación del modelo E-R al modelo relacional, una relación de N a M entre entidades se convierte en:',
        options: [
          'Una nueva tabla, solo cuando la relación tenga atributos.',
          'Dos tablas, una por cada entidad de la relación.',
          'Ninguna de las opciones anteriores',
          'Una nueva tabla siempre.'
        ],
        correctIndex: 3,
        explanation: 'Una relación muchos a muchos (N:M) siempre se transforma en una nueva tabla relacional cuya clave primaria compuesta está formada por las claves primarias de ambas entidades participantes.'
      },
      {
        id: 'gbd-t1-15',
        category: 'gbd-test1',
        text: 'Para crear un diagrama ER a partir de una recopilación de requisitos se aconseja reescribirlo como supuestos semánticos y reglas o restricciones.',
        options: [
          'Todas las opciones anteriores',
          'Ninguna de las opciones anteriores',
          'Verdadero',
          'Falso'
        ],
        correctIndex: 2,
        explanation: 'Verdadero. Desglosar el texto en supuestos semánticos y restricciones explícitas facilita identificar claramente entidades, atributos y cardinalidades sin ambigüedades.'
      },
      {
        id: 'gbd-t1-16',
        category: 'gbd-test1',
        text: '¿Qué nivel de la arquitectura ANSI/SPARC describe el almacenamiento físico?',
        options: [
          'Nivel externo',
          'Nivel de usuario',
          'Nivel conceptual',
          'Nivel interno'
        ],
        correctIndex: 3,
        explanation: 'El nivel interno o físico describe cómo se almacenan físicamente los datos en los dispositivos de memoria secundaria (estructuras de ficheros, bloques, índices, ordenación).'
      },
      {
        id: 'gbd-t1-17',
        category: 'gbd-test1',
        text: '¿Cómo suele nombrarse una relación en un diagrama E-R?',
        options: [
          'Mediante un tipo de dato',
          'Mediante un número',
          'Mediante un verbo',
          'Mediante una sentencia SELECT'
        ],
        correctIndex: 2,
        explanation: 'Las relaciones representan asociaciones o acciones entre entidades, por lo que la convención estándar es nombrarlas mediante verbos (ej: pertenece, imparte, compra).'
      },
      {
        id: 'gbd-t1-18',
        category: 'gbd-test1',
        text: '¿Qué tipo de base de datos reparte la información entre distintos emplazamientos?',
        options: [
          'Base de datos centralizada',
          'Base de datos distribuida',
          'Vista materializada',
          'Fichero relativo'
        ],
        correctIndex: 1,
        explanation: 'Una base de datos distribuida almacena datos en múltiples nodos o servidores interconectados por una red, manteniendo una apariencia lógica unificada.'
      },
      {
        id: 'gbd-t1-19',
        category: 'gbd-test1',
        text: '¿Qué es una tupla en el modelo relacional?',
        options: [
          'La columna clave de la tabla.',
          'El registro que está vacío.',
          'La relación entre clave primaria y clave secundaria.',
          'Cualquier fila de la tabla.'
        ],
        correctIndex: 3,
        explanation: 'En terminología relacional, una tupla es cada una de las filas o registros que componen el cuerpo de una tabla o relación.'
      },
      {
        id: 'gbd-t1-20',
        category: 'gbd-test1',
        text: 'En la transformación del modelo E-R al modelo relacional, una relación de 1 a N se convierte en:',
        options: [
          'La clave de la entidad N debe añadirse a la tabla de la entidad 1',
          'Una nueva tabla, solo cuando la relación tenga atributos.',
          'Una nueva tabla siempre.',
          'La clave primaria de la entidad 1 debe añadirse a la tabla de la entidad N como clave foránea.'
        ],
        correctIndex: 3,
        explanation: 'En las relaciones 1:N, la clave primaria de la entidad del lado 1 se propaga como clave foránea (foreign key) a la tabla del lado N.'
      },

      // ── TEST EVALUABLE 2 (UD1-UD2-UD3) ──
      {
        id: 'gbd-t2-1',
        category: 'gbd-test2',
        text: 'Una agregación consiste en agrupar un conjunto de entidades relacionadas para que actúe como una sola entidad.',
        options: [
          'Todas las opciones anteriores',
          'Verdadero',
          'Falso',
          'Ninguna de las opciones anteriores'
        ],
        correctIndex: 1,
        explanation: 'Verdadero. La agregación es un concepto de abstracción en el modelo E-R extendido que trata una relación y sus entidades como una entidad de orden superior para poder relacionarla con otra entidad.'
      },
      {
        id: 'gbd-t2-2',
        category: 'gbd-test2',
        text: '¿Qué debe hacerse antes de dibujar el MER a partir de un enunciado complejo?',
        options: [
          'Crear directamente tablas físicas',
          'Extraer supuestos semánticos, restricciones y reglas de negocio',
          'Asignar permisos DCL',
          'Ejecutar un SELECT'
        ],
        correctIndex: 1,
        explanation: 'El primer paso del diseño conceptual es el análisis de requisitos para obtener los supuestos semánticos y reglas de negocio que definirán el diagrama E-R.'
      },
      {
        id: 'gbd-t2-3',
        category: 'gbd-test2',
        text: '¿Qué diferencia básica existe entre una base de datos centralizada y una distribuida?',
        options: [
          'La distribuida reparte los datos entre varios nodos coordinados',
          'La centralizada no puede usar SGBD',
          'La distribuida impide el acceso concurrente',
          'La centralizada carece de esquema conceptual'
        ],
        correctIndex: 0,
        explanation: 'Una base de datos distribuida distribuye sus fragmentos o datos entre múltiples nodos o ubicaciones físicas, coordinados por un SGBD distribuido (SGBDD).'
      },
      {
        id: 'gbd-t2-4',
        category: 'gbd-test2',
        text: 'En los sistemas de información orientados a procesos, cuando para llegar al dato que nos interesa se realiza, a partir de una clave, un acceso a una tabla intermedia que contiene el puntero a ubicación de los datos buscados, se están usando un:',
        options: [
          'Fichero indexado',
          'Fichero plano',
          'Ninguna de las opciones anteriores',
          'Fichero relativo'
        ],
        correctIndex: 0,
        explanation: 'La organización indexada utiliza una tabla de índices que vincula claves con punteros directos al bloque o posición física del registro.'
      },
      {
        id: 'gbd-t2-5',
        category: 'gbd-test2',
        text: '¿Qué forma normal exige valores atómicos y ausencia de grupos repetitivos?',
        options: [
          'Forma normal de Boyce-Codd',
          'Primera forma normal',
          'Segunda forma normal',
          'Tercera forma normal'
        ],
        correctIndex: 1,
        explanation: 'La 1FN (Primera Forma Normal) exige que cada columna contenga únicamente valores atómicos (indivisibles) y que no existan grupos repetitivos ni arrays dentro de una celda.'
      },
      {
        id: 'gbd-t2-6',
        category: 'gbd-test2',
        text: '¿Qué elemento del modelo relacional corresponde a una fila de una tabla?',
        options: [
          'Restricción',
          'Tupla',
          'Dominio',
          'Atributo'
        ],
        correctIndex: 1,
        explanation: 'Una tupla equivale a una fila o registro en una tabla del modelo relacional.'
      },
      {
        id: 'gbd-t2-7',
        category: 'gbd-test2',
        text: 'En un sistema de información orientado a los datos:',
        options: [
          'Ninguna de las opciones anteriores',
          'Se trata de tener un único almacén de información al que pueden acceder las distintas aplicaciones que lo necesiten.',
          'Cada almacén de datos tiene su propia aplicación que lo consulta o actualiza.',
          'Se tienen varios almacenes de datos, aunque entre ellos se encuentra a menudo información repetida.'
        ],
        correctIndex: 1,
        explanation: 'El enfoque orientado a datos centraliza la información en una base de datos única y compartida, eliminando la redundancia y desacoplando los datos de los programas.'
      },
      {
        id: 'gbd-t2-8',
        category: 'gbd-test2',
        text: '¿Qué nivel de la arquitectura ANSI/SPARC describe el almacenamiento físico?',
        options: [
          'Nivel de usuario',
          'Nivel interno',
          'Nivel conceptual',
          'Nivel externo'
        ],
        correctIndex: 1,
        explanation: 'El nivel interno de ANSI/SPARC se encarga de la representación física de los datos: asignación de espacio, rutas de acceso, compresión y cifrado.'
      },
      {
        id: 'gbd-t2-9',
        category: 'gbd-test2',
        text: '¿Qué ventaja puede aportar una vista en el modelo relacional?',
        options: [
          'Evitar cualquier restricción',
          'Sustituir permanentemente todas las tablas',
          'Presentar una parte del esquema y simplificar el acceso de usuarios',
          'Eliminar las claves primarias'
        ],
        correctIndex: 2,
        explanation: 'Una vista (tabla virtual) permite simplificar consultas complejas para el usuario, ocultar columnas confidenciales y personalizar la presentación de datos.'
      },
      {
        id: 'gbd-t2-10',
        category: 'gbd-test2',
        text: 'La notación pata de gallo consiste en elementos gráficos para representar cardinalidades.',
        options: [
          'Verdadero',
          'Falso',
          'Ninguna de las opciones anteriores',
          'Todas las opciones anteriores'
        ],
        correctIndex: 0,
        explanation: 'Verdadero. La notación "pata de gallo" (Crow\'s Foot) utiliza símbolos gráficos (círculo, línea perpendicular y ramificaciones de pata de gallo) para representar cardinalidades mínimas y máximas (0, 1 o muchos).'
      },
      {
        id: 'gbd-t2-11',
        category: 'gbd-test2',
        text: 'El concepto de sistema de gestión de base de datos o SGBD se corresponde con:',
        options: [
          'Una colección de datos almacenados, integrados, interrelacionados y con restricciones.',
          'Un conjunto de software o aplicaciones de gestión de datos.',
          'Un conjunto de datos con redundancia y estructurado.',
          'Ninguna de las opciones anteriores'
        ],
        correctIndex: 1,
        explanation: 'Un SGBD (DBMS) es el software del sistema que permite definir, crear, mantener y controlar el acceso a la base de datos.'
      },
      {
        id: 'gbd-t2-12',
        category: 'gbd-test2',
        text: 'En el Modelo E-R, ¿qué es una cardinalidad máxima?',
        options: [
          'El número máximo de instancias de una entidad que pueden participar en una relación.',
          'El número mínimo de instancias de una entidad, que participan en la relación.',
          'El número total de instancias de una entidad.',
          'Ninguna de las opciones anteriores'
        ],
        correctIndex: 0,
        explanation: 'La cardinalidad máxima expresa el número máximo de ocurrencias de una entidad que pueden vincularse a una ocurrencia dada de la otra entidad en la relación (generalmente 1 o N).'
      },
      {
        id: 'gbd-t2-13',
        category: 'gbd-test2',
        text: 'Al transformar una relación N:M con atributos propios, ¿qué solución relacional es adecuada?',
        options: [
          'Copiar todos los atributos en una sola tabla',
          'Eliminar una de las entidades',
          'Crear una tabla intermedia que incluya las claves de ambas entidades y los atributos de la relación',
          'Convertirla en una vista sin claves'
        ],
        correctIndex: 2,
        explanation: 'Se crea una tabla intermedia que contendrá las claves foráneas hacia las dos entidades (formando juntas la clave primaria) junto a los atributos propios de la relación.'
      },
      {
        id: 'gbd-t2-14',
        category: 'gbd-test2',
        text: '¿Cuál sería el dominio de un atributo llamado "color"?',
        options: [
          'El conjunto de entidades en que aparece el color.',
          'Ninguna de las opciones anteriores',
          'Los tres colores que puede tomar en una entidad llamada "semáforo".',
          'Las entidades que tengan un mismo valor de color.'
        ],
        correctIndex: 2,
        explanation: 'El dominio es el conjunto de valores válidos y admisibles que puede tomar un atributo determinado (en el caso de un semáforo: rojo, amarillo y verde).'
      },
      {
        id: 'gbd-t2-15',
        category: 'gbd-test2',
        text: 'El tipo de datos es una forma de definir el dominio de un atributo.',
        options: [
          'Ninguna de las opciones anteriores',
          'Todas las opciones anteriores',
          'Verdadero',
          'Falso'
        ],
        correctIndex: 2,
        explanation: 'Verdadero. Al asignar un tipo de datos (ej: INTEGER, VARCHAR(50), DATE) se acota y define el dominio de valores válidos que puede almacenar ese atributo.'
      },
      {
        id: 'gbd-t2-16',
        category: 'gbd-test2',
        text: '¿Qué operación del álgebra relacional filtra filas?',
        options: [
          'Proyección',
          'Unión',
          'Producto cartesiano',
          'Selección'
        ],
        correctIndex: 3,
        explanation: 'La operación de selección (denotada por σ, sigma) filtra tuplas (filas) de una relación que satisfacen una condición o predicado lógico dado (equivalente a WHERE en SQL).'
      },
      {
        id: 'gbd-t2-17',
        category: 'gbd-test2',
        text: '¿Por qué no existe siempre un único diagrama E-R correcto para un mismo caso?',
        options: [
          'Porque el MER no admite relaciones',
          'Porque el diseño conceptual depende del motor físico',
          'Porque las entidades no pueden tener atributos',
          'Porque el modelado depende de decisiones de análisis y requisitos priorizados'
        ],
        correctIndex: 3,
        explanation: 'El diseño conceptual depende del punto de vista del analista y de los requisitos específicos del negocio que se prioricen durante el modelado.'
      },
      {
        id: 'gbd-t2-18',
        category: 'gbd-test2',
        text: '¿Qué ventaja aporta un SGBD frente a varias aplicaciones con ficheros independientes?',
        options: [
          'Duplicación obligatoria de los registros',
          'Acceso exclusivamente secuencial',
          'Control centralizado de integridad, seguridad y concurrencia',
          'Eliminación de todos los controles de acceso'
        ],
        correctIndex: 2,
        explanation: 'Un SGBD garantiza un control centralizado de los datos, evitando redundancias e incoherencias, y gestionando la seguridad, integridad y accesos concurrentes de forma unificada.'
      },
      {
        id: 'gbd-t2-19',
        category: 'gbd-test2',
        text: '¿Qué dos propiedades debe cumplir una clave candidata?',
        options: [
          'Pluralidad y mínima.',
          'Unicidad y máxima.',
          'Pluralidad y máxima.',
          'Unicidad y mínima.'
        ],
        correctIndex: 3,
        explanation: 'Una clave candidata debe cumplir: 1) Unicidad (identifica unívocamente a cada tupla sin valores repetidos) y 2) Minimalidad o irreducible (ningún subconjunto propio de sus atributos mantiene la unicidad).'
      },
      {
        id: 'gbd-t2-20',
        category: 'gbd-test2',
        text: 'En la arquitectura de tres niveles, el nivel que define la estructura lógica de la base de datos es:',
        options: [
          'Nivel Interno o Físico.',
          'Ninguna de las opciones anteriores',
          'Nivel Externo.',
          'Nivel Conceptual.'
        ],
        correctIndex: 3,
        explanation: 'El nivel conceptual describe la estructura lógica global de toda la base de datos para la comunidad de usuarios (todas las entidades, atributos, relaciones y restricciones de integridad), ocultando los detalles de almacenamiento físico.'
      }

    ]
  },

  // 3. IMPLANTACIÓN DE APLICACIONES WEB
  {
    id: 'asir-aplicaciones-web',
    title: 'A1S2627ASIR - Implantación de aplicaciones web',
    description: 'Servidores web (Apache HTTP, Nginx), módulos FastCGI/PHP-FPM, servidores de aplicaciones, certificados SSL/TLS Let’s Encrypt, CMS (WordPress, Moodle), proxy inverso y Docker.',
    category: 'Implantación de aplicaciones web',
    timeLimitMinutes: 20,
    penaltyRatio: 0.33,
    createdAt: '2026-02-01T09:00:00.000Z',
    author: 'Kernel Study',
    questions: [
      {
        id: 'iaw-1',
        text: 'En el servidor web Apache en sistemas Linux/Debian, ¿qué directiva dentro del bloque <VirtualHost> define la ruta física del sistema de ficheros donde reside el código de la web?',
        options: [
          'ServerName',
          'DocumentRoot',
          'DirectoryIndex',
          'AliasRoot'
        ],
        correctIndex: 1,
        explanation: 'DocumentRoot especifica el directorio raíz del sistema de archivos local desde el cual Apache sirve los documentos HTML, scripts y recursos estáticos para ese VirtualHost.'
      },
      {
        id: 'iaw-2',
        text: '¿Cuál es la función principal de Nginx cuando se configura como Reverse Proxy (Proxy Inverso) delante de un servidor de aplicaciones como Node.js o Tomcat?',
        options: [
          'Compilar en tiempo real el código Java o JavaScript en código máquina binario.',
          'Recibir las peticiones externas, terminar conexiones SSL/TLS, servir contenido estático y balancear el tráfico hacia el backend.',
          'Sustituir por completo a la base de datos relacional MySQL.',
          'Impedir que los usuarios utilicen el protocolo HTTPS.'
        ],
        correctIndex: 1,
        explanation: 'Como proxy inverso, Nginx actúa como punto de entrada de alto rendimiento: gestiona certificados TLS, cachea contenido estático, mitiga ataques y distribuye la carga entre los servidores internos de la aplicación.'
      },
      {
        id: 'iaw-3',
        text: '¿Qué código de estado HTTP devuelve un servidor web cuando el recurso solicitado ha sido movido de forma permanente a una nueva URL?',
        options: [
          '200 OK',
          '301 Moved Permanently',
          '403 Forbidden',
          '502 Bad Gateway'
        ],
        correctIndex: 1,
        explanation: 'El código 301 indica una redirección permanente. Los motores de búsqueda y navegadores actualizan automáticamente sus enlaces hacia la nueva URL indicada en la cabecera Location.'
      },
      {
        id: 'iaw-4',
        text: '¿Qué comando oficial del cliente Certbot de la EFF se utiliza para solicitar e instalar automáticamente un certificado SSL/TLS gratuito de Let’s Encrypt en un servidor Apache?',
        options: [
          'certbot --apache',
          'openssl install-ssl-now',
          'apt-get install certificate-free',
          'systemctl start letsencrypt'
        ],
        correctIndex: 0,
        explanation: 'El comando "certbot --apache" valida el dominio mediante el desafío ACME, obtiene el certificado emitido por Let’s Encrypt y modifica automáticamente la configuración del VirtualHost en el puerto 443.'
      },
      {
        id: 'iaw-5',
        text: 'Al desplegar un gestor de contenidos (CMS) como WordPress en Linux, ¿qué archivo contiene los parámetros críticos de conexión a la base de datos (DB_NAME, DB_USER, DB_PASSWORD)?',
        options: [
          'wp-config.php',
          '.htaccess',
          'index.php',
          'php.ini'
        ],
        correctIndex: 0,
        explanation: 'El fichero "wp-config.php" es el archivo central de configuración de WordPress donde se definen las credenciales de la base de datos MySQL, el prefijo de tablas y las claves de seguridad/salts.'
      },
      {
        id: 'iaw-6',
        text: 'En un contenedor Docker, ¿cuál es la diferencia entre la instrucción COPY y la instrucción VOLUME en un Dockerfile?',
        options: [
          'COPY descarga imágenes de internet y VOLUME las sube a Docker Hub.',
          'COPY copia ficheros del host al sistema de ficheros de la imagen durante la construcción, mientras que VOLUME define un punto de montaje persistente.',
          'COPY solo sirve para ficheros .tar y VOLUME para ficheros de texto plano.',
          'No existe diferencia, ambas reservan memoria RAM.'
        ],
        correctIndex: 1,
        explanation: 'COPY transfiere archivos estáticos desde el contexto de construcción hacia la imagen, mientras que VOLUME declara un punto de persistencia para que los datos sobrevivan a la destrucción del contenedor.'
      },
      {
        id: 'iaw-7',
        text: '¿Qué tipo de vulnerabilidad web ocurre cuando una aplicación refleja en el navegador código JavaScript no saneado introducido por un usuario malintencionado?',
        options: [
          'SQL Injection (Inyección SQL)',
          'XSS (Cross-Site Scripting)',
          'Buffer Overflow en el kernel',
          'DDoS por saturación SYN'
        ],
        correctIndex: 1,
        explanation: 'XSS permite a atacantes inyectar scripts en el navegador de otros usuarios, comprometiendo cookies de sesión, tokens de autenticación o alterando la interfaz visual.'
      },
      {
        id: 'iaw-8',
        text: '¿Cuál es el propósito del mecanismo PHP-FPM (FastCGI Process Manager)?',
        options: [
          'Diseñar interfaces web en HTML5 de forma interactiva.',
          'Administrar un conjunto de procesos (pool) dedicados a interpretar scripts PHP de forma rápida y eficiente desacoplada del servidor web.',
          'Crear túneles VPN cifrados entre el servidor web y los clientes.',
          'Almacenar copias de seguridad nocturnas en cintas magnéticas.'
        ],
        correctIndex: 1,
        explanation: 'PHP-FPM gestiona pools de procesos PHP persistentes que atienden peticiones a través de sockets UNIX o TCP (FastCGI), evitando sobrecargar el servidor web Nginx o Apache con hilos pesados.'
      },

      // ── IMPLANTACIÓN WEB - UD6: PONTE A PRUEBA 1 ──
      {
        id: 'iaw-ud6-t1-1',
        category: 'iaw-ud6-test1',
        text: '¿Qué riesgo aparece al construir SQL concatenando directamente datos del usuario?',
        options: ['Inyección SQL', 'Normalización de tablas', 'Mayor accesibilidad', 'Cifrado automático'],
        correctIndex: 0,
        explanation: 'Concatenar entradas de usuario directamente en cadenas SQL permite inyectar sentencias maliciosas (SQL Injection) que pueden alterar la consulta, leer o destruir información.'
      },
      {
        id: 'iaw-ud6-t1-2',
        category: 'iaw-ud6-test1',
        text: '¿Qué permite comprobar una prueba de rendimiento sobre acceso a base de datos?',
        options: [
          'El color de los formularios',
          'Tiempo de respuesta y comportamiento ante múltiples consultas o usuarios',
          'La longitud del título HTML',
          'La marca del teclado del administrador'
        ],
        correctIndex: 1,
        explanation: 'Las pruebas de rendimiento evalúan la latencia, los tiempos de respuesta y la estabilidad del motor de base de datos bajo cargas de consultas o usuarios concurrentes.'
      },
      {
        id: 'iaw-ud6-t1-3',
        category: 'iaw-ud6-test1',
        text: '¿Qué método de MySQLi se utiliza para obtener el número de filas devueltas por una consulta SELECT?',
        options: ['get_rows', 'fetch_row', 'num_rows', 'row_count'],
        correctIndex: 2,
        explanation: 'En MySQLi, la propiedad o método $result->num_rows devuelve el número total de filas contenidas en el resultado de una consulta SELECT.'
      },
      {
        id: 'iaw-ud6-t1-4',
        category: 'iaw-ud6-test1',
        text: '¿Qué herramienta se menciona para realizar pruebas de carga y medir el rendimiento de una aplicación web?',
        options: ['Selenium', 'Apache JMeter', 'Wireshark', 'Postman'],
        correctIndex: 1,
        explanation: 'Apache JMeter es una herramienta de referencia para simular cargas pesadas sobre servidores y medir tiempos de respuesta y rendimiento.'
      },
      {
        id: 'iaw-ud6-t1-5',
        category: 'iaw-ud6-test1',
        text: '¿Qué tipo de dato compuesto en PHP es ideal para representar una entidad compleja con datos (propiedades) y comportamientos (métodos) integrados?',
        options: ['Objeto', 'Iterable', 'Recurso', 'Array'],
        correctIndex: 0,
        explanation: 'Un objeto en PHP es una instancia de clase que agrupa propiedades (datos) y métodos (comportamientos) bajo el paradigma de orientación a objetos.'
      },
      {
        id: 'iaw-ud6-t1-6',
        category: 'iaw-ud6-test1',
        text: '¿Qué comando de MySQL se utiliza para eliminar un usuario de la base de datos?',
        options: ['ALTER USER DROP', 'DELETE USER', 'DROP USER', 'REMOVE USER'],
        correctIndex: 2,
        explanation: 'El comando SQL estándar en MySQL para borrar cuentas de usuario es DROP USER \'usuario\'@\'host\';'
      },
      {
        id: 'iaw-ud6-t1-7',
        category: 'iaw-ud6-test1',
        text: '¿Qué función de PHP se utiliza para cerrar una conexión MySQLi?',
        options: ['close', 'end_connection', 'terminate', 'disconnect'],
        correctIndex: 0,
        explanation: 'Se utiliza el método $mysqli->close() o la función procedimental mysqli_close($link) para liberar los recursos de la conexión.'
      },
      {
        id: 'iaw-ud6-t1-8',
        category: 'iaw-ud6-test1',
        text: '¿Qué indica un error de conexión a la base de datos en una aplicación PHP?',
        options: [
          'Que el navegador no admite CSS',
          'Que HTML está mal cerrado siempre',
          'Puede haber fallo de credenciales, servidor, puerto, red o configuración del SGBD',
          'Que el usuario no tiene pantalla'
        ],
        correctIndex: 2,
        explanation: 'Un fallo de conexión suele originarse por credenciales erróneas, servicio MySQL detenido, puerto bloqueado o errores de red.'
      },
      {
        id: 'iaw-ud6-t1-9',
        category: 'iaw-ud6-test1',
        text: '¿Qué comando de MySQL se utiliza para iniciar el servicio en un sistema operativo Linux?',
        options: ['sudo systemctl start mysql', 'mysql -u root -p start', 'mysqladmin start', 'service mysql start'],
        correctIndex: 0,
        explanation: 'En Linux con systemd, el servicio se gestiona e inicia mediante sudo systemctl start mysql (o mariadb).'
      },
      {
        id: 'iaw-ud6-t1-10',
        category: 'iaw-ud6-test1',
        text: '¿Qué práctica mejora la seguridad al crear un usuario de base de datos para una aplicación web?',
        options: [
          'Compartir la contraseña en el código público',
          'Conceder solo los permisos imprescindibles sobre la base de datos necesaria',
          'Conceder todos los privilegios globales',
          'Usar el usuario root en producción'
        ],
        correctIndex: 1,
        explanation: 'El principio de mínimo privilegio exige conceder únicamente permisos indispensables sobre la base de datos específica, evitando el uso de root en aplicaciones web.'
      },

      // ── IMPLANTACIÓN WEB - UD6: PONTE A PRUEBA 2 ──
      {
        id: 'iaw-ud6-t2-1',
        category: 'iaw-ud6-test2',
        text: '¿Qué técnica debe usarse para verificar un correo recibido desde un formulario antes de guardarlo?',
        options: [
          'Cifrarlo con MD5 y mostrarlo',
          'Concatenarlo directamente en SQL',
          'Omitir cualquier control',
          'Validación con filtros y comprobaciones de formato'
        ],
        correctIndex: 3,
        explanation: 'Los datos de entrada deben validarse y sanearse mediante filtros específicos (como filter_var) y expresiones regulares antes de su almacenamiento.'
      },
      {
        id: 'iaw-ud6-t2-2',
        category: 'iaw-ud6-test2',
        text: 'Analizando la sintaxis de PHP, ¿qué elemento NO es sensible a mayúsculas y minúsculas, a diferencia de las variables?',
        options: [
          'Los nombres de las funciones',
          'Las palabras clave (como echo o if)',
          'Los comentarios',
          'Los nombres de las constantes'
        ],
        correctIndex: 1,
        explanation: 'Las palabras clave reservadas de PHP (echo, if, while, function) no son sensibles a mayúsculas y minúsculas, mientras que las variables ($variable) sí lo son.'
      },
      {
        id: 'iaw-ud6-t2-3',
        category: 'iaw-ud6-test2',
        text: 'Si un desarrollador necesita una herramienta de edición de código rápida, minimalista y con capacidad para manejar archivos de gran tamaño, ¿cuál de las opciones sería la más adecuada?',
        options: ['Sublime Text', 'Notepad++', 'Visual Studio Code', 'Eclipse'],
        correctIndex: 0,
        explanation: 'Sublime Text destaca por su velocidad de arranque, interfaz ligera y capacidad para abrir ficheros pesados sin degradar el rendimiento.'
      },
      {
        id: 'iaw-ud6-t2-4',
        category: 'iaw-ud6-test2',
        text: '¿Cuál es el propósito principal de usar declaraciones preparadas en PHP al interactuar con bases de datos?',
        options: [
          'Mejorar la velocidad de las consultas',
          'Aumentar la capacidad de almacenamiento',
          'Prevenir inyecciones SQL',
          'Reducir el tamaño de la base de datos'
        ],
        correctIndex: 2,
        explanation: 'Las sentencias preparadas separan la consulta de los parámetros de datos, impidiendo que entradas maliciosas modifiquen la lógica SQL.'
      },
      {
        id: 'iaw-ud6-t2-5',
        category: 'iaw-ud6-test2',
        text: '¿Qué comando de MySQL se utiliza para otorgar permisos específicos a un usuario?',
        options: ['PERMIT', 'ALLOW', 'GRANT', 'GIVE'],
        correctIndex: 2,
        explanation: 'La instrucción GRANT asigna privilegios de acceso (SELECT, INSERT, etc.) sobre bases de datos o tablas a usuarios especificados.'
      },
      {
        id: 'iaw-ud6-t2-6',
        category: 'iaw-ud6-test2',
        text: '¿Qué conviene registrar en la documentación del acceso a datos?',
        options: [
          'Solo capturas del formulario final',
          'Estructura de tablas, usuarios, permisos, conexión, consultas clave y medidas de seguridad',
          'Contraseñas visibles para todos',
          'El historial personal del desarrollador'
        ],
        correctIndex: 1,
        explanation: 'La documentación técnica debe detallar modelos de datos, roles, permisos, configuración de conexión y buenas prácticas de seguridad aplicadas.'
      },
      {
        id: 'iaw-ud6-t2-7',
        category: 'iaw-ud6-test2',
        text: '¿Qué técnica se utiliza para evitar que los datos del usuario se mezclen con las instrucciones SQL en una consulta?',
        options: ['Declaraciones preparadas', 'Funciones de hash', 'Consultas dinámicas', 'Consultas anidadas'],
        correctIndex: 0,
        explanation: 'Las declaraciones preparadas envían los parámetros por canales separados de la sentencia compilada, evitando la mezcla de datos y código SQL.'
      },
      {
        id: 'iaw-ud6-t2-8',
        category: 'iaw-ud6-test2',
        text: '¿Qué función de PHP se utiliza para generar un nuevo ID de sesión, mejorando la seguridad al minimizar el riesgo de secuestro de sesiones?',
        options: ['session_destroy()', 'session_regenerate_id()', 'unset()', 'session_start()'],
        correctIndex: 1,
        explanation: 'session_regenerate_id() genera un nuevo identificador de sesión conservando los datos, previniendo ataques de fijación y secuestro de sesión.'
      },
      {
        id: 'iaw-ud6-t2-9',
        category: 'iaw-ud6-test2',
        text: '¿Qué comando de MySQL se utiliza para verificar si el servicio está activo en un sistema operativo Windows?',
        options: [
          'mysql -u root -p status',
          'mysqladmin status',
          'Acceder a la interfaz de XAMPP y verificar el estado de MySQL',
          'service mysql check'
        ],
        correctIndex: 1,
        explanation: 'El comando mysqladmin status permite verificar desde consola si el motor de MySQL responde y ver estadísticas de funcionamiento.'
      },
      {
        id: 'iaw-ud6-t2-10',
        category: 'iaw-ud6-test2',
        text: '¿Qué operación corresponde a una actualización de un registro existente desde PHP?',
        options: [
          'Crear una tabla temporal sin datos',
          'Ejecutar una sentencia UPDATE parametrizada',
          'Borrar la base de datos',
          'Cambiar el tema del CMS'
        ],
        correctIndex: 1,
        explanation: 'Modificar registros existentes se realiza ejecutando sentencias UPDATE parametrizadas para asegurar la integridad y seguridad.'
      },

      // ── IMPLANTACIÓN WEB - UD6: PONTE A PRUEBA 3 ──
      {
        id: 'iaw-ud6-t3-1',
        category: 'iaw-ud6-test3',
        text: '¿Qué implicación crucial para la seguridad y la personalización de las aplicaciones web se deriva del uso de lenguajes de script del lado del servidor?',
        options: [
          'Gestión de formularios, autenticación y control de accesos',
          'Manejo eficiente de variables',
          'Optimización del intérprete',
          'Uso de estructuras de control'
        ],
        correctIndex: 0,
        explanation: 'Al ejecutarse en el servidor, los lenguajes de backend permiten autenticar usuarios, proteger accesos y gestionar transacciones confidenciales de forma segura.'
      },
      {
        id: 'iaw-ud6-t3-2',
        category: 'iaw-ud6-test3',
        text: '¿Qué función de PHP se utiliza para validar que un correo electrónico tiene un formato correcto?',
        options: ['check_email', 'validate_email', 'filter_var', 'is_email'],
        correctIndex: 2,
        explanation: 'filter_var($email, FILTER_VALIDATE_EMAIL) es la función nativa estándar en PHP para comprobar si una cadena es una dirección de correo válida.'
      },
      {
        id: 'iaw-ud6-t3-3',
        category: 'iaw-ud6-test3',
        text: '¿Cuál es la función de PHP que se utiliza para cifrar contraseñas antes de almacenarlas en la base de datos?',
        options: ['crypt', 'sha1', 'md5', 'password_hash'],
        correctIndex: 3,
        explanation: 'password_hash() genera hashes seguros con algoritmos robustos (Bcrypt/Argon2) y salting aleatorio automático, siendo la recomendación oficial.'
      },
      {
        id: 'iaw-ud6-t3-4',
        category: 'iaw-ud6-test3',
        text: 'Considerando la flexibilidad de PHP para integrarse con diferentes lenguajes de marcas, ¿qué tipo de aplicación web se beneficiaría significativamente de esta característica y por qué?',
        options: [
          'Un sistema de gestión de contenido (CMS) que necesita actualizar frecuentemente artículos e imágenes sin intervención manual.',
          'Un juego online multijugador',
          'Un sitio web estático con información fija',
          'Una aplicación de calculadora simple'
        ],
        correctIndex: 0,
        explanation: 'Los gestores de contenidos (CMS como WordPress) aprovechan la integración de PHP con HTML para generar páginas web dinámicas consultando bases de datos.'
      },
      {
        id: 'iaw-ud6-t3-5',
        category: 'iaw-ud6-test3',
        text: '¿Qué característica de PHP permite alternar entre código PHP y HTML dentro de un mismo documento, facilitando la creación de páginas web dinámicas?',
        options: [
          'La conversión de tipos de datos',
          'El uso de funciones integradas',
          'La gestión de sesiones',
          'La capacidad de incrustar código PHP dentro de etiquetas HTML.'
        ],
        correctIndex: 3,
        explanation: 'Las etiquetas <?php ... ?> permiten incrustar lógica de servidor en cualquier parte de un documento HTML para generar vistas dinámicas.'
      },
      {
        id: 'iaw-ud6-t3-6',
        category: 'iaw-ud6-test3',
        text: '¿Qué debe hacer una aplicación tras una consulta SELECT que devuelve resultados?',
        options: [
          'Ejecutar DROP DATABASE por seguridad',
          'Cerrar el navegador del usuario',
          'Ignorar errores de conexión',
          'Recorrer el conjunto de resultados y procesar cada fila según la lógica de la página'
        ],
        correctIndex: 3,
        explanation: 'Tras ejecutar SELECT, se itera sobre el conjunto de resultados (mediante bucles y funciones fetch) para procesar y presentar la información.'
      },
      {
        id: 'iaw-ud6-t3-7',
        category: 'iaw-ud6-test3',
        text: '¿Qué función de PHP permite definir una constante, y qué característica fundamental distingue a las constantes de las variables en términos de su mutabilidad?',
        options: ['unset()', 'define()', 'const', 'isset()'],
        correctIndex: 1,
        explanation: 'define() declara constantes globales en tiempo de ejecución. A diferencia de las variables, su valor no puede ser alterado ni redefinido.'
      },
      {
        id: 'iaw-ud6-t3-8',
        category: 'iaw-ud6-test3',
        text: '¿Qué comando de MySQL se utiliza para crear una nueva base de datos?',
        options: ['ADD DATABASE', 'NEW DATABASE', 'INIT DATABASE', 'CREATE DATABASE'],
        correctIndex: 3,
        explanation: 'La sentencia SQL estándar para crear un nuevo catálogo o base de datos es CREATE DATABASE nombre_bd;'
      },
      {
        id: 'iaw-ud6-t3-9',
        category: 'iaw-ud6-test3',
        text: '¿Qué comando de MySQL se utiliza para crear un índice en una tabla para mejorar el rendimiento de las consultas?',
        options: ['INSERT INDEX', 'ALTER TABLE ADD INDEX', 'CREATE INDEX', 'ADD INDEX'],
        correctIndex: 2,
        explanation: 'CREATE INDEX nombre_idx ON tabla(columna); crea una estructura de índice que agiliza las búsquedas y filtros en la tabla.'
      },
      {
        id: 'iaw-ud6-t3-10',
        category: 'iaw-ud6-test3',
        text: '¿Qué comando se utiliza en MySQL para crear un nuevo usuario con permisos específicos?',
        options: [
          'GRANT ALL PRIVILEGES ON. TO \'usuario_web\'@\'localhost\';',
          'ALTER USER \'usuario_web\'@\'localhost\' IDENTIFIED BY \'contraseña_segura\';',
          'CREATE USER \'usuario_web\'@\'localhost\' IDENTIFIED BY \'contraseña_segura\';',
          'DROP USER \'usuario_web\'@\'localhost\';'
        ],
        correctIndex: 2,
        explanation: 'El comando para dar de alta la cuenta de usuario es CREATE USER \'usuario\'@\'host\' IDENTIFIED BY \'password\'; posteriormente se le asignan privilegios con GRANT.'
      }

    ]
  },

  // 4. IMPLANTACIÓN DE SISTEMAS OPERATIVOS
  {
    id: 'asir-sistemas-operativos',
    title: 'A1S2627ASIR - Implantación de sistemas operativos',
    description: 'Gestión de procesos y memoria virtual, sistemas de archivos (ext4, NTFS), permisos POSIX y ACLs, usuarios y grupos, systemd, automatización con scripts y arranque del sistema.',
    category: 'Implantación de sistemas operativos',
    timeLimitMinutes: 20,
    penaltyRatio: 0.33,
    createdAt: '2026-02-01T09:30:00.000Z',
    author: 'Kernel Study',
    questions: [
      {
        id: 'iso-1',
        text: 'En un sistema Linux, ¿qué permisos octales otorga el comando "chmod 754 archivo.sh"?',
        options: [
          'Propietario: lectura/escritura/ejecución (rwx); Grupo: lectura/ejecución (r-x); Otros: solo lectura (r--).',
          'Propietario: solo lectura; Grupo: ejecución; Otros: control total.',
          'Propietario: lectura/escritura; Grupo: lectura; Otros: lectura/escritura.',
          'Propietario: rwx; Grupo: rwx; Otros: rwx.'
        ],
        correctIndex: 0,
        explanation: 'En notación octal: 7 = 4+2+1 (rwx para propietario), 5 = 4+0+1 (r-x para grupo), 4 = 4+0+0 (r-- para otros).'
      },
      {
        id: 'iso-2',
        text: 'En sistemas operativos basados en systemd, ¿qué comando recarga la configuración de los ficheros de unidad (unit files) tras modificar un servicio en /etc/systemd/system/?',
        options: [
          'systemctl restart all',
          'systemctl daemon-reload',
          'service reload-daemon',
          'systemd-update-grub'
        ],
        correctIndex: 1,
        explanation: '"systemctl daemon-reload" indica a systemd que vuelva a escanear todos los ficheros de configuración de unidades (.service, .timer, etc.) sin necesidad de reiniciar el sistema operativo.'
      },
      {
        id: 'iso-3',
        text: '¿En qué archivo del sistema Linux se almacenan los hashes cifrados de las contraseñas de los usuarios locales?',
        options: [
          '/etc/passwd',
          '/etc/shadow',
          '/etc/security/limits.conf',
          '/var/log/auth.log'
        ],
        correctIndex: 1,
        explanation: 'Por seguridad, /etc/passwd solo contiene metadatos legibles por cualquier usuario (UID, GID, shell, home), mientras que los hashes cifrados de las contraseñas residen en /etc/shadow, accesible exclusivamente por root (permiso 640/600).'
      },
      {
        id: 'iso-4',
        text: '¿Qué algoritmo de planificación de CPU asigna a cada proceso listo una pequeña fracción de tiempo fija denominada "quantum"?',
        options: [
          'FIFO (First In First Out)',
          'SJF (Shortest Job First)',
          'Round Robin (Turno rotatorio)',
          'Prioridad estática no preferente'
        ],
        correctIndex: 2,
        explanation: 'Round Robin es un algoritmo preventivo (preemptive) diseñado para sistemas de tiempo compartido que distribuye la CPU equitativamente mediante rodajas de tiempo (quantums).'
      },
      {
        id: 'iso-5',
        text: '¿Qué sistema de archivos es el estándar nativo predeterminado en la mayoría de distribuciones Linux modernas como Ubuntu o Debian?',
        options: [
          'NTFS',
          'FAT32',
          'ext4 (Fourth Extended Filesystem)',
          'HFS+'
        ],
        correctIndex: 2,
        explanation: 'ext4 es el sistema de ficheros transaccional (journaling) estándar en Linux, ofreciendo soporte para volúmenes gigantescos, asignación retardada y protección frente a caídas imprevistas.'
      },
      {
        id: 'iso-6',
        text: 'En Windows Server, ¿qué tecnología de directorio activo y servicio de dominio centraliza la autenticación, directivas de grupo (GPO) y gestión de usuarios en red?',
        options: [
          'Active Directory Domain Services (AD DS)',
          'IIS Application Pool',
          'Windows Defender Firewall',
          'PowerShell DSC únicamente'
        ],
        correctIndex: 0,
        explanation: 'AD DS (Active Directory Domain Services) almacena información jerárquica sobre objetos de red (usuarios, equipos, impresoras) y proporciona autenticación basada en Kerberos y LDAP.'
      },
      {
        id: 'iso-7',
        text: '¿Qué mecanismo utiliza el kernel de un sistema operativo cuando la memoria RAM física se llena por completo?',
        options: [
          'Memoria Virtual mediante espacio Swap (partición o fichero de intercambio en disco).',
          'Eliminación aleatoria e irrevocable de ficheros de usuario.',
          'Reducción automática de la resolución de pantalla a 640x480.',
          'Sobrecarga de los condensadores de la placa base.'
        ],
        correctIndex: 0,
        explanation: 'El gestor de memoria virtual utiliza la paginación para mover páginas de memoria inactivas desde la RAM física hacia el espacio swap en disco, liberando memoria para los procesos activos.'
      },
      {
        id: 'iso-8',
        text: '¿Cuál es el gestor de arranque (bootloader) predeterminado en la mayoría de distribuciones GNU/Linux con soporte UEFI?',
        options: [
          'LILO (Linux Loader)',
          'GRUB 2 (Grand Unified Bootloader v2)',
          'NTLDR de Windows',
          'Syslinux'
        ],
        correctIndex: 1,
        explanation: 'GRUB 2 es el gestor de arranque modular universal en Linux, compatible con BIOS y UEFI, capaz de cargar núcleos Linux, inicializar el disco RAM inicial (initramfs) y gestionar sistemas multiboot.'
      }
    ]
  }
];
