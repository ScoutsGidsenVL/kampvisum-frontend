<template>
  <div>
    <div v-for=" call in calls" class="grid grid-cols-5 py-2 gap-2">
        <h4>{{ call }}</h4>
        <input :placeholder="index" class="p-2 border-2" v-for="(variable, index) in callsObject[call].vars" v-model="callsObject[call].vars[index]" type='text' />
        <button class="bg-black text-white py-2 text-center" @click="callsObject[call].call(callsObject[call].vars)">call</button>
    </div>
  </div>
  <div class="w-full my-2 h-1 bg-black" />
  <div v-for="vartype in varTypes" class="grid grid-cols-5 py-2 gap-2">
        <h4>{{ vartype.label }}</h4>
        <input class="border-2"  type='text' v-model="vartype.value.value" />
        <button class="bg-black text-white py-2 text-center" @click="overWriteVars(vartype.label, vartype.value)">Overwrite</button>
    </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import { defineComponent, reactive, ref, Ref, computed } from 'vue'
import { CampTypeRepository } from '@/repositories/CampTypeRepository'
import { CategoryRepository } from '@/repositories/CategoryRepository'
import { CommentCheckRepository } from '@/repositories/CommentCheckRepository'
import { DeadlineRepository } from '@/repositories/DeadlineRepository'
import { DurationDateCheckRepository } from '@/repositories/DurationDateCheckRepository'
import { EngagementRepository } from '@/repositories/EngagementRepository'
import { FileCheckRepository } from '@/repositories/FileCheckRepository'
import { GroupRepository } from '@/repositories/groupRepository'
import { LocationCheckRepository } from '@/repositories/LocationCheckRepository'
import { LocationRepository } from '@/repositories/LocationRepository'
import { LocationSearchRepository } from '@/repositories/locationSearchRepository'
import { MemberRepository } from '@/repositories/MemberRepository'
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { ParticipantRepository } from '@/repositories/ParticipantRepository'
import { SectionsRepository } from '@/repositories/SectionsRepository'
import { SimpleCheckRepository } from '@/repositories/SimpleCheckRepository'
import { FileRepository } from '@/repositories/FileRepository'
import { NumberCheckRepository } from '@/repositories/NumberCheckRepository'

export default defineComponent({
  name: 'TestVCalls',
  setup() {

    const varTypes: Array<{ label: string, value: Ref<string>}> = [
        {label: 'groupID', value:  ref<string>('')},
        {label: 'year', value:  ref<string>('')},
        {label: 'visumID', value: ref<string>('')}
    ]

    type CallsObject = Record<string, {
        vars: Record<string, string>,
        call: (vars: Record<string, string>) => void 
    }>
    const callsObject : CallsObject = reactive({
       'campGetArray' : {
            vars: {
                groupID: '', 
                year: ''
            },
            call:  (vars: any) => RepositoryFactory.get(CampVisumRepository).getArray(vars.groupID, '?page=1&page_size=100&year=' + vars.year)
        },
        'campRemoveById': {
            vars: {
                groupID: '',
                campID: ''
            },

            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).removeById(vars.groupID, vars.campID)
        },
        'campGetById': {
            vars: {
                groupID: '',
                campID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).getById(vars.groupID, vars.campID)
        },
        'campCreate': {
            vars: {
                 groupID: '',
                 name: '',
                 sectionID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).create(vars.groupID, {
                sections: [
                    vars.sectionID
                ],
                name: vars.name
            })
        },
        'campUpdate': {
            vars: {
                groupID: '',
                campID: '',
                name: '',
                sectionID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).update(vars.groupID, vars.campID, {
                sections: [
                    vars.sectionID
                ],
                name: vars.name,
                camp_types: [
                    {
                        "camp_type": "basis"
                    }
                ]
            })
        },
        'getGroupYears' : {
            vars: {
                groupID: '', 
            },
            call:  (vars: any) => RepositoryFactory.get(CampVisumRepository).getGroupYears(vars.groupID)
        },
        'patchCategoryFeedback': {
            vars: {
                groupID: '',
                subCategoryId: '',
                feedback: ''            
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchCategoryFeedback(vars.groupID, vars.subCategoryId, vars.feedback)
        },
        'patchCategoryApproval': {
            vars: {
                groupID: '',
                subCategoryId: '',
                feedback: 'A'            
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchCategoryApproval(vars.groupID, vars.subCategoryId, vars.feedback)
        },
        'patchVisumNotes': {
            vars: {
                groupID: '',
                visumID: '',
                notes: ''            
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchVisumNotes(vars.groupID, vars.visumID, vars.notes)
        },
        'patchVisumHandleFeedback': {
            vars: {
                groupID: '',
                subCategoryId: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchVisumHandleFeedback(vars.groupID, vars.subCategoryId)
        },
        'patchVisumApprovalGlobal': {
            vars: {
                groupID: '',
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchVisumApprovalGlobal(vars.groupID, vars.visumID)
        },
        'patchVisumDisapproval': {
            vars: {
                groupID: '',
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampVisumRepository).patchVisumDisapproval(vars.groupID, vars.visumID)
        },
        'CampTypegetArray': {
            vars: {
                groupID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampTypeRepository).getArray(vars.groupID)
        },
        'CategoryGetById': {
            vars: {
                groupID: '',
                categoryId: ''
            },
            call: (vars: any) => RepositoryFactory.get(CategoryRepository).getById(vars.groupID, vars.categoryId)
        },
        'CommentCheckUpdate': {
            vars: {
                groupID: '',
                checkID: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(CommentCheckRepository).update(vars.groupID, `checks/comment/${vars.checkID}`, vars.data)
        },
        'DeadlineupdateFlag': {
            vars: {
                groupID: '',
                deadlineID: '',
                id: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(DeadlineRepository).updateFlag(vars.groupID, vars.deadlineID, vars.url, vars.data)
        },
         'DeadlineGetarray': {
            vars: {
                groupID: '',
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(DeadlineRepository).getArray(vars.groupID, vars.visumID)
        },
        'DurationDateCheckUpdate': {
            vars: {
                groupID: '',
                id: ''
            },
            call: (vars: any) => RepositoryFactory.get(DurationDateCheckRepository).update(vars.groupID, `checks/duration/${vars.id}`, [
                "2022-07-04",
                "2022-07-07"
            ])
        },
        'EngagementGetById': {
            vars: {
                groupID: '',
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(EngagementRepository).getById(vars.groupID, vars.visumID)
        },
         'signVisum': {
            vars: {
                groupID: '',
                engagementID: ''
            },
            call: (vars: any) => RepositoryFactory.get(EngagementRepository).signVisum(vars.groupID, {id: vars.engagementID})
        },
          'FileCheckUpdate': {
            vars: {
                groupID: '',
                checkID: '',
                fileID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileCheckRepository).update(vars.groupID, `checks/file/${vars.checkID}`, [
                {
                    id: vars.fileID,
                    contentType: "image/jpeg",
                    url: "http://minio:9000/kampvisum-api/febbb6b6-94a6-43c3-a1b4-8a1f7ace19b9/101-2621x1747.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20220720%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20220720T072111Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c27f981fb5c1c260cb9c3dcc4bcc2c611bc6b18960afb9d412b96d77226efaf4",
                    name: "101-2621x1747.jpeg",
                    //@ts-ignore
                    size: 322659,
                    createdOn: "2022-07-20T07:21:11.207136Z",
                    isChecked: true
                }
            ])
        },
           'removeFileFromList': {
            vars: {
                groupID: '',
                checkID: '',
                fileID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileCheckRepository).removeFileFromList(vars.groupID, vars.checkID, vars.fileID)
        },
        'getGroupSections': {
            vars: {
                groupID: ''
            },
            call: (vars: any) => RepositoryFactory.get(GroupRepository).getGroupSections(vars.groupID)
        },
        'updateLocationCheck': {
            vars: {
                groupID: '',
                checkID: '',
            },
            call: (vars: any) => RepositoryFactory.get(LocationCheckRepository).updateLocationCheck(vars.groupID, `checks/camp_location/${vars.checkID}`, [])
        },
        'addSearchedLocation': {
            vars: {
                groupID: '',
                checkID: '',
                locationID: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationCheckRepository).addSearched(vars.groupID, `checks/camp_location/${vars.checkID}`, [vars.locationID])
        },
        'getCampLocations': {
            vars: {
                groupID: '',
                filters: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationRepository).getCampLocations(vars.groupID, vars.url)
        },
         'searchCampLocations': {
            vars: {
                groupID: '',
                query: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationRepository).search(vars.groupID, vars.query)
        },
        'searchMembers': {
            vars: {
                groupID: '', 
                query: '', 
                filter: ''
            },
            call: (vars: any) => RepositoryFactory.get(MemberRepository).search(vars.groupID, vars.query, '',vars.filter)
        },
        'searchFourage': {
            vars: {
                groupID: '', 
                query: '', 
                filter: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).search(vars.groupID, vars.query, '',vars.filter)
        },
        'updateNumberCheck': {
            vars: {
                groupID: '',
                checkID: '',
                number: ''
            },
            call: (vars: any) => RepositoryFactory.get(NumberCheckRepository).update(vars.groupID, `checks/number/${vars.checkID}`, vars.number) 
        },
        'updateParticipantCheck': {
            vars: {
                groupID: '',
                checkID: '',
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantCheckRepository).update(vars.groupID, `checks/participant/${vars.checkID}`, []) 
        },
        'removeParticipantFromList': {
            vars: {
                groupID: '',
                checkId: '',
                ParticipantId: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantCheckRepository).removeParticipantFromList(vars.groupID, vars.checkId, vars.ParticipantId) 
        },
        'ParticipantCreate':  {
            vars: {
                groupID: '', 
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).create(vars.groupID, {
                "firstName": "test",
                "lastName": "test",
                "email": "",
                "phoneNumber": "",
                "city": "",
                "postalCode": "",
                "street": "",
                "number": "",
                "letterBox": "",
                "birthDate": "2022-07-22",
                "comment": "",
                "groupGroupAdminId": vars.groupID
            })
        },
        'ParticipantUpdate':  {
            vars: {
                groupID: '', 
                id: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).update(vars.groupID, vars.id, {
                "firstName": "test update 2",
                "lastName": "test",
                "email": "",
                "phoneNumber": "",
                "city": "",
                "postalCode": "",
                "street": "",
                "number": "",
                "letterBox": "",
                "birthDate": "2022-07-22",
                "comment": "",
                "groupGroupAdminId": vars.groupID
            })
        },
         'SectionCreate':  {
            vars: {
                groupID: '', 
                sectioName: ''
            },
            call: (vars: any) => {
                const data = {
                    "name": {
                        "id": "",
                        "name": vars.sectioName,
                        "ageGroup": "10",
                        "gender": "M"
                    },
                    "groupAdminId": vars.groupID
                }
                RepositoryFactory.get(SectionsRepository).create(vars.groupID, data)
            }
        },
        'SectionUpdate':  {
            vars: {
                groupID: '', 
                id: ''
            },
            call: (vars: any) => RepositoryFactory.get(SectionsRepository).update(vars.groupID, vars.id, {
                "group_group_admin_id": vars.groupID,
                "name": {
                    "name": "givers",
                    "gender": "I",
                    "age_group": 8
                }
            })
        },
         'SectionRemove':  {
            vars: {
                groupID: '',
                id: '',
            },
            call: (vars: any) => RepositoryFactory.get(SectionsRepository).removeById(vars.groupID, vars.id)
        },
          'SimpleCheckUpdate':  {
            vars: {
                groupID: '',
                checkID: '',
            },
            call: (vars: any) => RepositoryFactory.get(SimpleCheckRepository).update(vars.groupID, `checks/simple/${vars.checkID}`, {
                "id": vars.checkID,
                "value": "CHECKED"
            })
        },
        'searchFiles': {
            vars: {
                groupID: '',
                term: '',
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).search(vars.groupID, vars.term)
        },
         'fileGetById': {
            vars: {
                groupID: '',
                fileID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).getById(vars.groupID, vars.fileID)
        },
        'uploadFile': {
            vars: {
                groupID: '',
                file: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).uploadFile(vars.groupID, vars.file)
        }
    })

    const calls = computed<string[]>(() => {
        const returnArray : string[] = []
         for (const [key] of Object.entries(callsObject)){
            returnArray.push(key)
         }

         return returnArray;
    })

    const overWriteVars = (index: string, newValue: string) => {
        calls.value.forEach((call: string) => {
            for (const [key, value] of Object.entries(callsObject[call].vars)){
                if(key === index){
                    callsObject[call].vars[index] = newValue
                }
            }
        })
    }

    
    return {
        callsObject,
        overWriteVars,
        calls, 
        varTypes
    }
  },
})
</script>
