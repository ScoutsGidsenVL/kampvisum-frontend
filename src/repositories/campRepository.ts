import { CampDeserializer, CampSerializer, Camp } from '@/serializer/Camp'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/interfaces/ArrayResult'
import { Visum, VisumDeserializer } from '@/serializer/Visum'
import { useInternetHelper } from '@/helpers/internetHelper'
import { useOfflineData } from '@/composable/useOfflineData'

const localVisums = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "15437c5f-31a3-4c83-9ffa-27572619623e",
            "group": {
                "group_admin_id": "X9002G",
                "number": "X9002G",
                "name": "Testgroep voor .be-site",
                "full_name": "Testgroep voor .be-site X9002G",
                "type": "Test"
            },
            "camp": {
                "id": "ebb5bfd0-48c2-4b87-bdc4-925df9ebd622",
                "year": {
                    "id": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                    "year": 2022,
                    "start_date": "2021-09-01",
                    "end_date": "2022-08-31",
                    "created_on": "2022-06-20T09:20:51.078765Z",
                    "updated_on": "2022-06-20T09:20:51.078781Z",
                    "created_by": null,
                    "updated_by": null
                },
                "sections": [
                    {
                        "id": "82185676-7f28-45b0-8ac0-deeddd3bbb40",
                        "group": {
                            "group_admin_id": "X9002G",
                            "number": "X9002G",
                            "name": "Testgroep voor .be-site",
                            "full_name": "Testgroep voor .be-site X9002G",
                            "type": "Test"
                        },
                        "section_name": null,
                        "hidden": false,
                        "name": {
                            "name": "kapoenen",
                            "gender": "I",
                            "age_group": 6
                        },
                        "gender": "I",
                        "age_group": 6
                    }
                ],
                "created_on": "2022-06-20T10:19:48.174610Z",
                "updated_on": "2022-06-20T10:19:48.174628Z",
                "name": "test edit",
                "start_date": null,
                "end_date": null,
                "created_by": null,
                "updated_by": null
            },
            "camp_types": [
                {
                    "id": "f67ea30a-ec66-497b-903e-514b797fa145",
                    "created_on": "2022-06-20T09:20:51.005181Z",
                    "updated_on": "2022-06-20T09:20:51.005193Z",
                    "explanation": "Basis kamptype, met categorieën die bij elk kamp herhaald worden",
                    "index": 0,
                    "label": "Basiskamp",
                    "camp_type": "basis",
                    "is_base": true,
                    "is_default": true,
                    "created_by": null,
                    "updated_by": null
                }
            ],
            "category_set": {
                "id": "48df18b6-b7b6-47de-ace6-440b73f21678",
                "categories": [
                    {
                        "id": "038464ba-7828-48a4-8cdf-bfe6b46575c4",
                        "parent": {
                            "id": "75d2a3f1-67f7-4412-9d93-1feeb1bcd507",
                            "name": "planning",
                            "index": 0,
                            "description": "",
                            "archived_on": "2022-06-20T09:20:51.099820Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Planning",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "f868c89f-5eb9-40cb-a3f9-54f1c42a67ec",
                                "parent": {
                                    "id": "d89bd4eb-8c35-4f2e-bb20-c95cc6403eae",
                                    "name": "planning_date",
                                    "archived_on": "2022-06-20T09:20:51.171878Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "Iedere zomer gaan er een heleboel groepen op kamp. Begin dus tijdig aan de zoektocht naar een kampterrein. De drukste kampperiode is van 11 juli tot 10 augustus. Plan je je kamp buiten deze periode? Dan heb je meer keuze in mogelijke bestemmingen.  <br> Laat de ouders van je leden liefst zo snel mogelijk de kampdata weten. Zo kunnen zij zelf ook hun vakantie plannen.",
                                    "index": 0,
                                    "link": "",
                                    "label": "Datum",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "51f19e74-2e3d-4f12-ac66-d71537bbf358",
                                        "parent": {
                                            "id": "edef693e-f506-476e-bd69-4388959b9c0b",
                                            "check_type": {
                                                "id": "b38e2824-07a5-4e15-b1f5-5794aeaad50a",
                                                "description": "A check that contains a start and end date",
                                                "check_type": "DurationCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.367269Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Start- en einddatum voor het ledenkamp",
                                            "name": "planning_date_members",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/duration/51f19e74-2e3d-4f12-ac66-d71537bbf358",
                                        "value": {
                                            "start_date": null,
                                            "end_date": null
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.270436Z",
                                        "updated_on": "2022-06-20T10:19:48.270446Z",
                                        "archived_on": "2022-06-20T10:19:48.270452Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_date_members"
                                    },
                                    {
                                        "id": "af54f674-0b6e-4141-bdc9-73851b1bae4b",
                                        "parent": {
                                            "id": "618697e4-d8b5-42aa-bfdd-92746fcfd194",
                                            "check_type": {
                                                "id": "b38e2824-07a5-4e15-b1f5-5794aeaad50a",
                                                "description": "A check that contains a start and end date",
                                                "check_type": "DurationCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.378689Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Start- en einddatum voor het leidingskamp",
                                            "name": "planning_date_leaders",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/duration/af54f674-0b6e-4141-bdc9-73851b1bae4b",
                                        "value": {
                                            "start_date": null,
                                            "end_date": null
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.266343Z",
                                        "updated_on": "2022-06-20T10:19:48.266353Z",
                                        "archived_on": "2022-06-20T10:19:48.266361Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_date_leaders"
                                    },
                                    {
                                        "id": "750885a0-123f-4c3c-92db-b1f4941e2e8a",
                                        "parent": {
                                            "id": "d90937c0-cc77-45f7-8ac8-8fde094a1790",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.387674Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "planning_date_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/750885a0-123f-4c3c-92db-b1f4941e2e8a",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.261725Z",
                                        "updated_on": "2022-06-20T10:19:48.261738Z",
                                        "archived_on": "2022-06-20T10:19:48.261745Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_date_comments"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.255124Z",
                                "updated_on": "2022-06-20T10:19:48.255134Z",
                                "archived_on": "2022-06-20T10:19:48.255144Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "planning_date"
                            },
                            {
                                "id": "f6dc882e-79b4-4212-9bc0-e31c2223aace",
                                "parent": {
                                    "id": "83eb19c7-e4b4-43e7-9ac4-693c8e5b909c",
                                    "name": "planning_activities",
                                    "archived_on": "2022-06-20T09:20:51.179989Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 1,
                                    "link": "",
                                    "label": "Activiteiten",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "839f27ed-1cd8-4f35-893d-c3df6be53b22",
                                        "parent": {
                                            "id": "49a0d01f-632c-4e52-b605-a09409725572",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.398437Z",
                                            "is_archived": false,
                                            "explanation": "Ook je voor- en nakamp moet voorbereid zijn. Welke voorbereidingen ga je treffen? Welke geplande tocht ga je verkennen? Wat moet er nog allemaal gebeuren op nakamp?",
                                            "index": 0,
                                            "link": "",
                                            "label": "Voor- en nakamp geregeld ?",
                                            "name": "planning_activities_camp",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/839f27ed-1cd8-4f35-893d-c3df6be53b22",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.225687Z",
                                        "updated_on": "2022-06-20T10:19:48.225700Z",
                                        "archived_on": "2022-06-20T10:19:48.225709Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_camp"
                                    },
                                    {
                                        "id": "9b33bdd5-3ac6-4276-8755-debf276ffc2b",
                                        "parent": {
                                            "id": "a34f50c9-a78a-46be-bfa6-ef5a0f3001f7",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.407111Z",
                                            "is_archived": false,
                                            "explanation": "Door aanhoudende regen kan je dagprogramma letterlijk in het water vallen. Maar dat hoeft de pret niet te bederven. Zorg dat je activiteiten achter de hand hebt voor deze situatie. Neem gezelschapspelletjes mee en voorzie spelen die je binnen of in de tent kan doen. Inspiratie kan je vinden in de <a href='https://www.scoutsengidsenvlaanderen.be/zoek-een-spel' target='_blank'>spelendatabank</a>. <br> Vergeet niet dat iedereen goed beschermd moet zijn tegen de regen en droge kleren draagt.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Regenplanning opgesteld ?",
                                            "name": "planning_activities_rain",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/9b33bdd5-3ac6-4276-8755-debf276ffc2b",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.243410Z",
                                        "updated_on": "2022-06-20T10:19:48.243420Z",
                                        "archived_on": "2022-06-20T10:19:48.243426Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_rain"
                                    },
                                    {
                                        "id": "e803dab9-5e04-4d18-aec1-c069707c16f1",
                                        "parent": {
                                            "id": "82d709bd-fd12-4fca-93b1-efdcbc3c7614",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.417197Z",
                                            "is_archived": false,
                                            "explanation": "Hitte kan een boosdoener zijn op kamp. Vanaf ongeveer 30°C worden mensen traag en sloom. Zorg zeker dat iedereen genoeg water drinkt. Je activiteiten doe je beter in de schaduw of binnen. Of zoek wat verfrissing in een beek of een plonsbadje. Let ook hier op met directe zon. Je kan ook een siësta houden op het warmste van de dag. <br> Inspiratie voor (binnen-) spelen vind je in de <a href='https://www.scoutsengidsenvlaanderen.be/zoek-een-spel' target='_blank'>spelendatabank</a>. <br>Vergeet niet dat iedereen goed beschermd moet zijn tegen de zon. Iedereen smeert zich in met zonnecrème (spf 50) en draagt een hoedje of pet.",
                                            "index": 2,
                                            "link": "",
                                            "label": "Hitteplanning opgemaakt ?",
                                            "name": "planning_activities_heat",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/e803dab9-5e04-4d18-aec1-c069707c16f1",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.235685Z",
                                        "updated_on": "2022-06-20T10:19:48.235694Z",
                                        "archived_on": "2022-06-20T10:19:48.235701Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_heat"
                                    },
                                    {
                                        "id": "a65a82fd-8ada-44b4-935b-b5f9561d023f",
                                        "parent": {
                                            "id": "cacb8f6b-bb41-4253-8a15-f1099db524e5",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.426007Z",
                                            "is_archived": false,
                                            "explanation": "Bij het totemiseren spreek je uit wat je als groep in iemand waardeert. Je benoemt de eigenschappen van een lid die je als je groep nodig hebt. Een goede totemisatie daagt je leden uit om stil te staan bij zichzelf en om op een prikkelende manier grenzen af te tasten. <br> Een totemisatie mag niet ontsporen in een machtsspel, laat staan dat er plaats is voor vernedering. De totemisatie moet de sociale samenhang in de groep in de kijker zetten en gaat uit van respect voor elkaar. Een totem is iets om je leven lang fier op te zijn. <br> Alles over totemisatie vind je in <a href='https://www.hopper.be/nl/dr000160' target='_blank'>de totemmap</a>, die te koop is in de Hopper Winkel, en in de totemapp. In de <a href='https://www.scoutsengidsenvlaanderen.be/totemzoeker' target='_blank'>totemzoeker</a> vind je de betekenis van totemnamen, of kan je op eigenschappen een gepaste totem zoeken. ",
                                            "index": 3,
                                            "link": "",
                                            "label": "Totemisatie gepland ?",
                                            "name": "planning_activities_totemisation",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/a65a82fd-8ada-44b4-935b-b5f9561d023f",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.247860Z",
                                        "updated_on": "2022-06-20T10:19:48.247873Z",
                                        "archived_on": "2022-06-20T10:19:48.247880Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_totemisation"
                                    },
                                    {
                                        "id": "97247fb4-8a31-49f2-8ab8-17eb2e712497",
                                        "parent": {
                                            "id": "2898eae4-961e-4b74-b8b3-4ed647fcad4d",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.434387Z",
                                            "is_archived": false,
                                            "explanation": "Kampavonden zijn unieke gelegenheden om kinderen en jongeren vertrouwd te maken met het duister. <br> Het is niet de bedoeling dat het duister gebruikt wordt om angstaanjagende nachtspelen en activiteiten te organiseren. Het donker is al spannend genoeg. Je hebt hiervoor geen ontvoeringen of schriktochten nodig. <br> Wandelen in een donker bos, buskestamp bij maanlicht, dicht bijeen of ver uit elkaar genieten van de sterrenhemel… dat is het soort spanning dat deugd doet. <br><br> Vergeet niet: <br> • Nachtlawaai is in België wettelijk verboden tussen 22 een 7 uur.<br> • Voldoende nachtrust is voor leden én leiding een must voor een geslaagd kamp.<br> • Droppings zijn enkel ’s avonds toegelaten (niet ’s nachts!) en leden moeten minstens per 2 samenlopen via onverharde wegen.",
                                            "index": 4,
                                            "link": "",
                                            "label": "Nachtspel planning ok ?",
                                            "name": "planning_activities_night_activity",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/97247fb4-8a31-49f2-8ab8-17eb2e712497",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.239600Z",
                                        "updated_on": "2022-06-20T10:19:48.239609Z",
                                        "archived_on": "2022-06-20T10:19:48.239615Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_night_activity"
                                    },
                                    {
                                        "id": "cedf2c4f-b247-4630-a420-c18438e8af70",
                                        "parent": {
                                            "id": "2daf22a2-08fa-4c51-b29d-5a1603a7bd93",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.442887Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 5,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "planning_activities_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/cedf2c4f-b247-4630-a420-c18438e8af70",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.231430Z",
                                        "updated_on": "2022-06-20T10:19:48.231443Z",
                                        "archived_on": "2022-06-20T10:19:48.231450Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_comments"
                                    },
                                    {
                                        "id": "108f16a2-3927-4726-a91d-30cd6d2e39c9",
                                        "parent": {
                                            "id": "e3d5457e-2449-46e4-95b3-95b62cd20f7e",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.451293Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 6,
                                            "link": "",
                                            "label": "Upload de algemene kampplanning, het regenplan, hitteplan en afspraken rond totemisatie en nachtspel",
                                            "name": "planning_activities_upload_general_planning",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/108f16a2-3927-4726-a91d-30cd6d2e39c9",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.251836Z",
                                        "updated_on": "2022-06-20T10:19:48.251845Z",
                                        "archived_on": "2022-06-20T10:19:48.251852Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_activities_upload_general_planning"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.216234Z",
                                "updated_on": "2022-06-20T10:19:48.216253Z",
                                "archived_on": "2022-06-20T10:19:48.216262Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "planning_activities"
                            },
                            {
                                "id": "51dfe822-4667-41d3-bf37-8f58d5bbb369",
                                "parent": {
                                    "id": "80c788ed-448a-4811-9b3f-4214b1014bcc",
                                    "name": "planning_menu",
                                    "archived_on": "2022-06-20T09:20:51.188435Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 2,
                                    "link": "",
                                    "label": "Menu",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "1226f1be-a432-498b-9c43-74c7a6f458f2",
                                        "parent": {
                                            "id": "10a9a745-b8e2-4463-b5c7-1f8f497d9237",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.459515Z",
                                            "is_archived": false,
                                            "explanation": "Stel een evenwichtig en gevarieerd menu samen. Houd hierbij rekening met leden die een specifiek dieet volgen door allergieën, intoleranties of persoonlijke overtuigingen. Deze informatie vind je terug in de individuele steekkaart van je leden.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Evenwichtig menu",
                                            "name": "planning_menu_balanced_diet",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/1226f1be-a432-498b-9c43-74c7a6f458f2",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.281153Z",
                                        "updated_on": "2022-06-20T10:19:48.281164Z",
                                        "archived_on": "2022-06-20T10:19:48.281171Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_menu_balanced_diet"
                                    },
                                    {
                                        "id": "b0e110a5-5b14-4a3f-920d-7f2c65dc0d08",
                                        "parent": {
                                            "id": "3f8c8627-281a-4af3-ab67-215bbc9dcc4a",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.467886Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Vegetarisch menu",
                                            "name": "planning_menu_vegetarian_diet",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/b0e110a5-5b14-4a3f-920d-7f2c65dc0d08",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.293373Z",
                                        "updated_on": "2022-06-20T10:19:48.293383Z",
                                        "archived_on": "2022-06-20T10:19:48.293390Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_menu_vegetarian_diet"
                                    },
                                    {
                                        "id": "c2a45919-cd09-4d3a-a915-f754488eba3b",
                                        "parent": {
                                            "id": "c17a5ade-9a15-43b0-b84b-19f0942b06af",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.476364Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "planning_menu_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/c2a45919-cd09-4d3a-a915-f754488eba3b",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.285041Z",
                                        "updated_on": "2022-06-20T10:19:48.285051Z",
                                        "archived_on": "2022-06-20T10:19:48.285057Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_menu_comments"
                                    },
                                    {
                                        "id": "18b26619-b55e-4169-87ce-3b2e47a269b9",
                                        "parent": {
                                            "id": "937d8072-f266-4a4f-9b24-fe9ea54c2ffe",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.484732Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Upload hier je menu",
                                            "name": "planning_menu_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/18b26619-b55e-4169-87ce-3b2e47a269b9",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.289564Z",
                                        "updated_on": "2022-06-20T10:19:48.289574Z",
                                        "archived_on": "2022-06-20T10:19:48.289580Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "planning_menu_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.273833Z",
                                "updated_on": "2022-06-20T10:19:48.273846Z",
                                "archived_on": "2022-06-20T10:19:48.273857Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "planning_menu"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.207970Z",
                        "updated_on": "2022-06-20T10:19:48.207989Z",
                        "archived_on": "2022-06-20T10:19:48.208002Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "planning",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    },
                    {
                        "id": "4eb5feba-8c44-4010-bb8b-06886b9c4bad",
                        "parent": {
                            "id": "f3e95fe0-f1e4-4b19-8252-6e2aec5aa8b3",
                            "name": "logistics",
                            "index": 1,
                            "description": "Voeg de locatie van je kampplaats toe (of meerdere slaapplaatsen voor een trekkamp bijvoorbeeld).<br> Klik daarvoor op de 'voeg locatie toe'-knop. <br><br> Vul het adres in en check de kaart. Staat de groene pin helemaal juist? Dan kan je onderaan de gegevens van de eigenaar aanvullen, en op de knop klikken om toe te voegen.<br><br>Plek op de kaart niet helemaal juist, of je hebt geen adres ingegeven?  Klik indien nodig op de groene pin om ze te verwijderen. Klik op de kaart om een nieuwe zwarte pin te zetten. Staat de pin juist? Klik er dan op en voeg ze toe, de pin wordt nu groen. <br> Vergeet niet om onderaan ook op de 'voeg toe'-knop te klikken.",
                            "archived_on": "2022-06-20T09:20:51.108496Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Logistiek",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "58ed0913-ad8e-4a56-ae62-c4eb1fa01a1c",
                                "parent": {
                                    "id": "c41e142e-f274-408e-a8bb-587f2794791c",
                                    "name": "logistics_locations",
                                    "archived_on": "2022-06-20T09:20:51.196880Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "Voeg de locatie van je kampplaats toe (of meerdere slaapplaatsen voor een trekkamp bijvoorbeeld).<br> Klik daarvoor op de 'voeg locatie toe'-knop. <br><br> Vul het adres in en check de kaart. Staat de groene pin helemaal juist? Dan kan je onderaan de gegevens van de eigenaar aanvullen, en op de knop klikken om toe te voegen.<br><br>Plek op de kaart niet helemaal juist, of je hebt geen adres ingegeven?  Klik indien nodig op de groene pin om ze te verwijderen. Klik op de kaart om een nieuwe zwarte pin te zetten. Staat de pin juist? Klik er dan op en voeg ze toe, de pin wordt nu groen. <br> Vergeet niet om onderaan ook op de 'voeg toe'-knop te klikken. ",
                                    "index": 0,
                                    "link": "",
                                    "label": "Locaties",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "2eb2803b-c328-4a92-a5dc-0feeafb41ccc",
                                        "parent": {
                                            "id": "0e4ca654-aebb-48c9-b662-1ac6c76e5ede",
                                            "check_type": {
                                                "id": "ff43b3d8-54c4-4c5e-9b93-5b034dd0b473",
                                                "description": "A check that contains a geo-coordinate and contact details",
                                                "check_type": "CampLocationCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.493105Z",
                                            "is_archived": false,
                                            "explanation": "Geef hier de locatie van je kampterrein in. <br> Ga je op trekkamp? Vul dan elke locatie in met bijhorende data.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Gegevens kampplaats en verhuurder",
                                            "name": "logistics_locations_location",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/camp_location/2eb2803b-c328-4a92-a5dc-0feeafb41ccc",
                                        "value": {
                                            "center_latitude": 50.4956754,
                                            "center_longitude": 3.3452037,
                                            "zoom": 7,
                                            "locations": [],
                                            "is_camp_location": true
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.323635Z",
                                        "updated_on": "2022-06-20T10:19:48.323646Z",
                                        "archived_on": "2022-06-20T10:19:48.323655Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_location"
                                    },
                                    {
                                        "id": "08d21e40-f6e4-4df6-a52b-d5d3937275f2",
                                        "parent": {
                                            "id": "9bf97ea3-b82f-4b1f-80cd-9adcc7e87259",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.501468Z",
                                            "is_archived": false,
                                            "explanation": "• Water dat niet uit de kraan of aangekochte flessen komt, moet gecontroleerd worden. Hiervoor moet de eigenaar zelf een attest aanvragen. Info over de bevoegde instanties in Vlaanderen en Wallonië kan je vinden op <a href='https://www.opkamp.be/voedselveiligheid' target='_blank'>opkamp.be</a>. <br> • Heb je water nodig om te drinken, koken, tandenpoetsen, …? Gebruik altijd stromend water. In stilstaand water ontstaan snel ziektekiemen.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Attest water",
                                            "name": "logistics_locations_water",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/08d21e40-f6e4-4df6-a52b-d5d3937275f2",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.335633Z",
                                        "updated_on": "2022-06-20T10:19:48.335642Z",
                                        "archived_on": "2022-06-20T10:19:48.335649Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_water"
                                    },
                                    {
                                        "id": "064974d5-d9ee-4750-8834-51c1bb83b507",
                                        "parent": {
                                            "id": "9456543e-e7ae-41b3-98a7-662f9e820185",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.509854Z",
                                            "is_archived": false,
                                            "explanation": "Graaf geen hudo in drinkwaterwinningsgebieden. Soms wordt zo'n gebied aangegeven met een verkeersbord, maar niet altijd. Vraag tijdig na bij de gemeente en de boswachter of jullie kampeerweide in een drinkwaterwinningsgebied ligt of niet. <br> Graaf een hudo op een afstand van minstens 50 meter van beken en andere watertjes. <br> Giet geen chloorproducten of bleekwater in een hudo. Hou het bij een beetje zand na elk gebruik. 's Avonds kan je nog een extra laagje zand in de put gooien. Maak de hudo voldoende diep. <br> Meer info vind je op de website van de Vlaamse Overheid <a href='https://www.opkamp.be/waar-wel-waar-niet' target='_blank'>opkamp.be</a>.",
                                            "index": 2,
                                            "link": "",
                                            "label": "HUDO, chemische toiletten, afvalzakken",
                                            "name": "logistics_locations_toilets",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/064974d5-d9ee-4750-8834-51c1bb83b507",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.331991Z",
                                        "updated_on": "2022-06-20T10:19:48.332004Z",
                                        "archived_on": "2022-06-20T10:19:48.332011Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_toilets"
                                    },
                                    {
                                        "id": "67881264-ae0b-491a-a52f-2814b09d516e",
                                        "parent": {
                                            "id": "2da4ccbb-cae2-418d-8337-51133a99efa1",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.518263Z",
                                            "is_archived": false,
                                            "explanation": "Je mag niet altijd en overal vuur maken. Neem vooraf contact op met de eigenaar van je kampterrein, de plaatselijke gemeente en de brandweer. Zo ben je zeker wat wel en niet mag. Meer info vind je op de <a href='https://www.scoutsengidsenvlaanderen.be/leiding/kamp-en-weekend/voorbereiding-van-je-kamp-weekend/waar-mag-je-vuur-maken' target='_blank'>website</a>.",
                                            "index": 3,
                                            "link": "",
                                            "label": "Machtigingen vuur maken",
                                            "name": "logistics_locations_fire",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/67881264-ae0b-491a-a52f-2814b09d516e",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.320389Z",
                                        "updated_on": "2022-06-20T10:19:48.320398Z",
                                        "archived_on": "2022-06-20T10:19:48.320404Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_fire"
                                    },
                                    {
                                        "id": "54319506-6d89-4864-95b4-72b6ffbda66e",
                                        "parent": {
                                            "id": "358d2d2d-81f6-4b68-9cab-47b296d0381c",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.526884Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 4,
                                            "link": "",
                                            "label": "Electriciteit",
                                            "name": "logistics_locations_electricity",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/54319506-6d89-4864-95b4-72b6ffbda66e",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.317057Z",
                                        "updated_on": "2022-06-20T10:19:48.317069Z",
                                        "archived_on": "2022-06-20T10:19:48.317075Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_electricity"
                                    },
                                    {
                                        "id": "b052811e-8468-42ae-9cdd-77bdaba38616",
                                        "parent": {
                                            "id": "c837e34a-6ce2-478a-8c9f-8bf9ec6042bd",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.535136Z",
                                            "is_archived": false,
                                            "explanation": "Zoek op welke plaatselijke winkels er zijn. Voor grote bestellingen reserveer je best, zo is er genoeg voor iedereen. <br> Tip: Plaatselijke handelaars zoals bakkers en slagers geven vaak korting op bestellingen van jeugdbewegingen. Vraag hier zeker naar.",
                                            "index": 5,
                                            "link": "",
                                            "label": "Winkel in de buurt",
                                            "name": "logistics_locations_store",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/b052811e-8468-42ae-9cdd-77bdaba38616",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.327498Z",
                                        "updated_on": "2022-06-20T10:19:48.327513Z",
                                        "archived_on": "2022-06-20T10:19:48.327521Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_locations_store"
                                    },
                                    {
                                        "id": "d6f6580c-b3d5-46ca-8046-351cabfb74cb",
                                        "parent": {
                                            "id": "e8087af3-ff27-4986-9897-211841acdf97",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.543421Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 6,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "logistics_location_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/d6f6580c-b3d5-46ca-8046-351cabfb74cb",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.309274Z",
                                        "updated_on": "2022-06-20T10:19:48.309285Z",
                                        "archived_on": "2022-06-20T10:19:48.309291Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_location_comments"
                                    },
                                    {
                                        "id": "fd6ae1b3-1b98-4656-ba00-349afbc26ae3",
                                        "parent": {
                                            "id": "7a60a36d-3d98-4a0c-94d0-9f42fa25c56f",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.551801Z",
                                            "is_archived": false,
                                            "explanation": "• Stelt de eigenaar zelf een overeenkomst voor? Kijk dan na of deze alle elementen van <a href='https://www.scoutsengidsenvlaanderen.be/sites/default/files/files/voorbeeld%20formulier%20kampcontract.pdf' target='_blank'>onze overeenkomst</a> ook bevat. Is dit niet het geval, vraag dan om een aanvullende verklaring op te stellen. <br> • Ga je op trekkamp? Vul dan voor elke locatie een apart contract in.",
                                            "index": 7,
                                            "link": "",
                                            "label": "Laad hier je contract op",
                                            "name": "logistics_location_contract",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/fd6ae1b3-1b98-4656-ba00-349afbc26ae3",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.313396Z",
                                        "updated_on": "2022-06-20T10:19:48.313408Z",
                                        "archived_on": "2022-06-20T10:19:48.313415Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_location_contract"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.303181Z",
                                "updated_on": "2022-06-20T10:19:48.303191Z",
                                "archived_on": "2022-06-20T10:19:48.303198Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "logistics_locations"
                            },
                            {
                                "id": "8b66093d-65ce-4386-8b9d-f8fd7452cb27",
                                "parent": {
                                    "id": "687f3ae5-8b3c-44a6-bd89-d3b88ac89689",
                                    "name": "logistics_transport",
                                    "archived_on": "2022-06-20T09:20:51.204218Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "Maak voor je vervoer een milieubewuste keuze. Ga met de trein, leg een bus in, of stel een co-driving schema op voor de ouders van je leden.<br>Als je met de auto of bus reist, ga dan zeker na of er lage emissiezones zijn op de plaatsen waar je zal rondrijden.",
                                    "index": 1,
                                    "link": "",
                                    "label": "Vervoer",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "758baaf0-63c1-424f-a714-11705c5b5076",
                                        "parent": {
                                            "id": "32d9cc29-0d65-49b7-bf43-dd90d6fde8d8",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.560050Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Transportplanning voor leden",
                                            "name": "logistics_transport_members",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/758baaf0-63c1-424f-a714-11705c5b5076",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.373383Z",
                                        "updated_on": "2022-06-20T10:19:48.373392Z",
                                        "archived_on": "2022-06-20T10:19:48.373398Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_transport_members"
                                    },
                                    {
                                        "id": "f28f44fa-fd48-44b6-855f-ef83891d17bd",
                                        "parent": {
                                            "id": "98384ce4-8759-43e6-849f-96814b001001",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.568270Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Transportplanning voor leiding",
                                            "name": "logistics_transport_leaders",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/f28f44fa-fd48-44b6-855f-ef83891d17bd",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.366619Z",
                                        "updated_on": "2022-06-20T10:19:48.366630Z",
                                        "archived_on": "2022-06-20T10:19:48.366636Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_transport_leaders"
                                    },
                                    {
                                        "id": "a38b97d4-7c55-4b42-92b6-ace5af1775c4",
                                        "parent": {
                                            "id": "20fd6f3f-06f4-4e65-9f0e-116d1ddc9afd",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.576658Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Transportplanning voor materialen",
                                            "name": "logistics_transport_materials",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/a38b97d4-7c55-4b42-92b6-ace5af1775c4",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.370195Z",
                                        "updated_on": "2022-06-20T10:19:48.370205Z",
                                        "archived_on": "2022-06-20T10:19:48.370211Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_transport_materials"
                                    },
                                    {
                                        "id": "9dc769d8-db4a-478a-9d14-e0d99c26517b",
                                        "parent": {
                                            "id": "a3970e9b-1e1e-465b-9ab0-98e346a311e4",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.585000Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "logistics_transport_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/9dc769d8-db4a-478a-9d14-e0d99c26517b",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.362369Z",
                                        "updated_on": "2022-06-20T10:19:48.362381Z",
                                        "archived_on": "2022-06-20T10:19:48.362388Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_transport_comments"
                                    },
                                    {
                                        "id": "7a0af42a-50ff-4116-a0f8-5b9fe1a82527",
                                        "parent": {
                                            "id": "a61796ae-68d1-46a2-8b84-c898d1301587",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.593400Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 4,
                                            "link": "",
                                            "label": "Laad hier je vervoersplanning op",
                                            "name": "logistics_transport_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/7a0af42a-50ff-4116-a0f8-5b9fe1a82527",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.376733Z",
                                        "updated_on": "2022-06-20T10:19:48.376743Z",
                                        "archived_on": "2022-06-20T10:19:48.376750Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_transport_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.355310Z",
                                "updated_on": "2022-06-20T10:19:48.355319Z",
                                "archived_on": "2022-06-20T10:19:48.355326Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "logistics_transport"
                            },
                            {
                                "id": "398abe93-b131-41b8-9a27-3d0aae8b7b31",
                                "parent": {
                                    "id": "661d1380-80b1-4d18-879d-ffd1a3c7bb75",
                                    "name": "logistics_material",
                                    "archived_on": "2022-06-20T09:20:51.211603Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 2,
                                    "link": "",
                                    "label": "Materiaal",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "1c382bee-c7a5-4e15-aef1-3553644454db",
                                        "parent": {
                                            "id": "b7ee2fd9-3efa-431b-9506-18807f43ac0d",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.602923Z",
                                            "is_archived": false,
                                            "explanation": "Materiaal, dat gaat van spel- en knutselmateriaal tot keukenmateriaal en tenten. <br> Voor tenten kan je terecht op de website van de ULDK (Uitleendienst Kampeermateriaal van de Vlaamse Overheid). Vanaf 1 oktober kan je een aanvraagformulier invullen voor de komende zomer. In de loop van maart krijg je dan een antwoord. Lopen de tenten schade op? Neem dan contact op met de uitleendienst (tel. 02 251 69 43). <br> Geen tenten van de ULDK? Vraag na bij jeugdbewegingen in de buurt of zij materiaal uitlenen. <br> Wil je meer kans op voldoende tenten? De drukste kampperiode is van 11 juli tot 10 augustus, plan je kamp buiten deze periode.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Materiaal nagekeken ?",
                                            "name": "logistics_materials_checked",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/1c382bee-c7a5-4e15-aef1-3553644454db",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.345079Z",
                                        "updated_on": "2022-06-20T10:19:48.345092Z",
                                        "archived_on": "2022-06-20T10:19:48.345101Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_materials_checked"
                                    },
                                    {
                                        "id": "d821dc25-3ca3-455b-ae8a-637598b3b708",
                                        "parent": {
                                            "id": "dc2f445f-c43a-4313-9f39-9652a491665f",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.611533Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "logistics_materials_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/d821dc25-3ca3-455b-ae8a-637598b3b708",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.349048Z",
                                        "updated_on": "2022-06-20T10:19:48.349060Z",
                                        "archived_on": "2022-06-20T10:19:48.349067Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_materials_comments"
                                    },
                                    {
                                        "id": "cfc29b28-34f0-41b1-8122-f44901bc6dcc",
                                        "parent": {
                                            "id": "6c048ce9-64c5-4816-92e4-f2b6d74aa00e",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.620033Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Laad hier je materiaallijst op",
                                            "name": "logistics_materials_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/cfc29b28-34f0-41b1-8122-f44901bc6dcc",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.352395Z",
                                        "updated_on": "2022-06-20T10:19:48.352405Z",
                                        "archived_on": "2022-06-20T10:19:48.352411Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "logistics_materials_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.338526Z",
                                "updated_on": "2022-06-20T10:19:48.338538Z",
                                "archived_on": "2022-06-20T10:19:48.338554Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "logistics_material"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.297435Z",
                        "updated_on": "2022-06-20T10:19:48.297455Z",
                        "archived_on": "2022-06-20T10:19:48.297466Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "logistics",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    },
                    {
                        "id": "3a5af7ba-b1ca-492e-9668-ef07fae2d813",
                        "parent": {
                            "id": "eb2d8e0b-5761-4784-b690-ab8c786ef009",
                            "name": "communication_agreements",
                            "index": 2,
                            "description": "",
                            "archived_on": "2022-06-20T09:20:51.116073Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Communicatie & afspraken",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "d516c47d-dd03-4f95-b726-6bba4f1db7d5",
                                "parent": {
                                    "id": "1ba9092d-907e-4078-a58a-2ceaa346a0f2",
                                    "name": "communication_agreements_parents",
                                    "archived_on": "2022-06-20T09:20:51.219367Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 0,
                                    "link": "",
                                    "label": "Ouders",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "35b41bcc-951f-4b8e-b4c8-ebb16fdd8cae",
                                        "parent": {
                                            "id": "5f434526-8d5c-4344-9712-aabb936921d4",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.628657Z",
                                            "is_archived": false,
                                            "explanation": "Het is handig om binnen de leiding 1 persoon aan te duiden die het aanspreekpunt is voor de ouders. Zo voorkom je dat je onbedoelde tegenstrijdige informatie geeft.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Duidelijk aanspreekpunt voor de ouders",
                                            "name": "communication_agreements_parents_ombudsman",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/35b41bcc-951f-4b8e-b4c8-ebb16fdd8cae",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.442726Z",
                                        "updated_on": "2022-06-20T10:19:48.442735Z",
                                        "archived_on": "2022-06-20T10:19:48.442741Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_parents_ombudsman"
                                    },
                                    {
                                        "id": "6a9b236b-233c-4c6f-9e63-c6cf7afbdab6",
                                        "parent": {
                                            "id": "1db1ee36-cb17-47f3-8589-7df2647009a5",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.636925Z",
                                            "is_archived": false,
                                            "explanation": "Zijn de ouders voldoende geïnformeerd over hoe het kamp eruitziet? Dit kan in een kampbrief of een brochure. Of laat je creativiteit los en ga voor een ongeziene vorm in jullie groep.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Ouders zijn voldoende geïnformeerd",
                                            "name": "communication_agreements_parents_informed",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/6a9b236b-233c-4c6f-9e63-c6cf7afbdab6",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.438773Z",
                                        "updated_on": "2022-06-20T10:19:48.438783Z",
                                        "archived_on": "2022-06-20T10:19:48.438789Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_parents_informed"
                                    },
                                    {
                                        "id": "7fbefa3d-6e89-4526-af23-c33c7d29fbec",
                                        "parent": {
                                            "id": "9ea0c00c-76e3-4501-b21c-6a38040562b1",
                                            "check_type": {
                                                "id": "db654a4e-47f9-43d9-8218-b0e8ffaf0a41",
                                                "description": "A check that selects members and non-members",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.644725Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Naam aanspreekpunt",
                                            "name": "communication_agreements_parents_ombudsman_contact",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": false,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/7fbefa3d-6e89-4526-af23-c33c7d29fbec",
                                        "value": {
                                            "participant_check_type": "P",
                                            "participants": []
                                        },
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.447389Z",
                                        "updated_on": "2022-06-20T10:19:48.447403Z",
                                        "archived_on": "2022-06-20T10:19:48.447412Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_parents_ombudsman_contact"
                                    },
                                    {
                                        "id": "80dbc954-2dde-4e5c-9c9a-16ec460be7d1",
                                        "parent": {
                                            "id": "a3687685-5b79-485b-8eae-85e3db2f2a2c",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.652859Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "communication_agreements_parents_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/80dbc954-2dde-4e5c-9c9a-16ec460be7d1",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.435060Z",
                                        "updated_on": "2022-06-20T10:19:48.435069Z",
                                        "archived_on": "2022-06-20T10:19:48.435076Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_parents_comments"
                                    },
                                    {
                                        "id": "8941c9ae-6b1b-4ccf-8c3b-1ba860452f98",
                                        "parent": {
                                            "id": "c79c120c-68f7-445d-adf1-e597c226cedd",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.661158Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 4,
                                            "link": "",
                                            "label": "Laad hier de brochure voor ouders op",
                                            "name": "communication_agreements_parents_brochure",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/8941c9ae-6b1b-4ccf-8c3b-1ba860452f98",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.431350Z",
                                        "updated_on": "2022-06-20T10:19:48.431362Z",
                                        "archived_on": "2022-06-20T10:19:48.431369Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_parents_brochure"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.423890Z",
                                "updated_on": "2022-06-20T10:19:48.423900Z",
                                "archived_on": "2022-06-20T10:19:48.423907Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "communication_agreements_parents"
                            },
                            {
                                "id": "d19206d9-af4e-47fb-bdca-bfc69831ce24",
                                "parent": {
                                    "id": "1573ac09-172d-48bd-ab30-25ff214edaed",
                                    "name": "communication_agreements_agreements",
                                    "archived_on": "2022-06-20T09:20:51.227065Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 1,
                                    "link": "",
                                    "label": "Afspraken",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "098563e6-94cc-4e21-9252-25f78711d12f",
                                        "parent": {
                                            "id": "be9d6140-0a77-4c39-99b7-181a833467a9",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.669488Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Algemene kampregels",
                                            "name": "communication_agreements_agreements_rules",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/098563e6-94cc-4e21-9252-25f78711d12f",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.409170Z",
                                        "updated_on": "2022-06-20T10:19:48.409179Z",
                                        "archived_on": "2022-06-20T10:19:48.409185Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_rules"
                                    },
                                    {
                                        "id": "a4aa2144-3a3d-4654-bf24-0352ce5b4bab",
                                        "parent": {
                                            "id": "73952d28-28b6-44b3-bbf4-327bd6611bbd",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.677881Z",
                                            "is_archived": false,
                                            "explanation": "De regels over roken in de scouts vind je <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/leiding/alcohol-en-drugs/wetgeving-regels-en-richtlijnen' target='_blank'>hier</a>.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Afspraken: roken",
                                            "name": "communication_agreements_agreements_smoking",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/a4aa2144-3a3d-4654-bf24-0352ce5b4bab",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.417333Z",
                                        "updated_on": "2022-06-20T10:19:48.417345Z",
                                        "archived_on": "2022-06-20T10:19:48.417352Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_smoking"
                                    },
                                    {
                                        "id": "1b90fa3a-efa5-4952-82cc-4ee31b6dd824",
                                        "parent": {
                                            "id": "ea4c088d-dc81-4183-9c71-63af115d45a0",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.685812Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Afspraken: sex en relaties",
                                            "name": "communication_agreements_agreements_sexuality",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/1b90fa3a-efa5-4952-82cc-4ee31b6dd824",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.413381Z",
                                        "updated_on": "2022-06-20T10:19:48.413394Z",
                                        "archived_on": "2022-06-20T10:19:48.413402Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_sexuality"
                                    },
                                    {
                                        "id": "a946bf28-c04e-42d5-8e35-a7af81bf33fc",
                                        "parent": {
                                            "id": "c0476077-8097-4b76-8929-1dab438da511",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.693473Z",
                                            "is_archived": false,
                                            "explanation": "Kijk zeker de regels over alcohol op kamp na op de <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/leiding/alcohol-en-drugs/wetgeving-regels-en-richtlijnen' target='_blank'>website</a>. Ga je op kamp naar het buitenland? Vind dan <a href='https://www.scoutsengidsenvlaanderen.be/leiding/kamp-en-weekend/buitenlands-kamp/regels-over-alcohol-europa' target='_blank'>hier</a> de regels per land in de EU.",
                                            "index": 3,
                                            "link": "",
                                            "label": "Afspraken: alcohol- en BOB-regeling",
                                            "name": "communication_agreements_agreements_alcohol",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/a946bf28-c04e-42d5-8e35-a7af81bf33fc",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.396182Z",
                                        "updated_on": "2022-06-20T10:19:48.396197Z",
                                        "archived_on": "2022-06-20T10:19:48.396206Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_alcohol"
                                    },
                                    {
                                        "id": "5c1183f2-0c2b-4c61-ada1-de90d6af93d8",
                                        "parent": {
                                            "id": "b12bda16-ff57-4d50-94a9-1fcce2436621",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.701103Z",
                                            "is_archived": false,
                                            "explanation": "Het is een goed idee om de ouders in te lichten over je drank- en drugsbeleid op kamp. Zeker bij de oudste groepen, waar leden mogen drinken en roken.",
                                            "index": 4,
                                            "link": "",
                                            "label": "Zijn de ouders op de hoogte van de afspraken ?",
                                            "name": "communication_agreements_agreements_parents",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/5c1183f2-0c2b-4c61-ada1-de90d6af93d8",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.405484Z",
                                        "updated_on": "2022-06-20T10:19:48.405494Z",
                                        "archived_on": "2022-06-20T10:19:48.405501Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_parents"
                                    },
                                    {
                                        "id": "38200765-ece4-4000-99a4-70db8d88cff7",
                                        "parent": {
                                            "id": "73954b01-0d87-4a00-a6ac-9149d9b9a354",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.708704Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 5,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "communication_agreements_agreements_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/38200765-ece4-4000-99a4-70db8d88cff7",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.401321Z",
                                        "updated_on": "2022-06-20T10:19:48.401333Z",
                                        "archived_on": "2022-06-20T10:19:48.401340Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_comments"
                                    },
                                    {
                                        "id": "6a6b32f7-4492-419e-aa14-43894b34182b",
                                        "parent": {
                                            "id": "b2df5a05-58b2-4c10-9d82-b72a8609b65d",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.716303Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 6,
                                            "link": "",
                                            "label": "Laad hier je afspraken op",
                                            "name": "communication_agreements_agreements_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/6a6b32f7-4492-419e-aa14-43894b34182b",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.420753Z",
                                        "updated_on": "2022-06-20T10:19:48.420762Z",
                                        "archived_on": "2022-06-20T10:19:48.420768Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "communication_agreements_agreements_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.387101Z",
                                "updated_on": "2022-06-20T10:19:48.387111Z",
                                "archived_on": "2022-06-20T10:19:48.387117Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "communication_agreements_agreements"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.381558Z",
                        "updated_on": "2022-06-20T10:19:48.381573Z",
                        "archived_on": "2022-06-20T10:19:48.381580Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "communication_agreements",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    },
                    {
                        "id": "52d1bbac-400b-4a26-a8ab-85f881e8ab0a",
                        "parent": {
                            "id": "4c56e352-e690-416c-b708-f79c2f1bbe3c",
                            "name": "safety",
                            "index": 3,
                            "description": "",
                            "archived_on": "2022-06-20T09:20:51.125370Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Veiligheid",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "77b37147-61ca-4464-beec-268616d92c25",
                                "parent": {
                                    "id": "c583476f-c9c7-440a-8758-3cce82fff624",
                                    "name": "safety_insurance",
                                    "archived_on": "2022-06-20T09:20:51.234253Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 0,
                                    "link": "",
                                    "label": "Verzekeringen",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "5a8575f6-e2af-4de2-a61a-4b7391b6f3fb",
                                        "parent": {
                                            "id": "bb3a2220-d893-4326-b1ba-dc36013d6b81",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.723983Z",
                                            "is_archived": false,
                                            "explanation": "Alle leden van Scouts en Gidsen Vlaanderen (leden en leiding) zijn verzekerd tijdens en op weg naar scoutsactiviteiten overal ter wereld. Als iedereen op je kamp ingeschreven is bij Scouys en Gidsen Vlaanderen is alles in orde. <br> Wil je toch meer info? Die vind je op de <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/waarvoor-ben-je-verzekerd' target='_blank'>website</a>.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Alle leden en leiding verzekerd",
                                            "name": "safety_insurance_members",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/5a8575f6-e2af-4de2-a61a-4b7391b6f3fb",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.508456Z",
                                        "updated_on": "2022-06-20T10:19:48.508465Z",
                                        "archived_on": "2022-06-20T10:19:48.508471Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_members"
                                    },
                                    {
                                        "id": "52ff9f47-4896-40f1-9586-3eea4392b0dc",
                                        "parent": {
                                            "id": "b9ffc942-d784-415c-9d2d-f9a03fbe6199",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.731660Z",
                                            "is_archived": false,
                                            "explanation": "Voor niet-leden van Scouts en Gidsen Vlaanderen kan je <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/tijdelijke-verzekering-niet-leden' target='_blank'>hier</a> een tijdelijke verzekering aanvragen.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Alle niet-leden (fouriers, bezoekers) verzekerd",
                                            "name": "safety_insurance_non_members",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/52ff9f47-4896-40f1-9586-3eea4392b0dc",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.512252Z",
                                        "updated_on": "2022-06-20T10:19:48.512265Z",
                                        "archived_on": "2022-06-20T10:19:48.512272Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_non_members"
                                    },
                                    {
                                        "id": "d2997830-520d-4d46-b4f7-de42bb876594",
                                        "parent": {
                                            "id": "a10bf295-04d4-444a-a4a0-71da2059e5d1",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.739346Z",
                                            "is_archived": false,
                                            "explanation": "Wil je een auto verzekeren voor jullie weekend of kamp? Dat kan <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/autoverzekering' target='_blank'>zo</a>.",
                                            "index": 2,
                                            "link": "",
                                            "label": "Alle voertuigen verzekerd",
                                            "name": "safety_insurance_cars",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/d2997830-520d-4d46-b4f7-de42bb876594",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.498175Z",
                                        "updated_on": "2022-06-20T10:19:48.498186Z",
                                        "archived_on": "2022-06-20T10:19:48.498194Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_cars"
                                    },
                                    {
                                        "id": "99edf070-1d92-408f-b328-0a459d5c6a94",
                                        "parent": {
                                            "id": "1b88fa7c-50cf-44b3-b7a3-ab074b810173",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.746937Z",
                                            "is_archived": false,
                                            "explanation": "Kies voor een <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/materiaalverzekering' target='_blank'>materiaalverzekering</a> om tenten, groeps- of persoonlijk materiaal (fiets, gsm, laptop, radio...) te verzekeren.",
                                            "index": 3,
                                            "link": "",
                                            "label": "Alle materiaal verzekerd",
                                            "name": "safety_insurance_materials",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/99edf070-1d92-408f-b328-0a459d5c6a94",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.505255Z",
                                        "updated_on": "2022-06-20T10:19:48.505264Z",
                                        "archived_on": "2022-06-20T10:19:48.505270Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_materials"
                                    },
                                    {
                                        "id": "99a018ca-b2cb-406d-9147-2128ac8fdf0a",
                                        "parent": {
                                            "id": "16705671-742e-4ab2-a123-ae5f43a90b62",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.762174Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 5,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "safety_insurance_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/99a018ca-b2cb-406d-9147-2128ac8fdf0a",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.501696Z",
                                        "updated_on": "2022-06-20T10:19:48.501705Z",
                                        "archived_on": "2022-06-20T10:19:48.501711Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_comments"
                                    },
                                    {
                                        "id": "7ce3a17e-04f9-4938-8738-e55a5be1e8a0",
                                        "parent": {
                                            "id": "6378cfd7-42e7-4815-810f-0b1e6b67a0f2",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.769784Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 6,
                                            "link": "",
                                            "label": "Upload hier je verzekeringsdocumenten",
                                            "name": "safety_insurance_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/7ce3a17e-04f9-4938-8738-e55a5be1e8a0",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.516213Z",
                                        "updated_on": "2022-06-20T10:19:48.516224Z",
                                        "archived_on": "2022-06-20T10:19:48.516230Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_insurance_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.491082Z",
                                "updated_on": "2022-06-20T10:19:48.491092Z",
                                "archived_on": "2022-06-20T10:19:48.491100Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "safety_insurance"
                            },
                            {
                                "id": "4d530417-cf80-478b-8ca7-c506b7c8e6bb",
                                "parent": {
                                    "id": "59e4e515-b2f5-453c-84f4-c4532f65ff57",
                                    "name": "safety_healthcare",
                                    "archived_on": "2022-06-20T09:20:51.241391Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 1,
                                    "link": "",
                                    "label": "Zorgverlening",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "db595585-6d5b-4f57-8313-5ad35be0aae9",
                                        "parent": {
                                            "id": "7bf50a79-5ec2-4cfe-8b0d-e7487b060745",
                                            "check_type": {
                                                "id": "1c150b4b-55e4-4174-ad63-f4566c867f93",
                                                "description": "A check that contains a geo-coordinate",
                                                "check_type": "LocationCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.777378Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Locatie huisarts, apotheek, ziekenhuis",
                                            "name": "safety_healthcare_gp_pharmacy_hospital_location",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/location/db595585-6d5b-4f57-8313-5ad35be0aae9",
                                        "value": {
                                            "center_latitude": 50.4956754,
                                            "center_longitude": 3.3452037,
                                            "zoom": 7,
                                            "locations": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.472906Z",
                                        "updated_on": "2022-06-20T10:19:48.472915Z",
                                        "archived_on": "2022-06-20T10:19:48.472921Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_gp_pharmacy_hospital_location"
                                    },
                                    {
                                        "id": "5464e357-e567-48dd-8099-62502e9f8400",
                                        "parent": {
                                            "id": "746a552d-b3f9-44ac-af7a-bbf31e66aee8",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.785006Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Huisarts in de buurt",
                                            "name": "safety_healthcare_gp",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/5464e357-e567-48dd-8099-62502e9f8400",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.469065Z",
                                        "updated_on": "2022-06-20T10:19:48.469078Z",
                                        "archived_on": "2022-06-20T10:19:48.469084Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_gp"
                                    },
                                    {
                                        "id": "86285e0f-1b26-4564-bed8-17c25c2e8ff9",
                                        "parent": {
                                            "id": "c634c0cd-3d04-4bc9-a475-d7465028edef",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.792614Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Apotheek in de buurt",
                                            "name": "safety_healthcare_pharmacy",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/86285e0f-1b26-4564-bed8-17c25c2e8ff9",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.488246Z",
                                        "updated_on": "2022-06-20T10:19:48.488255Z",
                                        "archived_on": "2022-06-20T10:19:48.488261Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_pharmacy"
                                    },
                                    {
                                        "id": "17969e73-1fe2-4858-bb23-5cf06388022b",
                                        "parent": {
                                            "id": "ad8bafe9-7644-4590-9036-8252d9a9028a",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.800183Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Ziekenhuis in de buurt",
                                            "name": "safety_healthcare_hospital",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/17969e73-1fe2-4858-bb23-5cf06388022b",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.477076Z",
                                        "updated_on": "2022-06-20T10:19:48.477095Z",
                                        "archived_on": "2022-06-20T10:19:48.477107Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_hospital"
                                    },
                                    {
                                        "id": "de1e2da0-c227-4802-a688-535627c4f3a8",
                                        "parent": {
                                            "id": "6a74e172-e8c5-4f44-b24b-a7e49be063b2",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.807772Z",
                                            "is_archived": false,
                                            "explanation": "Schrammen na het bosspel, blaren na de tocht…  Soms moet je kleine verwondingen verzorgen. Maar wat heb je daarvoor nodig? Vind <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/leiding/ehbo/ehbo-koffer' target='_blank'>hier</a> wat je allemaal voorziet in je EHBO-koffer.",
                                            "index": 4,
                                            "link": "",
                                            "label": "EHBO-koffer volledig samengesteld",
                                            "name": "safety_healthcare_hospital_ehbo",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/de1e2da0-c227-4802-a688-535627c4f3a8",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.481334Z",
                                        "updated_on": "2022-06-20T10:19:48.481345Z",
                                        "archived_on": "2022-06-20T10:19:48.481351Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_hospital_ehbo"
                                    },
                                    {
                                        "id": "53c3fbe9-4d94-4caf-84bf-27c0eca8dd8f",
                                        "parent": {
                                            "id": "d5cec246-5614-441a-a82b-1b6d88711405",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.815410Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 5,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "safety_healthcare_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/53c3fbe9-4d94-4caf-84bf-27c0eca8dd8f",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.465007Z",
                                        "updated_on": "2022-06-20T10:19:48.465019Z",
                                        "archived_on": "2022-06-20T10:19:48.465026Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_comments"
                                    },
                                    {
                                        "id": "077558f5-9d7f-4bff-9d9f-b461a8e74643",
                                        "parent": {
                                            "id": "062552fd-c003-49fc-9f4e-0dfba8f146be",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.823038Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 6,
                                            "link": "",
                                            "label": "Upload hier de lijst met noodnummers",
                                            "name": "safety_healthcare_hospital_emergency_contact",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/077558f5-9d7f-4bff-9d9f-b461a8e74643",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.484629Z",
                                        "updated_on": "2022-06-20T10:19:48.484639Z",
                                        "archived_on": "2022-06-20T10:19:48.484644Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "safety_healthcare_hospital_emergency_contact"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.457044Z",
                                "updated_on": "2022-06-20T10:19:48.457054Z",
                                "archived_on": "2022-06-20T10:19:48.457061Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "safety_healthcare"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.451320Z",
                        "updated_on": "2022-06-20T10:19:48.451330Z",
                        "archived_on": "2022-06-20T10:19:48.451337Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "safety",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    },
                    {
                        "id": "17f7fd8c-7cc0-4d23-824a-307b35dd494f",
                        "parent": {
                            "id": "8038cadc-3767-4ed5-8c9b-2f4e26e05082",
                            "name": "members_leaders",
                            "index": 4,
                            "description": "",
                            "archived_on": "2022-06-20T09:20:51.133628Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Leden & leiding",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "1434edb4-c480-46d8-91bf-d45d8f6ed2b0",
                                "parent": {
                                    "id": "c070a1dd-bd08-43e2-89f5-cb68350b1f89",
                                    "name": "members_leaders_responsible",
                                    "archived_on": "2022-06-20T09:20:51.255778Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 0,
                                    "link": "",
                                    "label": "Verantwoordelijke",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "3d48e373-89f9-4583-9ff2-f97cc39cf6c8",
                                        "parent": {
                                            "id": "66f10b2d-0f05-467e-976b-f0b499b663fa",
                                            "check_type": {
                                                "id": "9780e6ee-f6b8-4466-8187-933a1737fac2",
                                                "description": "A check that selects responsibles",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.867368Z",
                                            "is_archived": false,
                                            "explanation": "De kampverantwoordelijke is iemand van de leidingsploeg die als verantwoordelijke het kamp ‘trekt’. <br> Wijzigen deze gegevens na de deadline van de kampregistratie? Bezorg ze dan nog aan de gemeente waar je op kamp gaat.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Contactgegevens kampverantwoordelijke",
                                            "name": "members_leaders_responsible_main",
                                            "is_multiple": false,
                                            "is_member": true,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/3d48e373-89f9-4583-9ff2-f97cc39cf6c8",
                                        "value": {
                                            "participant_check_type": "R",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.615756Z",
                                        "updated_on": "2022-06-20T10:19:48.615770Z",
                                        "archived_on": "2022-06-20T10:19:48.615778Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_responsible_main"
                                    },
                                    {
                                        "id": "43de931f-974a-4515-a0cb-7a889ad22e5b",
                                        "parent": {
                                            "id": "d7bbb0ce-bb6b-49fb-95cc-8559382746f2",
                                            "check_type": {
                                                "id": "9780e6ee-f6b8-4466-8187-933a1737fac2",
                                                "description": "A check that selects responsibles",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.874704Z",
                                            "is_archived": false,
                                            "explanation": "Wijzigen deze gegevens na de deadline van de kampregistratie? Bezorg ze dan nog aan de gemeente waar je op kamp gaat.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Contactgegevens 2de kampverantwoordelijke",
                                            "name": "members_leaders_responsible_adjunct",
                                            "is_multiple": false,
                                            "is_member": true,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/43de931f-974a-4515-a0cb-7a889ad22e5b",
                                        "value": {
                                            "participant_check_type": "R",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.611533Z",
                                        "updated_on": "2022-06-20T10:19:48.611547Z",
                                        "archived_on": "2022-06-20T10:19:48.611556Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_responsible_adjunct"
                                    },
                                    {
                                        "id": "bb01bcce-308f-408a-8689-107ba8218e57",
                                        "parent": {
                                            "id": "a18abd02-3c73-4451-89cb-13ce9beddcf1",
                                            "check_type": {
                                                "id": "aefc4091-ff93-4f66-9ff3-caacee5049bc",
                                                "description": "A check that selects 21-year-olds",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.882042Z",
                                            "is_archived": false,
                                            "explanation": "Op ieder kamp moet ook een eindverantwoordelijke aanwezig zijn, die het hele kamp aanwezig is. De kampverantwoordelijke moet minstens 21 jaar zijn, of in het lopend werkjaar 21 jaar worden. Dit mag ook een groepsleider zijn die mee is op het kamp, of als je niemand vindt binnen de leiding, een foerier.",
                                            "index": 2,
                                            "link": "",
                                            "label": "21-jarige die gedurende heel het kamp aanwezig is",
                                            "name": "members_leaders_responsible_21_year_old",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/bb01bcce-308f-408a-8689-107ba8218e57",
                                        "value": {
                                            "participant_check_type": "A",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.607708Z",
                                        "updated_on": "2022-06-20T10:19:48.607721Z",
                                        "archived_on": "2022-06-20T10:19:48.607729Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_responsible_21_year_old"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.601602Z",
                                "updated_on": "2022-06-20T10:19:48.601612Z",
                                "archived_on": "2022-06-20T10:19:48.601618Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "members_leaders_responsible"
                            },
                            {
                                "id": "513a1a15-00c6-4117-acec-2b91c738c4bd",
                                "parent": {
                                    "id": "5421702e-5825-4515-91d0-9212ba59c9d3",
                                    "name": "members_leaders_estimates",
                                    "archived_on": "2022-06-20T09:20:51.263057Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 1,
                                    "link": "",
                                    "label": "Geschat aantal deelnemers",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "3cbc2dac-7607-449c-9339-6f10267742d6",
                                        "parent": {
                                            "id": "2f662ac2-1435-4397-9be6-85d2163133cd",
                                            "check_type": {
                                                "id": "0aa22e0c-2a42-4ccc-8ecf-45129568174e",
                                                "description": "A check that contains numbers",
                                                "check_type": "NumberCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.889370Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Geschat aantal leiding",
                                            "name": "members_leaders_leaders_estimate",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "validate_estimate",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/number/3cbc2dac-7607-449c-9339-6f10267742d6",
                                        "value": null,
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.551857Z",
                                        "updated_on": "2022-06-20T10:19:48.551866Z",
                                        "archived_on": "2022-06-20T10:19:48.551872Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_leaders_estimate"
                                    },
                                    {
                                        "id": "3fd2c36f-a548-412e-aeec-abe7029ed130",
                                        "parent": {
                                            "id": "c7459b59-a35c-4c0d-b271-10357906ffb8",
                                            "check_type": {
                                                "id": "0aa22e0c-2a42-4ccc-8ecf-45129568174e",
                                                "description": "A check that contains numbers",
                                                "check_type": "NumberCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.896718Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Geschat aantal fouriers",
                                            "name": "members_leaders_cooks_estimate",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "validate_estimate",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/number/3fd2c36f-a548-412e-aeec-abe7029ed130",
                                        "value": null,
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.548003Z",
                                        "updated_on": "2022-06-20T10:19:48.548015Z",
                                        "archived_on": "2022-06-20T10:19:48.548022Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_cooks_estimate"
                                    },
                                    {
                                        "id": "9ae883e6-eeff-4e82-a998-7f31c2f0384d",
                                        "parent": {
                                            "id": "575ba591-f6cd-4b19-a24a-52685bf0592a",
                                            "check_type": {
                                                "id": "0aa22e0c-2a42-4ccc-8ecf-45129568174e",
                                                "description": "A check that contains numbers",
                                                "check_type": "NumberCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.904035Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Geschat aantal leden",
                                            "name": "members_leaders_members_estimate",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "validate_estimate",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/number/9ae883e6-eeff-4e82-a998-7f31c2f0384d",
                                        "value": null,
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.555452Z",
                                        "updated_on": "2022-06-20T10:19:48.555461Z",
                                        "archived_on": "2022-06-20T10:19:48.555467Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_estimate"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.540934Z",
                                "updated_on": "2022-06-20T10:19:48.540943Z",
                                "archived_on": "2022-06-20T10:19:48.540950Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "members_leaders_estimates"
                            },
                            {
                                "id": "6d4a21e4-504a-4868-9896-e5f953eab942",
                                "parent": {
                                    "id": "e38374b5-af1e-4fb4-a5f7-56c4151f348a",
                                    "name": "members_leaders_leaders",
                                    "archived_on": "2022-06-20T09:20:51.270163Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 2,
                                    "link": "",
                                    "label": "Kampleiding",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "afb6196f-f652-4fe9-956d-e88441acd377",
                                        "parent": {
                                            "id": "e0f95660-60d3-4f12-8ac7-cf5f02574c76",
                                            "check_type": {
                                                "id": "4fc16455-92d6-4a34-8fb2-e0e2fbc9f363",
                                                "description": "A check that selects leaders",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.911366Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Lijst van kampleiding",
                                            "name": "members_leaders_leaders",
                                            "is_multiple": true,
                                            "is_member": true,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/afb6196f-f652-4fe9-956d-e88441acd377",
                                        "value": {
                                            "participant_check_type": "L",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.566076Z",
                                        "updated_on": "2022-06-20T10:19:48.566090Z",
                                        "archived_on": "2022-06-20T10:19:48.566100Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_leaders"
                                    },
                                    {
                                        "id": "7f20532e-8a75-478e-ac3b-d2e7dc4bb2aa",
                                        "parent": {
                                            "id": "47ad981b-073d-42e5-8ea2-3e8c1b635546",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.927159Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "members_leaders_leaders_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/7f20532e-8a75-478e-ac3b-d2e7dc4bb2aa",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.569902Z",
                                        "updated_on": "2022-06-20T10:19:48.569911Z",
                                        "archived_on": "2022-06-20T10:19:48.569917Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_leaders_comments"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.558944Z",
                                "updated_on": "2022-06-20T10:19:48.558964Z",
                                "archived_on": "2022-06-20T10:19:48.558978Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "members_leaders_leaders"
                            },
                            {
                                "id": "c3f78669-1f4c-4313-aa45-e66326f345ed",
                                "parent": {
                                    "id": "cb0255ef-6d2c-4e03-9738-4c1a78842097",
                                    "name": "members_leaders_cooks",
                                    "archived_on": "2022-06-20T09:20:51.277242Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 3,
                                    "link": "",
                                    "label": "Foerage",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "c075ebc9-d888-4ff5-bd29-2adaad361cb8",
                                        "parent": {
                                            "id": "03f7dbc2-bf64-4b4e-9d3d-f05d73637a78",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.942995Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 0,
                                            "link": "",
                                            "label": "Voldoende foeriers",
                                            "name": "members_leaders_cooks_sufficient",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/c075ebc9-d888-4ff5-bd29-2adaad361cb8",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.538133Z",
                                        "updated_on": "2022-06-20T10:19:48.538142Z",
                                        "archived_on": "2022-06-20T10:19:48.538148Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_cooks_sufficient"
                                    },
                                    {
                                        "id": "523672fa-b479-4921-9171-4e7981c03c05",
                                        "parent": {
                                            "id": "8f7d41b2-c21e-4bfe-b98a-df9f12816c0f",
                                            "check_type": {
                                                "id": "454dfb9c-bd5d-4d3f-bb05-c74da15ec1aa",
                                                "description": "A check that selects cooks",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.956866Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Lijst van foerage",
                                            "name": "members_leaders_cooks_cooks",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/523672fa-b479-4921-9171-4e7981c03c05",
                                        "value": {
                                            "participant_check_type": "C",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.535009Z",
                                        "updated_on": "2022-06-20T10:19:48.535021Z",
                                        "archived_on": "2022-06-20T10:19:48.535028Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_cooks_cooks"
                                    },
                                    {
                                        "id": "fafc8bfe-fab2-430c-977e-c453c3402cbb",
                                        "parent": {
                                            "id": "dadeedd5-7744-4459-87a2-d7637b3c5ea1",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.973782Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "members_leaders_cooks_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/fafc8bfe-fab2-430c-977e-c453c3402cbb",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.531729Z",
                                        "updated_on": "2022-06-20T10:19:48.531740Z",
                                        "archived_on": "2022-06-20T10:19:48.531747Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_cooks_comments"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.524491Z",
                                "updated_on": "2022-06-20T10:19:48.524505Z",
                                "archived_on": "2022-06-20T10:19:48.524515Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "members_leaders_cooks"
                            },
                            {
                                "id": "79058134-447d-42e5-a4dc-722dba42fba3",
                                "parent": {
                                    "id": "9125cd7c-26bb-443b-82c2-24106cdf3525",
                                    "name": "members_leaders_members",
                                    "archived_on": "2022-06-20T09:20:51.284296Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 4,
                                    "link": "",
                                    "label": "Leden",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "6923cc4f-d614-49eb-9831-6465dc6079a4",
                                        "parent": {
                                            "id": "81ae572a-f952-4b24-a9a9-be7788814c62",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.985182Z",
                                            "is_archived": false,
                                            "explanation": "De individuele steekkaart is een uitgebreide medische fiche. Zo wil Scouts en Gidsen Vlaanderen leiding helpen om hun leden veilig en persoonlijk te begeleiden. <a href='https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/leiding/ehbo/individuele-steekkaart' target='_blank'>Ontdek</a> er meer over.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Individuele steekkaarten up-to-date",
                                            "name": "members_leaders_members_medical_info",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/6923cc4f-d614-49eb-9831-6465dc6079a4",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.589771Z",
                                        "updated_on": "2022-06-20T10:19:48.589780Z",
                                        "archived_on": "2022-06-20T10:19:48.589786Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_medical_info"
                                    },
                                    {
                                        "id": "5dade7c5-ac11-4e49-85ee-34760e2c2d46",
                                        "parent": {
                                            "id": "e8671779-b32e-4896-a894-e89f3daa05ea",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:51.995059Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 1,
                                            "link": "",
                                            "label": "Kopie identiteitskaarten",
                                            "name": "members_leaders_members_id",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/5dade7c5-ac11-4e49-85ee-34760e2c2d46",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.585880Z",
                                        "updated_on": "2022-06-20T10:19:48.585891Z",
                                        "archived_on": "2022-06-20T10:19:48.585898Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_id"
                                    },
                                    {
                                        "id": "4b57f8c1-b63e-4bd5-b787-1998e9740055",
                                        "parent": {
                                            "id": "8e289213-f6d1-4d1c-89c8-669552c94c3e",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.003924Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Leden betaald",
                                            "name": "members_leaders_members_payment",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/4b57f8c1-b63e-4bd5-b787-1998e9740055",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.598415Z",
                                        "updated_on": "2022-06-20T10:19:48.598428Z",
                                        "archived_on": "2022-06-20T10:19:48.598436Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_payment"
                                    },
                                    {
                                        "id": "2670028f-a2eb-4f46-8fe7-353c01162c40",
                                        "parent": {
                                            "id": "539c3be7-5ea1-40b9-bc9f-663a1e330258",
                                            "check_type": {
                                                "id": "6ec570df-a86d-4271-8a8c-c39c333c3d84",
                                                "description": "A check that selects members",
                                                "check_type": "ParticipantCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.013193Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Lijst van leden",
                                            "name": "members_leaders_members_members",
                                            "is_multiple": true,
                                            "is_member": true,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/participant/2670028f-a2eb-4f46-8fe7-353c01162c40",
                                        "value": {
                                            "participant_check_type": "M",
                                            "participants": []
                                        },
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.593450Z",
                                        "updated_on": "2022-06-20T10:19:48.593462Z",
                                        "archived_on": "2022-06-20T10:19:48.593471Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_members"
                                    },
                                    {
                                        "id": "5d9751fd-2acf-477f-8bf2-331809ef0c67",
                                        "parent": {
                                            "id": "baa0e06a-6307-4d53-a130-e602e726b90e",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.025400Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 4,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "members_leaders_members_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/5d9751fd-2acf-477f-8bf2-331809ef0c67",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.581212Z",
                                        "updated_on": "2022-06-20T10:19:48.581225Z",
                                        "archived_on": "2022-06-20T10:19:48.581231Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "members_leaders_members_comments"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.573495Z",
                                "updated_on": "2022-06-20T10:19:48.573505Z",
                                "archived_on": "2022-06-20T10:19:48.573512Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "members_leaders_members"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.519244Z",
                        "updated_on": "2022-06-20T10:19:48.519254Z",
                        "archived_on": "2022-06-20T10:19:48.519264Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "members_leaders",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    },
                    {
                        "id": "89992644-ab2d-431b-a1fd-5b171e4b3a10",
                        "parent": {
                            "id": "1df91cc3-8ff2-4fcc-ab7b-ad5fe813671a",
                            "name": "budget",
                            "index": 5,
                            "description": "",
                            "archived_on": "2022-06-20T09:20:51.141168Z",
                            "is_archived": false,
                            "explanation": "",
                            "label": "Budget",
                            "archived_by": null,
                            "camp_year": "c436d6f1-9566-4cab-b957-d6f7412a2969",
                            "priority": "ba16bd77-1c48-4605-923b-bcae24155138"
                        },
                        "sub_categories": [
                            {
                                "id": "9ce74a70-4dc9-4d5c-922c-895f546148b7",
                                "parent": {
                                    "id": "1b92589c-5ec9-4b5f-acd8-5ca2417b77db",
                                    "name": "budget_budget",
                                    "archived_on": "2022-06-20T09:20:51.291414Z",
                                    "is_archived": false,
                                    "description": "",
                                    "explanation": "",
                                    "index": 0,
                                    "link": "",
                                    "label": "Begroting",
                                    "archived_by": null
                                },
                                "checks": [
                                    {
                                        "id": "63641614-b1c7-4020-a6ef-22fa6de894e0",
                                        "parent": {
                                            "id": "dd76031d-f8df-49ce-a3ef-b98f71a2122e",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.035929Z",
                                            "is_archived": false,
                                            "explanation": "• Duid een vaste financiële verantwoordelijke aan, die op kamp dagelijks het kasboek bijhoudt en alle uitgaven noteert. Dit mag ook een foerier zijn. <br> • Vaak kan je korting vragen aan vervoersmaatschappijen en lokale bakkers, slagers en winkels. <br> • Ga na of er in het jeugdbeleidsplan van je gemeente geld voorzien is voor kampen. Informeer hiervoor bij de jeugddienst.",
                                            "index": 0,
                                            "link": "",
                                            "label": "Evenwichtige begroting",
                                            "name": "budget_budget_balanced",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/63641614-b1c7-4020-a6ef-22fa6de894e0",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.632422Z",
                                        "updated_on": "2022-06-20T10:19:48.632433Z",
                                        "archived_on": "2022-06-20T10:19:48.632440Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "budget_budget_balanced"
                                    },
                                    {
                                        "id": "c10687eb-e1e0-45c3-914f-e9bd5913d853",
                                        "parent": {
                                            "id": "297a755d-8b94-4ffc-994d-f30664f4acb6",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.045919Z",
                                            "is_archived": false,
                                            "explanation": "Als je ervoor kiest om met de leiding een deel van de kampprijs niet te betalen heeft dit grote gevolgen op de kampprijs per deelnemer en je begroting.",
                                            "index": 1,
                                            "link": "",
                                            "label": "Afspraken betaling leiding",
                                            "name": "budget_budget_leaders",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/c10687eb-e1e0-45c3-914f-e9bd5913d853",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.640182Z",
                                        "updated_on": "2022-06-20T10:19:48.640192Z",
                                        "archived_on": "2022-06-20T10:19:48.640198Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "budget_budget_leaders"
                                    },
                                    {
                                        "id": "0569c132-7051-4192-9aad-2881bdf686d6",
                                        "parent": {
                                            "id": "ec0a0469-8726-469c-9db8-0750a174c57b",
                                            "check_type": {
                                                "id": "f57ff1ad-d498-45fd-8404-ecc27c322788",
                                                "description": "A check that can be checked, unchecked or set as not applicable",
                                                "check_type": "SimpleCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.056687Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 2,
                                            "link": "",
                                            "label": "Kampgeld leden ontvangen",
                                            "name": "budget_budget_members",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/simple/0569c132-7051-4192-9aad-2881bdf686d6",
                                        "value": "EMPTY",
                                        "state": "UNCHECKED",
                                        "created_on": "2022-06-20T10:19:48.644292Z",
                                        "updated_on": "2022-06-20T10:19:48.644305Z",
                                        "archived_on": "2022-06-20T10:19:48.644312Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "budget_budget_members"
                                    },
                                    {
                                        "id": "57ab1b2c-33ee-43af-a7a4-0e207c28aa04",
                                        "parent": {
                                            "id": "c6cd18af-9a17-462c-9486-6235001aaade",
                                            "check_type": {
                                                "id": "085229e6-b482-4065-9f9a-41cb52eb6c9d",
                                                "description": "A check that contains comments",
                                                "check_type": "CommentCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.067852Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 3,
                                            "link": "",
                                            "label": "Opmerkingen",
                                            "name": "budget_budget_comments",
                                            "is_multiple": false,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/comment/57ab1b2c-33ee-43af-a7a4-0e207c28aa04",
                                        "value": "",
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.636437Z",
                                        "updated_on": "2022-06-20T10:19:48.636446Z",
                                        "archived_on": "2022-06-20T10:19:48.636452Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "budget_budget_comments"
                                    },
                                    {
                                        "id": "0bfc6a78-1dc8-42be-bafc-6c75abe911fb",
                                        "parent": {
                                            "id": "826c55df-2d86-4d25-b92a-e1ec347cc1d8",
                                            "check_type": {
                                                "id": "8e0a1727-0d5e-4b7f-9688-7f02419b194b",
                                                "description": "A check that contains a file",
                                                "check_type": "FileUploadCheck"
                                            },
                                            "archived_on": "2022-06-20T09:20:52.078114Z",
                                            "is_archived": false,
                                            "explanation": "",
                                            "index": 4,
                                            "link": "",
                                            "label": "Laad hier de digitale begroting op",
                                            "name": "budget_budget_upload",
                                            "is_multiple": true,
                                            "is_member": false,
                                            "is_required_for_validation": true,
                                            "validators": "",
                                            "archived_by": null
                                        },
                                        "endpoint": "checks/file/0bfc6a78-1dc8-42be-bafc-6c75abe911fb",
                                        "value": [],
                                        "state": "CHECKED",
                                        "created_on": "2022-06-20T10:19:48.648872Z",
                                        "updated_on": "2022-06-20T10:19:48.648883Z",
                                        "archived_on": "2022-06-20T10:19:48.648890Z",
                                        "is_archived": false,
                                        "created_by": null,
                                        "updated_by": null,
                                        "archived_by": null,
                                        "readable_name": "budget_budget_upload"
                                    }
                                ],
                                "feedback": "",
                                "approval": "U",
                                "created_on": "2022-06-20T10:19:48.624374Z",
                                "updated_on": "2022-06-20T10:19:48.624385Z",
                                "archived_on": "2022-06-20T10:19:48.624391Z",
                                "is_archived": false,
                                "created_by": null,
                                "updated_by": null,
                                "archived_by": null,
                                "state": "UNCHECKED",
                                "readable_name": "budget_budget"
                            }
                        ],
                        "created_on": "2022-06-20T10:19:48.619097Z",
                        "updated_on": "2022-06-20T10:19:48.619107Z",
                        "archived_on": "2022-06-20T10:19:48.619113Z",
                        "is_archived": false,
                        "created_by": null,
                        "updated_by": null,
                        "archived_by": null,
                        "state": "UNCHECKED",
                        "readable_name": "budget",
                        "camp": {
                            "name": "test edit"
                        },
                        "visum": {
                            "id": "15437c5f-31a3-4c83-9ffa-27572619623e"
                        }
                    }
                ],
                "state": "UNCHECKED",
                "readable_name": "2022 basis"
            },
            "engagement": {
                "id": "3e9b0979-fed7-4978-b495-65db3ecc003c",
                "leaders": null,
                "group_leaders": null,
                "district_commissioner": null,
                "approved": false,
                "can_sign": false,
                "leaders_can_sign": false,
                "group_leaders_can_sign": false,
                "district_commissioner_can_sign": false
            },
            "notes": null,
            "created_on": "2022-06-20T10:19:48.184758Z",
            "updated_on": "2022-06-20T10:19:48.184774Z",
            "camp_registration_mail_sent_before_deadline": false,
            "camp_registration_mail_sent_after_deadline": false,
            "camp_registration_mail_last_sent": null,
            "state": "DATA_REQUIRED",
            "created_by": "5b4bda13-df27-45f6-bd9c-d7d22a5f7d07",
            "updated_by": null,
            "group_group_admin_id": "X9002G"
        }
    ]
}
export class CampRepository extends BaseRepository {
  id = '/camps/'
  endpoint = '/visums/'
  deserializer = VisumDeserializer
  serializer = CampSerializer

  getArray(pagination?: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(this.endpoint + pagination, {}).then((response: ArrayResult) => {
        const array: any[] = []
        if (response?.results) { 
          response.results.forEach((result: Visum) => {
            array.push(this.deserializer(result))
          })
        }
        return array
      })
    } else {
      return new Promise<any>((resolve, reject): void => {
        

      const array: any[] = []
      if (localVisums?.results) { 
        localVisums.results.forEach((result: any) => {
          array.push(this.deserializer(result))
        })
      }
      resolve(array)
      })
    }
    
  }

  getGroupYears(groupId: string): Promise<any> {
    const { updateYears, getYears } = useOfflineData()
    const { isInternetActive } = useInternetHelper()

    if (isInternetActive.value) {
      return this.get(this.id + groupId + '/years/', {}).then((response: []) => {
        updateYears(response)
        return response
      })
    } else {
      return new Promise<Array<number>>((resolve, reject): void => {
        getYears().then((result: any) => {
            resolve(result)
        })
      })
    }
  }

  getById(id: string): Promise<any> {
    const { isInternetActive } = useInternetHelper()
    if (isInternetActive.value) {
    return this.get(this.endpoint + id, {}).then((response: any) => {
        return this.deserializer(response)
    })
    } else {
        return new Promise<any>((resolve, reject) => {
            let visumById = {}
            localVisums.results.forEach((visum: any) => {
                console.log('visum: ', visum.id + '/')
                console.log('ID', id)
                if (id === (visum.id + '/')) {
                    visumById = visum
                }
            })
            console.log('BY ID: ', visumById)
            console.log('BY ID: ', this.deserializer(visumById))

            resolve(this.deserializer(visumById))
        })
    }
  }

  patchCategoryFeedback(subCategoryId: string, feedback: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/feedback`, { feedback: feedback }).then((response: any) => {
      return response
    })
  }

  patchCategoryApproval(subCategoryId: string, approval: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/approval`, { approval: approval }).then((response: any) => {
      return response
    })
  }

  patchVisumNotes(visumId: string, notes: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/notes`, { notes: notes }).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedback(subCategoryId: string): Promise<any> {
    return this.patch(`${this.endpoint}${subCategoryId}/handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumHandleFeedbackGlobal(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_handle_feedback`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumApprovalGlobal(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_approval`, {}).then((response: any) => {
      return response
    })
  }

  patchVisumDisapproval(visumId: string): Promise<any> {
    return this.patch(`${this.endpoint}${visumId}/global_disapproval`, {}).then((response: any) => {
      return response
    })
  }

}
