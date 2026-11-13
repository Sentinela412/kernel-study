import { Exam } from '../types';

export interface SubjectModuleInfo {
  code: string;
  shortName: string;
  fullName: string;
  iconType: 'hardware' | 'database' | 'web' | 'os';
  defaultProgress: number;
}

export const ASIR_MODULES: SubjectModuleInfo[] = [
  {
    code: 'A1S2627ASIR',
    shortName: 'Fundamentos de hardware',
    fullName: 'A1S2627ASIR - Fundamentos de hardware',
    iconType: 'hardware',
    defaultProgress: 54,
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Gestión de bases de datos',
    fullName: 'A1S2627ASIR - Gestión de bases de datos',
    iconType: 'database',
    defaultProgress: 80,
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Implantación de aplicaciones web',
    fullName: 'A1S2627ASIR - Implantación de aplicaciones web',
    iconType: 'web',
    defaultProgress: 78,
  },
  {
    code: 'A1S2627ASIR',
    shortName: 'Implantación de sistemas operativos',
    fullName: 'A1S2627ASIR - Implantación de sistemas operativos',
    iconType: 'os',
    defaultProgress: 60,
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
    author: 'ASIR Oficial',
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
    author: 'ASIR Oficial',
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
    author: 'ASIR Oficial',
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
    author: 'ASIR Oficial',
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
