import UserModel from "@/models/userModel";
import { Visum } from "@/serializer/Visum";

const tag = '[IDB]'
const Localbase = require('localbase').default;
let db = new Localbase('db')

//INIT DATA
// db.collection('me').doc(`1`).add({ id: 1})
// db.collection('years').doc(`1`).add({ id: 1})

//STRUCTURE
interface Result<T> 
{ 
    id: number;
    value: T
}

export const useOfflineData = (): {
  initDb: () => void,
  updateMe: (me: UserModel) => void,
  updateYears: (years: Array<number>) => void,
  updateVisum: (visum: Visum) => Promise<Visum>
  addVisum: (visum: Visum) => Promise<Visum>,
  getVisums: () => Promise<Array<Visum>>
  getVisum: (id: string) => Promise<Visum>,
  getMe: () => Promise<UserModel>,
  getYears: () => Promise<Array<number>>
} => {
  const updateMe = (me: UserModel) => {
    console.log(`${tag} updating me...`)
    db.collection('me').doc(`1`).set({id: 1, value: me})
  }

  const updateYears = (years: Array<number>) => {
    console.log(`${tag} updating years...`)
    db.collection('years').doc(`1`).set({ id: 1, value: years})
  }

  const updateVisum = (visum: Visum): Promise<Visum> => {
    console.log(`${tag} updating visum...`, visum)
    return db.collection('visums').doc(visum.id).update(visum)
  }

  const addVisum = (visum: Visum): Promise<Visum> => {
    console.log(`${tag} add visum...`)  
    return db.collection('visums').doc(visum.id).set(visum)
  }

  const getMe = async (): Promise<UserModel> => {
    return db.collection('me').doc(`1`).get().then((result: Result<UserModel>) => {
      console.log(`${tag} get me...`)      
      return result.value
    })
  }

  const getYears = async (): Promise<Array<number>> => {
    return db.collection('years').doc(`1`).get().then((result: Result<Array<number>>) => {
      console.log(`${tag} get years...`)      
      return result.value
    })
  }

  const getVisums = async (): Promise<Array<Visum>> => {
    return db.collection('visums').get().then((visums: any) => {
    console.log(`${tag} get visums...`)
      return visums
    })
  }

  const getVisum = async (id: string): Promise<Visum> => {
    const result = await db.collection('visums').doc(id).get().then((visum: any) => {
      console.log(`${tag} get visum...`)
      return visum
    })
    return result
  }

  const initDb = () => {
    console.log('initializing indexedDb...')
  }

  return {
    updateMe,
    updateYears,
    addVisum,
    getMe,
    initDb,
    getYears,
    getVisums,
    getVisum,
    updateVisum
  }
}
