import { SimpleCheckDeserializer, SimpleCheckSerializer } from "@/serializer/SimpleCheck"
import { BaseRepository } from "./baseRepository"


export class SimpleCheckRepository extends BaseRepository {
  id = '/SimpleCheck/'
  endpoint = '/visums/'
  deserializer = SimpleCheckDeserializer
  serializer = SimpleCheckSerializer
}


