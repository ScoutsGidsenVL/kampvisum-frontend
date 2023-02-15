import UserModel from "@/models/userModel";
import { Visum } from "@/serializer/Visum";
const tag = '[IDB]'
const Localbase = require('localbase').default;
let db = new Localbase('db')

//STRUCTURE
interface Result<T> {
  id: number;
  value: T
}

interface file {
  name: string;
  data: any;
}

export const useOfflineData = (): {
  initDb: () => void,
  updateMe: (me: UserModel) => void,
  unsetMe: () => void,
  updateYears: (years: Array<number>) => void,
  updateVisum: (visum: Visum) => Promise<Visum>
  addVisum: (visum: Visum) => Promise<Visum>,
  addFile: (fileId: string, url: any) => void
  getVisums: () => Promise<Array<Visum>>
  getVisum: (id: string) => Promise<Visum>,
  getMe: () => Promise<UserModel>,
  getYears: () => Promise<Array<number>>,
  getFile: (fileId: string) => Promise<any>
} => {
  const updateMe = (me: UserModel) => {
    console.log(`${tag} updating me...`)
    db.collection('me').doc(`1`).set({ id: 1, value: me })
  }

  const unsetMe = () => {
    console.log(`${tag} unsetting me...`)
    db.collection('me').delete()
  }

  const updateYears = (years: Array<number>) => {
    console.log(`${tag} updating years...`, years)
    db.collection('years').doc(`1`).set({ id: 1, value: years })
  }

  const updateVisum = (visum: Visum): Promise<Visum> => {
    // const { saveAs } = require('file-saver')
    console.log(`${tag} updating visum...`, visum)
    return db.collection('visums').doc(visum.id).update(visum)
  }

  const addVisum = (visum: Visum): Promise<Visum> => {
    console.log(`${tag} add visum...`)
    return db.collection('visums').doc(visum.id).set(visum)
  }

  const addFile = (fileId: string, file: file): Promise<any> => {
    console.log(`${tag} add file...`, fileId, file)
    return db.collection('files').doc(fileId).set(file)
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

  const getFile = async (fileId: string): Promise<any> => {
    const result = await db.collection('files').doc(fileId).get().then((file: any) => {
      console.log(`${tag} get file...`)
      return file
    })
    return result
  }

  const initDb = () => {
    console.log('initializing indexedDb...')
  }

  return {
    updateMe,
    unsetMe,
    updateYears,
    addVisum,
    getMe,
    initDb,
    getYears,
    getVisums,
    getVisum,
    updateVisum,
    addFile,
    getFile
  }
}
