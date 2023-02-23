import { BaseRepository } from '@/repositories/baseRepository'

export interface ScoutsCountry {
  code: string,
  nl: string
  en: string
}

export class scoutsCountriesRepository extends BaseRepository {
  id = '/countries/'
  endpoint = 'countries'
  deserializer = undefined
  serializer = undefined

  getCountries = (): Array<ScoutsCountry> => {
    return [
      {
        code: "AF",
        en: "Afghanistan",
        nl: "Afghanistan"
      },
      {
        code: "AL",
        en: "Albania",
        nl: "Albanië"
      },
      {
        code: "DZ",
        en: "Algeria",
        nl: "Algerije"
      },
      {
        code: "AO",
        en: "Angola",
        nl: "Angola"
      },
      {
        code: "AR",
        en: "Argentina",
        nl: "Argentinië"
      },
      {
        code: "AM",
        en: "Armenia",
        nl: "Armenië"
      },
      {
        code: "AW",
        en: "Aruba",
        nl: "Aruba"
      },
      {
        code: "AU",
        en: "Australia",
        nl: "Australië"
      },
      {
        code: "AT",
        en: "Austria",
        nl: "Oostenrijk"
      },
      {
        code: "AZ",
        en: "Azerbaijan",
        nl: "Azerbeidzjan"
      },
      {
        code: "BS",
        en: "Bahamas",
        nl: "Bahama's"
      },
      {
        code: "BH",
        en: "Bahrain",
        nl: "Bahrein"
      },
      {
        code: "BD",
        en: "Bangladesh",
        nl: "Bangladesh"
      },
      {
        code: "BB",
        en: "Barbados",
        nl: "Barbados"
      },
      {
        code: "BY",
        en: "Belarus",
        nl: "Wit-Rusland"
      },
      {
        code: "BE",
        en: "Belgium",
        nl: "België"
      },
      {
        code: "BZ",
        en: "Belize",
        nl: "Belize"
      },
      {
        code: "BJ",
        en: "Benin",
        nl: "Benin"
      },
      {
        code: "BT",
        en: "Bhutan",
        nl: "Bhutan"
      },
      {
        code: "BO",
        en: "Plurinational State of Bolivia",
        nl: "Bolivia"
      },
      {
        code: "BA",
        en: "Bosnia and Herzegovina",
        nl: "Bosnië en Herzegovina"
      },
      {
        code: "BW",
        en: "Botswana",
        nl: "Botswana"
      },
      {
        code: "BR",
        en: "Brazil",
        nl: "Brazilië"
      },
      {
        code: "BN",
        en: "Brunei Darussalam",
        nl: "Brunei"
      },
      {
        code: "BG",
        en: "Bulgaria",
        nl: "Bulgarije"
      },
      {
        code: "BF",
        en: "Burkina Faso",
        nl: "Burkina Faso"
      },
      {
        code: "BI",
        en: "Burundi",
        nl: "Burundi"
      },
      {
        code: "CV",
        en: "Cabo Verde",
        nl: "Kaapverdië"
      },
      {
        code: "KH",
        en: "Cambodia",
        nl: "Cambodja"
      },
      {
        code: "CM",
        en: "Cameroon",
        nl: "Kameroen"
      },
      {
        code: "CA",
        en: "Canada",
        nl: "Canada"
      },
      {
        code: "TD",
        en: "Chad",
        nl: "Tsjaad"
      },
      {
        code: "CL",
        en: "Chile",
        nl: "Chili"
      },
      {
        code: "TW",
        en: "Scouts of China",
        nl: "Taiwan"
      },
      {
        code: "CO",
        en: "Colombia",
        nl: "Colombia"
      },
      {
        code: "KM",
        en: "Comoros",
        nl: "Comoren"
      },
      {
        code: "CD",
        en: "Democratic Republic of the Congo",
        nl: "Congo-Kinshasa"
      },
      {
        code: "CR",
        en: "Costa Rica",
        nl: "Costa Rica"
      },
      {
        code: "CI",
        en: "Côte d’Ivoire",
        nl: "Ivoorkust"
      },
      {
        code: "HR",
        en: "Croatia",
        nl: "Kroatië"
      },
      {
        code: "CY",
        en: "Cyprus",
        nl: "Cyprus"
      },
      {
        code: "CZ",
        en: "Czechia",
        nl: "Tsjechië"
      },
      {
        code: "DK",
        en: "Denmark",
        nl: "Denemarken"
      },
      {
        code: "DM",
        en: "Dominica",
        nl: "Dominica"
      },
      {
        code: "DO",
        en: "Dominican Republic",
        nl: "Dominicaanse Republiek"
      },
      {
        code: "EC",
        en: "Ecuador",
        nl: "Ecuador"
      },
      {
        code: "EG",
        en: "Egypt",
        nl: "Egypte"
      },
      {
        code: "SV",
        en: "El Salvador",
        nl: "El Salvador"
      },
      {
        code: "EE",
        en: "Estonia",
        nl: "Estland"
      },
      {
        code: "SZ",
        en: "Eswatini",
        nl: "Swaziland"
      },
      {
        code: "ET",
        en: "Ethiopia",
        nl: "Ethiopië"
      },
      {
        code: "FJ",
        en: "Fiji",
        nl: "Fiji"
      },
      {
        code: "FI",
        en: "Finland",
        nl: "Finland"
      },
      {
        code: "FR",
        en: "France",
        nl: "Frankrijk"
      },
      {
        code: "GM",
        en: "Gambia",
        nl: "Gambia"
      },
      {
        code: "GE",
        en: "Georgia",
        nl: "Georgië"
      },
      {
        code: "DE",
        en: "Germany",
        nl: "Duitsland"
      },
      {
        code: "GH",
        en: "Ghana",
        nl: "Ghana"
      },
      {
        code: "GR",
        en: "Greece",
        nl: "Griekenland"
      },
      {
        code: "GD",
        en: "Grenada",
        nl: "Grenada"
      },
      {
        code: "GT",
        en: "Guatemala",
        nl: "Guatemala"
      },
      {
        code: "GN",
        en: "Guinea",
        nl: "Guinee"
      },
      {
        code: "GW",
        en: "Guinea-Bissau",
        nl: "Guinee-Bissau"
      },
      {
        code: "GY",
        en: "Guyana",
        nl: "Guyana"
      },
      {
        code: "HT",
        en: "Haiti",
        nl: "Haïti"
      },
      {
        code: "HN",
        en: "Honduras",
        nl: "Honduras"
      },
      {
        code: "HK",
        en: "Hong Kong",
        nl: "Hongkong"
      },
      {
        code: "HU",
        en: "Hungary",
        nl: "Hongarije"
      },
      {
        code: "IS",
        en: "Iceland",
        nl: "IJsland"
      },
      {
        code: "IN",
        en: "India",
        nl: "India"
      },
      {
        code: "ID",
        en: "Indonesia",
        nl: "Indonesië"
      },
      {
        code: "IQ",
        en: "Iraq",
        nl: "Irak"
      },
      {
        code: "IE",
        en: "Ireland",
        nl: "Ierland"
      },
      {
        code: "IL",
        en: "Israel",
        nl: "Israël"
      },
      {
        code: "IT",
        en: "Italy",
        nl: "Italië"
      },
      {
        code: "JM",
        en: "Jamaica",
        nl: "Jamaica"
      },
      {
        code: "JP",
        en: "Japan",
        nl: "Japan"
      },
      {
        code: "JO",
        en: "Jordan",
        nl: "Jordanië"
      },
      {
        code: "KZ",
        en: "Kazakhstan",
        nl: "Kazachstan"
      },
      {
        code: "KE",
        en: "Kenya",
        nl: "Kenia"
      },
      {
        code: "KI",
        en: "Kiribati",
        nl: "Kiribati"
      },
      {
        code: "KR",
        en: "Republic of Korea",
        nl: "Zuid-Korea"
      },
      {
        code: "KW",
        en: "Kuwait",
        nl: "Koeweit"
      },
      {
        code: "LV",
        en: "Latvia",
        nl: "Letland"
      },
      {
        code: "LB",
        en: "Lebanon",
        nl: "Libanon"
      },
      {
        code: "LS",
        en: "Lesotho",
        nl: "Lesotho"
      },
      {
        code: "LR",
        en: "Liberia",
        nl: "Liberia"
      },
      {
        code: "LY",
        en: "Libya",
        nl: "Libië"
      },
      {
        code: "LI",
        en: "Liechtenstein",
        nl: "Liechtenstein"
      },
      {
        code: "LT",
        en: "Lithuania",
        nl: "Litouwen"
      },
      {
        code: "LU",
        en: "Luxembourg",
        nl: "Luxemburg"
      },
      {
        code: "MO",
        en: "Macao",
        nl: "Macau"
      },
      {
        code: "MW",
        en: "Malawi",
        nl: "Malawi"
      },
      {
        code: "MY",
        en: "Malaysia",
        nl: "Maleisië"
      },
      {
        code: "MV",
        en: "Maldives",
        nl: "Malediven"
      },
      {
        code: "MT",
        en: "Malta",
        nl: "Malta"
      },
      {
        code: "MR",
        en: "Mauritania",
        nl: "Mauritanië"
      },
      {
        code: "MU",
        en: "Mauritius",
        nl: "Mauritius"
      },
      {
        code: "MX",
        en: "Mexico",
        nl: "Mexico"
      },
      {
        code: "MD",
        en: "Republic of Moldova",
        nl: "Moldavië"
      },
      {
        code: "MC",
        en: "Monaco",
        nl: "Monaco"
      },
      {
        code: "MN",
        en: "Mongolia",
        nl: "Mongolië"
      },
      {
        code: "ME",
        en: "Montenegro",
        nl: "Montenegro"
      },
      {
        code: "MA",
        en: "Morocco",
        nl: "Marokko"
      },
      {
        code: "MZ",
        en: "Mozambique",
        nl: "Mozambique"
      },
      {
        code: "MM",
        en: "Myanmar",
        nl: "Myanmar"
      },
      {
        code: "NP",
        en: "Nepal",
        nl: "epal"
      },
      {
        code: "NL",
        en: "Netherlands",
        nl: "Nederland"
      },
      {
        code: "NZ",
        en: "New Zealand",
        nl: "Nieuw-Zeeland"
      },
      {
        code: "NI",
        en: "Nicaragua",
        nl: "Nicaragua"
      },
      {
        code: "NE",
        en: "Niger",
        nl: "Niger"
      },
      {
        code: "NG",
        en: "Nigeria",
        nl: "Nigeria"
      },
      {
        code: "MK",
        en: "North Macedonia",
        nl: "Noord-Macedonië"
      },
      {
        code: "NO",
        en: "Norway",
        nl: "Noorwegen"
      },
      {
        code: "OM",
        en: "Oman",
        nl: "Oman"
      },
      {
        code: "PK",
        en: "Pakistan",
        nl: "Pakistan"
      },
      {
        code: "PS",
        en: "State of Palestine",
        nl: "Palestina"
      },
      {
        code: "PA",
        en: "Panama",
        nl: "Panama"
      },
      {
        code: "PG",
        en: "Papua New Guinea",
        nl: "Papoea-Nieuw-Guinea"
      },
      {
        code: "PY",
        en: "Paraguay",
        nl: "Paraguay"
      },
      {
        code: "PE",
        en: "Peru",
        nl: "Peru"
      },
      {
        code: "PH",
        en: "Philippines",
        nl: "Filipijnen"
      },
      {
        code: "PL",
        en: "Poland",
        nl: "Polen"
      },
      {
        code: "PT",
        en: "Portugal",
        nl: "Portugal"
      },
      {
        code: "QA",
        en: "Qatar",
        nl: "Qatar"
      },
      {
        code: "RO",
        en: "Romania",
        nl: "Roemenië"
      },
      {
        code: "RW",
        en: "Rwanda",
        nl: "Rwanda"
      },
      {
        code: "LC",
        en: "Saint Lucia",
        nl: "Saint Lucia"
      },
      {
        code: "VC",
        en: "Saint Vincent and the Grenadines",
        nl: "Saint Vincent en de Grenadines"
      },
      {
        code: "SM",
        en: "San Marino",
        nl: "San Marino"
      },
      {
        code: "ST",
        en: "Sao Tome and Principe",
        nl: "Sao Tomé en Principe"
      },
      {
        code: "SA",
        en: "Saudi Arabia",
        nl: "Saoedi-Arabië"
      },
      {
        code: "SN",
        en: "Senegal",
        nl: "Senegal"
      },
      {
        code: "RS",
        en: "Serbia",
        nl: "Servië"
      },
      {
        code: "SC",
        en: "Seychelles",
        nl: "Seychellen"
      },
      {
        code: "SL",
        en: "Sierra Leone",
        nl: "Sierra Leone"
      },
      {
        code: "SG",
        en: "Singapore",
        nl: "Singapore"
      },
      {
        code: "SK",
        en: "Slovakia",
        nl: "Slowakije"
      },
      {
        code: "SI",
        en: "Slovenia",
        nl: "Slovenië"
      },
      {
        code: "ZA",
        en: "South Africa",
        nl: "Zuid-Afrika"
      },
      {
        code: "SS",
        en: "South Sudan",
        nl: "Zuid-Soedan"
      },
      {
        code: "ES",
        en: "Spain",
        nl: "Spanje"
      },
      {
        code: "LK",
        en: "Sri Lanka",
        nl: "Sri Lanka"
      },
      {
        code: "SR",
        en: "Suriname",
        nl: "Suriname"
      },
      {
        code: "SE",
        en: "Sweden",
        nl: "Zweden"
      },
      {
        code: "CH",
        en: "Switzerland",
        nl: "Zwitserland"
      },
      {
        code: "SY",
        en: "Syrian Arab Republic",
        nl: "Syrië"
      },
      {
        code: "TJ",
        en: "Tajikistan",
        nl: "Tadzjikistan"
      },
      {
        code: "TZ",
        en: "United Republic of Tanzania",
        nl: "Tanzania"
      },
      {
        code: "TH",
        en: "Thailand",
        nl: "Thailand"
      },
      {
        code: "TL",
        en: "Timor-Leste",
        nl: "Oost-Timor"
      },
      {
        code: "TG",
        en: "Togo",
        nl: "Togo"
      },
      {
        code: "TT",
        en: "Trinidad and Tobago",
        nl: "Trinidad en Tobago"
      },
      {
        code: "TN",
        en: "Tunisia",
        nl: "Tunesië"
      },
      {
        code: "TR",
        en: "Turkey",
        nl: "Turkije"
      },
      {
        code: "UG",
        en: "Uganda",
        nl: "Oeganda"
      },
      {
        code: "UA",
        en: "Ukraine",
        nl: "Oekraïne"
      },
      {
        code: "AE",
        en: "United Arab Emirates",
        nl: "Verenigde Arabische Emiraten"
      },
      {
        code: "GB",
        en: "United Kingdom",
        nl: "Verenigd Koninkrijk"
      },
      {
        code: "US",
        en: "United States of America",
        nl: "Verenigde Staten"
      },
      {
        code: "UY",
        en: "Uruguay",
        nl: "Uruguay"
      },
      {
        code: "VE",
        en: "Bolivarian Republic of Venezuela",
        nl: "Venezuela"
      },
      {
        code: "VN",
        en: "Viet Nam",
        nl: "Vietnam"
      },
      {
        code: "YE",
        en: "Yemen",
        nl: "Jemen"
      },
      {
        code: "ZM",
        en: "Zambia",
        nl: "Zambia"
      },
      {
        code: "ZW",
        en: "Zimbabwe",
        nl: "Zimbabwe"
      }
    ]
  }
}
