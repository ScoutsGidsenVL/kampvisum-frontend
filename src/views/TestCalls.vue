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
import { CampRepository } from '@/repositories/campRepository'
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
            call:  (vars: any) => RepositoryFactory.get(CampRepository).getArray('?page=1&page_size=100&group=' + vars.groupID + '&year=' + vars.year)
        },
        'campRemoveById': {
            vars: {
                campID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).removeById(vars.campID)
        },
        'campGetById': {
            vars: {
                campID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).getById(vars.campID)
        },
        'campCreate': {
            vars: {
                 name: '',
                 sectionID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).create({
                sections: [
                    vars.sectionID
                ],
                name: vars.name
            })
        },
        'campUpdate': {
            vars: {
                campID: '',
                name: '',
                sectionID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).update(vars.campID, {
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
            call:  (vars: any) => RepositoryFactory.get(CampRepository).getGroupYears(vars.groupID)
        },
        'patchCategoryFeedback': {
            vars: {
                subCategoryId: '',
                feedback: ''            
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchCategoryFeedback(vars.subCategoryId, vars.feedback)
        },
        'patchCategoryApproval': {
            vars: {
                subCategoryId: '',
                feedback: ''            
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchCategoryApproval(vars.subCategoryId, vars.feedback)
        },
        'patchVisumNotes': {
            vars: {
                visumID: '',
                notes: ''            
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchVisumNotes(vars.visumID, vars.notes)
        },
        'patchVisumHandleFeedback': {
            vars: {
                subCategoryId: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchVisumHandleFeedback(vars.subCategoryId)
        },
        'patchVisumApprovalGlobal': {
            vars: {
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchVisumApprovalGlobal(vars.visumId)
        },
        'patchVisumDisapproval': {
            vars: {
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(CampRepository).patchVisumDisapproval(vars.visumId)
        },
        'CampTypegetArray': {
            vars: {

            },
            call: (vars: any) => RepositoryFactory.get(CampTypeRepository).getArray()
        },
        'CategoryGetById': {
            vars: {
                categoryId: ''
            },
            call: (vars: any) => RepositoryFactory.get(CategoryRepository).getById(vars.categoryId)
        },
        'CommentCheckUpdate': {
            vars: {
                checkID: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(CommentCheckRepository).update(`checks/comment/${vars.checkID}`, vars.data)
        },
        'DeadlineupdateFlag': {
            vars: {
                deadlineID: '',
                id: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(DeadlineRepository).update(vars.url, vars.data)
        },
         'DeadlineGetarray': {
            vars: {
                visumID: ''
            },
            call: (vars: any) => RepositoryFactory.get(DeadlineRepository).getArray(vars.visumID)
        },
        'DurationDateCheckUpdate': {
            vars: {
                id: ''
            },
            call: (vars: any) => RepositoryFactory.get(DurationDateCheckRepository).update(`checks/duration/${vars.id}`, [
                "2022-07-04",
                "2022-07-07"
            ])
        },
        'EngagementGetById': {
            vars: {
                visumID: '',
            },
            call: (vars: any) => RepositoryFactory.get(EngagementRepository).getById(vars.visumID)
        },
         'signVisum': {
            vars: {
                engagementID: '',
            },
            call: (vars: any) => RepositoryFactory.get(EngagementRepository).signVisum({id: vars.engagementID})
        },
          'FileCheckUpdate': {
            vars: {
                checkID: '',
                fileID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileCheckRepository).update(`checks/file/${vars.checkID}`, [
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
                checkID: '',
                participantId: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileCheckRepository).removeFileFromList(vars.url, vars.data)
        },
        'getGroupSections': {
            vars: {
                groupID: ''
            },
            call: (vars: any) => RepositoryFactory.get(GroupRepository).getGroupSections(vars.groupID)
        },
        'updateLocationCheck': {
            vars: {
                url: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationCheckRepository).updateLocationCheck(vars.url, vars.data)
        },
        'addSearchedLocation': {
            vars: {
                url: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationCheckRepository).addSearched(vars.url)
        },
        'getCampLocations': {
            vars: {
                filters: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationRepository).getCampLocations(vars.url)
        },
         'searchCampLocations': {
            vars: {
                query: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationRepository).search(vars.query)
        },
        'reverseSearchLocations': {
             vars: {
                latLng: ''
            },
            call: (vars: any) => RepositoryFactory.get(LocationSearchRepository).reverseSearch(vars.latLng)
        },
        'searchMembers': {
            vars: {
                query: '', 
                groupID: '', 
                filter: ''
            },
            call: (vars: any) => RepositoryFactory.get(MemberRepository).search(vars.query, '',vars.filter, vars.groupID,)
        },
        'searchFourage': {
            vars: {
                query: '', 
                groupID: '', 
                filter: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).search(vars.query, '',vars.filter, vars.groupID,)
        },
        'updateNumberCheck': {
            vars: {
                checkID: '',
                number: ''
            },
            call: (vars: any) => RepositoryFactory.get(NumberCheckRepository).update(`checks/number/${vars.checkID}`, vars.number) 
        },
        'updateParticipant': {
            vars: {
                url: '',
                data: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantCheckRepository).update(vars.url, vars.data) 
        },
        'removeParticipantFromList': {
            vars: {
                checkId: '',
                ParticipantId: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantCheckRepository).removeParticipantFromList(vars.checkId, vars.ParticipantId) 
        },
        'toggleHasPaid': {
            vars: {
                checkId: '',
                wrapperParticipantId: ''
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantCheckRepository).toggleHasPaid(vars.checkId, vars.wrapperParticipantId) 
        },
        'ParticipantCreate':  {
            vars: {
                data: '', 
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).create(vars.data)
        },
        'ParticipantUpdate':  {
            vars: {
                id: '',
                data: '', 
            },
            call: (vars: any) => RepositoryFactory.get(ParticipantRepository).update(vars.id, vars.data)
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
                RepositoryFactory.get(SectionsRepository).create(data)
            }
        },
        'SectionUpdate':  {
            vars: {
                id: '',
                groupID: '', 
            },
            call: (vars: any) => RepositoryFactory.get(SectionsRepository).update(vars.id, {
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
                id: '',
            },
            call: (vars: any) => RepositoryFactory.get(SectionsRepository).removeById(vars.id)
        },
          'SimpleCheckUpdate':  {
            vars: {
                checkID: '',
            },
            call: (vars: any) => RepositoryFactory.get(SimpleCheckRepository).update(`checks/simple/${vars.checkID}`, {
                "id": vars.checkID,
                "value": "CHECKED"
            })
        },
        'searchFiles': {
            vars: {
                term: '',
                groupID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).search(vars.term, vars.groupID)
        },
         'fileGetById': {
            vars: {
                fileID: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).getById(vars.fileID)
        },
        'uploadFile': {
            vars: {
                file: ''
            },
            call: (vars: any) => RepositoryFactory.get(FileRepository).uploadFile(vars.file)
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
