import { firebaseApp } from '@/firebase'
import { getFirestore, doc, updateDoc, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(firebaseApp)

export interface Home {
  id: string
  name: string
}

export function createHome(home: Partial<Home>) {
  return addDoc(homes(), home)
}

export function homeById(id: string) {
  return doc(db, 'homes', id)
}

export function updateHome(id: string, data: Partial<Home>) {
  updateDoc(homeById(id), data)
}

export function homes() {
  return collection(db, 'homes')
}
