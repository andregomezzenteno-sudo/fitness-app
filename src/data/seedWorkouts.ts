import type { WorkoutDay } from '../types'
import { uid } from '../lib/useLocalStorage'

export const seedWorkouts: WorkoutDay[] = [
  {
    id: uid(),
    name: 'Lunes - Pierna',
    exercises: [
      { id: uid(), name: 'Sentadilla', sets: 4, reps: '8-10', restSec: 120 },
      { id: uid(), name: 'Prensa', sets: 3, reps: '10-12', restSec: 90 },
      { id: uid(), name: 'Zancadas', sets: 3, reps: '12 por pierna', restSec: 90 },
      { id: uid(), name: 'Curl femoral', sets: 3, reps: '12-15', restSec: 60 },
      { id: uid(), name: 'Gemelo de pie', sets: 4, reps: '15-20', restSec: 45 },
    ],
  },
  {
    id: uid(),
    name: 'Martes - Empuje (pecho/hombro/tríceps)',
    exercises: [
      { id: uid(), name: 'Press banca', sets: 4, reps: '6-8', restSec: 120 },
      { id: uid(), name: 'Press militar', sets: 3, reps: '8-10', restSec: 90 },
      { id: uid(), name: 'Press inclinado mancuerna', sets: 3, reps: '10-12', restSec: 90 },
      { id: uid(), name: 'Elevaciones laterales', sets: 3, reps: '12-15', restSec: 60 },
      { id: uid(), name: 'Fondos o press francés', sets: 3, reps: '10-12', restSec: 60 },
    ],
  },
  {
    id: uid(),
    name: 'Jueves - Tirón (espalda/bíceps)',
    exercises: [
      { id: uid(), name: 'Dominadas o jalón al pecho', sets: 4, reps: '8-10', restSec: 120 },
      { id: uid(), name: 'Remo con barra', sets: 3, reps: '8-10', restSec: 90 },
      { id: uid(), name: 'Remo con mancuerna a un brazo', sets: 3, reps: '10-12', restSec: 90 },
      { id: uid(), name: 'Face pull', sets: 3, reps: '15', restSec: 60 },
      { id: uid(), name: 'Curl bíceps barra', sets: 3, reps: '10-12', restSec: 60 },
    ],
  },
  {
    id: uid(),
    name: 'Viernes - Brazo y Core',
    exercises: [
      { id: uid(), name: 'Curl predicador', sets: 3, reps: '10-12', restSec: 60 },
      { id: uid(), name: 'Extensión tríceps polea', sets: 3, reps: '12-15', restSec: 60 },
      { id: uid(), name: 'Curl martillo', sets: 3, reps: '12', restSec: 60 },
      { id: uid(), name: 'Fondos banco', sets: 3, reps: '12-15', restSec: 60 },
      { id: uid(), name: 'Plancha', sets: 3, reps: '45 seg', restSec: 45 },
      { id: uid(), name: 'Rueda abdominal o crunch', sets: 3, reps: '12-15', restSec: 45 },
    ],
  },
]
