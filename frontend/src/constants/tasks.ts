import { TaskOrdering } from '../types/task' //for ordering tPypes

export const ICONS = [
  { name: 'home', path: 'home.png' },
  { name: 'note', path: 'note.png' },
  { name: 'shopping', path: 'shopping.png' },
  { name: 'work', path: 'work.png' },
  { name: 'health', path: 'health.png' },
  { name: 'education', path: 'education.png' },
  { name: 'car', path: 'car.png' },
  { name: 'money', path: 'money.png' },
  { name: 'music', path: 'music.png' },
  { name: 'pet', path: 'pet.png' },
  { name: 'meditation', path: 'meditation.png' },
  { name: 'creative', path: 'creative.png' },
  { name: 'event', path: 'event.png' },
  { name: 'plant', path: 'plant.png' },
  { name: 'clean', path: 'clean.png' },
  { name: 'walk', path: 'walk.png' },
  { name: 'sport', path: 'sport.png' },
  { name: 'podcast', path: 'podcast.png' },
  { name: 'fix', path: 'fix.png' },
  { name: 'computer', path: 'computer.png' }
]

export const ORDERING_OPTIONS: {
  value: TaskOrdering
  label: string
}[] = [
  { value: '-created_at', label: 'New tasks first' },
  { value: 'created_at', label: 'Old tasks first' },
  { value: 'is_completed', label: 'Unfinished tasks first' },
  { value: '-is_completed', label: 'Finished tasks first' },
  { value: '-priority', label: 'Highest priority tasks first' },
  { value: 'priority', label: 'Lowest priority tasks first' }
]
