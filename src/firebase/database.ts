import { firebaseApp } from '@/firebase'
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
  where,
  query,
  type DocumentData
} from 'firebase/firestore'

const db = getFirestore(firebaseApp)
export interface Home extends DocumentData {
  id: string
  name: string
}

export function createHome(home: Partial<Home>) {
  return addDoc(homesRef(), home)
}

export function homeById(id: string) {
  return doc(db, 'homes', id)
}

export function updateHome(id: string, data: Partial<Home>) {
  updateDoc(homeById(id), data)
}

function homesRef() {
  return collection(db, 'homes')
}

export function homes(userId: string) {
  const filter = where('userIds', 'array-contains', userId)
  return query(homesRef(), filter)
}
