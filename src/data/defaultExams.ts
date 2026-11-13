import { Exam } from '../types';

export const DEFAULT_EXAMS: Exam[] = [
  {
    id: 'constitucion-espanola-1978',
    title: 'Constitución Española de 1978: Título Preliminar y Derechos',
    description: 'Simulacro oficial de 12 preguntas sobre valores superiores, derechos fundamentales, deberes y libertades públicas.',
    category: 'Oposiciones y Leyes',
    timeLimitMinutes: 15,
    penaltyRatio: 0.33, // 3 fallos restan 1 acierto
    createdAt: '2026-01-10T10:00:00.000Z',
    author: 'Thea Study Team',
    questions: [
      {
        id: 'ce-1',
        text: 'Según el artículo 1.1 de la Constitución Española, España se constituye en un Estado social y democrático de Derecho que propugna como valores superiores de su ordenamiento jurídico:',
        options: [
          'La libertad, la justicia, la igualdad y el pluralismo político.',
          'La solidaridad, la paz, la libertad y la justicia social.',
          'La soberanía popular, la monarquía parlamentaria y la unidad de la Nación.',
          'La seguridad jurídica, la igualdad ante la ley y la jerarquía normativa.'
        ],
        correctIndex: 0,
        explanation: 'El Art. 1.1 CE establece textualmente: "España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político".'
      },
      {
        id: 'ce-2',
        text: '¿En quién reside la soberanía nacional según el artículo 1.2 de la Constitución?',
        options: [
          'En el Rey, como Jefe del Estado.',
          'En las Cortes Generales, representantes de la Nación.',
          'En el pueblo español, del que emanan los poderes del Estado.',
          'En el Gobierno de la Nación y su Presidente.'
        ],
        correctIndex: 2,
        explanation: 'El Art. 1.2 CE afirma: "La soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado".'
      },
      {
        id: 'ce-3',
        text: '¿Cuál es la forma política del Estado español establecida en el artículo 1.3?',
        options: [
          'República Constitucional y Democrática.',
          'Monarquía parlamentaria.',
          'Monarquía federal y autonómica.',
          'Estado Unitario Descentralizado.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 1.3 CE dicta que "La forma política del Estado español es la Monarquía parlamentaria".'
      },
      {
        id: 'ce-4',
        text: '¿A qué edad se alcanza la mayoría de edad según el artículo 12 de la Constitución?',
        options: [
          'A los 16 años.',
          'A los 18 años.',
          'A los 21 años.',
          'A los 18 años, salvo excepciones contempladas en el Código Penal.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 12 CE es taxativo: "Los españoles son mayores de edad a los dieciocho años".'
      },
      {
        id: 'ce-5',
        text: 'Respecto a la pena de muerte, ¿qué establece el artículo 15 de la Constitución Española?',
        options: [
          'Queda abolida en todos los casos sin excepción alguna.',
          'Queda abolida, salvo lo que puedan disponer las leyes penales militares para tiempos de guerra.',
          'Se permite exclusivamente para delitos de alta traición al Estado.',
          'Solo es aplicable mediante sentencia firme del Tribunal Supremo.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 15 CE expresa: "Todos tienen derecho a la vida y a la integridad física y moral... Queda abolida la pena de muerte, salvo lo que puedan disponer las leyes penales militares para tiempos de guerra".'
      },
      {
        id: 'ce-6',
        text: 'El plazo máximo de la detención preventiva sin puesta a disposición judicial, según el artículo 17.2, es de:',
        options: [
          '24 horas.',
          '48 horas.',
          '72 horas.',
          '96 horas en supuestos de terrorismo.'
        ],
        correctIndex: 2,
        explanation: 'El Art. 17.2 CE dispone: "La detención preventiva no podrá durar más del tiempo estrictamente necesario... y, en todo caso, en el plazo máximo de setenta y dos horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial".'
      },
      {
        id: 'ce-7',
        text: 'El procedimiento para que cualquier persona privada ilegalmente de libertad sea puesta de inmediato a disposición judicial se denomina:',
        options: [
          'Recurso de Amparo Constitucional.',
          'Habeas Corpus.',
          'Injunción Judicial Urgente.',
          'Diligencia de Excarcelación Previa.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 17.4 CE señala: "La ley regulará un procedimiento de habeas corpus para producir la inmediata puesta a disposición judicial de toda persona ilegalmente detenida".'
      },
      {
        id: 'ce-8',
        text: '¿Qué confesión religiosa tiene carácter estatal según el artículo 16.3 de la Constitución?',
        options: [
          'La Iglesia Católica Apostólica Romana.',
          'Ninguna confesión tendrá carácter estatal.',
          'El Cristianismo en sus diversas confesiones tradicionales.',
          'Las confesiones reconocidas de notorio arraigo histórico.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 16.3 CE indica: "Ninguna confesión tendrá carácter estatal. Los poderes públicos tendrán en cuenta las creencias religiosas de la sociedad española y mantendrán las consiguientes relaciones de cooperación con la Iglesia Católica y las demás confesiones".'
      },
      {
        id: 'ce-9',
        text: '¿Es necesaria la autorización previa para el ejercicio del derecho de reunión pacífica y sin armas?',
        options: [
          'Sí, siempre se debe pedir permiso a la delegación de gobierno con 15 días de antelación.',
          'No, no necesitará autorización previa. En lugares de tránsito público sólo se exige comunicación previa.',
          'Solo cuando asistan más de 20 personas en recintos cerrados.',
          'No, salvo que se celebre en fin de semana o festivo.'
        ],
        correctIndex: 1,
        explanation: 'El Art. 21 CE afirma: "1. Se reconoce el derecho de reunión pacífica y sin armas. El ejercicio de este derecho no necesitará autorización previa. 2. En los casos de reuniones en lugares de tránsito público y manifestaciones se dará comunicación previa a la autoridad".'
      },
      {
        id: 'ce-10',
        text: 'El artículo 20.2 de la Constitución prohíbe expresamente:',
        options: [
          'La censura previa.',
          'La publicidad engañosa en medios estatales.',
          'La crítica a las resoluciones judiciales firmes.',
          'El secreto profesional de los periodistas.'
        ],
        correctIndex: 0,
        explanation: 'El Art. 20.2 CE estipula tajantemente: "El ejercicio de estos derechos no puede restringirse mediante ningún tipo de censura previa".'
      },
      {
        id: 'ce-11',
        text: '¿Qué tipo de ley es preceptiva para el desarrollo de los derechos fundamentales y de las libertades públicas?',
        options: [
          'Decreto-Ley urgente.',
          'Ley Ordinaria con mayoría simple.',
          'Ley Orgánica con mayoría absoluta del Congreso en votación final sobre el conjunto del proyecto.',
          'Ley de Bases mediante delegación legislativa.'
        ],
        correctIndex: 2,
        explanation: 'El Art. 81 CE establece que son leyes orgánicas las relativas al desarrollo de los derechos fundamentales y de las libertades públicas, requiriendo mayoría absoluta del Congreso.'
      },
      {
        id: 'ce-12',
        text: '¿Quién es el alto comisionado de las Cortes Generales para la defensa de los derechos del Título I?',
        options: [
          'El Presidente del Tribunal Constitucional.',
          'El Fiscal General del Estado.',
          'El Defensor del Pueblo.',
          'El Ministro de Justicia.'
        ],
        correctIndex: 2,
        explanation: 'El Art. 54 CE designa al Defensor del Pueblo como alto comisionado de las Cortes Generales para la defensa de los derechos comprendidos en el Título I.'
      }
    ]
  },
  {
    id: 'cultura-general-ciencia',
    title: 'Cultura General, Ciencia y Descubrimientos',
    description: 'Ponte a prueba con este test interactivo de 10 preguntas sobre astronomía, historia, biología y curiosidades científicas.',
    category: 'Cultura y Ciencia',
    timeLimitMinutes: 10,
    penaltyRatio: 0.25, // 4 fallos restan 1
    createdAt: '2026-01-15T12:00:00.000Z',
    author: 'Thea Study Team',
    questions: [
      {
        id: 'cg-1',
        text: '¿Cuál es el planeta más grande de nuestro sistema solar?',
        options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'],
        correctIndex: 1,
        explanation: 'Júpiter es el planeta con mayor masa y volumen del sistema solar, con más de 1.300 veces el volumen de la Tierra.'
      },
      {
        id: 'cg-2',
        text: '¿Qué orgánulo celular es conocido como la "central energética" de la célula eucariota?',
        options: ['El aparato de Golgi', 'El ribosoma', 'La mitocondria', 'El retículo endoplasmático'],
        correctIndex: 2,
        explanation: 'La mitocondria produce la mayor parte del ATP (adenosín trifosfato), la moneda energética utilizada por la célula.'
      },
      {
        id: 'cg-3',
        text: '¿En qué año llegó el ser humano a la Luna con la misión Apolo 11?',
        options: ['1965', '1969', '1972', '1961'],
        correctIndex: 1,
        explanation: 'Neil Armstrong y Buzz Aldrin pisaron la superficie lunar el 20 de julio de 1969 durante la misión Apolo 11.'
      },
      {
        id: 'cg-4',
        text: '¿Cuál es el elemento químico más abundante en la corteza terrestre por masa?',
        options: ['Silicio', 'Hierro', 'Oxígeno', 'Aluminio'],
        correctIndex: 2,
        explanation: 'El oxígeno representa aproximadamente el 46% de la masa de la corteza terrestre, seguido del silicio (alrededor del 28%).'
      },
      {
        id: 'cg-5',
        text: '¿Quién propuso la teoría de la relatividad general publicada en 1915?',
        options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Max Planck'],
        correctIndex: 1,
        explanation: 'Albert Einstein publicó la teoría de la relatividad general en 1915, revolucionando la física gravitatoria moderna.'
      },
      {
        id: 'cg-6',
        text: '¿Qué océano es el más extenso y profundo de la Tierra?',
        options: ['Océano Atlántico', 'Océano Índico', 'Océano Glacial Ártico', 'Océano Pacífico'],
        correctIndex: 3,
        explanation: 'El Océano Pacífico cubre más de 165 millones de km² y alberga el punto más profundo del planeta: la Fosa de las Marianas.'
      },
      {
        id: 'cg-7',
        text: '¿Qué científico descubrió la penicilina en 1928 marcando el inicio de los antibióticos?',
        options: ['Louis Pasteur', 'Alexander Fleming', 'Robert Koch', 'Edward Jenner'],
        correctIndex: 1,
        explanation: 'Alexander Fleming descubrió la penicilina accidentalmente al observar cómo el hongo Penicillium notatum inhibía el crecimiento bacteriano.'
      },
      {
        id: 'cg-8',
        text: '¿A cuántos kilómetros por segundo viaja aproximadamente la luz en el vacío?',
        options: ['150.000 km/s', '300.000 km/s', '500.000 km/s', '1.000.000 km/s'],
        correctIndex: 1,
        explanation: 'La velocidad de la luz en el vacío es de exactamente 299.792,458 km/s, redondeada habitualmente a 300.000 km/s.'
      },
      {
        id: 'cg-9',
        text: '¿Cuál es el río más largo del mundo según las mediciones geográficas modernas?',
        options: ['El río Nilo', 'El río Amazonas', 'El río Yangtsé', 'El río Misisipi'],
        correctIndex: 1,
        explanation: 'Estudios geográficos y satelitales confirman que el río Amazonas es el más largo (unos 6.992 km) además del más caudaloso del mundo.'
      },
      {
        id: 'cg-10',
        text: '¿Qué tipo de enlace químico se produce por la compartición equitativa o polar de pares de electrones entre átomos?',
        options: ['Enlace iónico', 'Enlace metálico', 'Enlace covalente', 'Fuerzas de Van der Waals'],
        correctIndex: 2,
        explanation: 'El enlace covalente une átomos mediante el intercambio de pares de electrones de valencia.'
      }
    ]
  },
  {
    id: 'inteligencia-artificial-tech',
    title: 'Inteligencia Artificial y Computación Moderna',
    description: 'Comprueba tus conocimientos sobre machine learning, redes neuronales, LLMs y principios de software.',
    category: 'Tecnología e Informática',
    timeLimitMinutes: 12,
    penaltyRatio: 0.33,
    createdAt: '2026-02-01T09:00:00.000Z',
    author: 'Thea Study Team',
    questions: [
      {
        id: 'ia-1',
        text: '¿Qué significa la sigla LLM en el contexto de la inteligencia artificial contemporánea?',
        options: [
          'Linear Logic Machine',
          'Large Language Model',
          'Low Latency Memory',
          'Layered Learning Module'
        ],
        correctIndex: 1,
        explanation: 'Large Language Model (Gran Modelo de Lenguaje) refiere a redes neuronales masivas entrenadas con inmensos corpus de texto.'
      },
      {
        id: 'ia-2',
        text: '¿Qué arquitectura introducida en 2017 por Google revolucionó el procesamiento del lenguaje natural mediante mecanismos de atención (Attention)?',
        options: [
          'ResNet',
          'Transformer',
          'Autoencoder Convolucional',
          'Perceptrón Multicapa'
        ],
        correctIndex: 1,
        explanation: 'La arquitectura Transformer, presentada en el histórico paper "Attention Is All You Need", es la base de modelos como GPT, Gemini, Claude y BERT.'
      },
      {
        id: 'ia-3',
        text: 'En Machine Learning, el problema en el que un modelo rinde excesivamente bien en los datos de entrenamiento pero fracasa en datos nuevos se llama:',
        options: [
          'Underfitting (Infraajuste)',
          'Overfitting (Sobreajuste)',
          'Data Drift',
          'Exploding Gradient'
        ],
        correctIndex: 1,
        explanation: 'El Overfitting ocurre cuando el modelo memoriza el ruido o las particularidades del set de entrenamiento, perdiendo capacidad de generalización.'
      },
      {
        id: 'ia-4',
        text: '¿Cuál es la función principal de la técnica de "Active Recall" y la repetición espaciada en aplicaciones de estudio como Thea?',
        options: [
          'Aumentar la velocidad de lectura pasiva del estudiante.',
          'Consolidar la información en la memoria a largo plazo combatiendo la curva del olvido.',
          'Generar automáticamente exámenes sin necesidad de contenido previo.',
          'Comprimir archivos PDF en la nube sin pérdida de calidad.'
        ],
        correctIndex: 1,
        explanation: 'El Active Recall (recuperación activa) exige al cerebro recordar activamente una respuesta, mientras que la repetición espaciada refuerza el recuerdo antes de que se desvanezca en la curva del olvido de Ebbinghaus.'
      },
      {
        id: 'ia-5',
        text: '¿Cuál es el algoritmo de optimización más utilizado para entrenar los pesos de redes neuronales profundas calculando gradientes?',
        options: [
          'Dijkstra',
          'Backpropagation (Retropropagación) y Descenso de Gradiente',
          'Búsqueda binaria',
          'Algoritmo de Prim'
        ],
        correctIndex: 1,
        explanation: 'Backpropagation calcula las derivadas parciales de la función de coste con respecto a los pesos para actualizarlos mediante descenso de gradiente (ej. Adam, SGD).'
      }
    ]
  }
];
