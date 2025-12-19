import { useQuery } from '@tanstack/vue-query'

const PAGE_SIZE = 80 as const
const CAPITAL_CITIES = [
  'Tirana',
  'Andorra la Vella',
  'Yerevan',
  'Vienna',
  'Baku',
  'Minsk',
  'Brussels',
  'Sarajevo',
  'Sofia',
  'Zagreb',
  'Nicosia',
  'Prague',
  'Copenhagen',
  'Tallinn',
  'Helsinki',
  'Paris',
  'Tbilisi',
  'Berlin',
  'Athens',
  'Budapest',
  'Reykjavík',
  'Dublin',
  'Rome',
  'Pristina',
  'Riga',
  'Vaduz',
  'Vilnius',
  'Luxembourg',
  'Valletta',
  'Chișinău',
  'Monaco',
  'Podgorica',
  'Amsterdam',
  'Skopje',
  'Oslo',
  'Warsaw',
  'Lisbon',
  'Bucharest',
  'Moscow',
  'San Marino',
  'Belgrade',
  'Bratislava',
  'Ljubljana',
  'Madrid',
  'Stockholm',
  'Bern',
  'Ankara',
  'Kyiv',
  'London',
  'Vatican City',
] as const

const { VITE_PEXELS_API_URL: apiUrl, VITE_PEXELS_API_KEY: apiKey } = import.meta.env

export const usePexelsQuery = () => {
  const city = CAPITAL_CITIES[Math.floor(Math.random() * CAPITAL_CITIES.length)]
  const index = Math.floor(Math.random() * PAGE_SIZE)
  const orientation = screen.orientation.type.split('-')[0]
  return useQuery({
    queryKey: ['search', city, orientation],
    queryFn: async () => {
      const res = await fetch(
        `${apiUrl}/search?query=${city}&per_page=${PAGE_SIZE}&size=small&orientation=${orientation}`,
        {
          headers: { Authorization: apiKey },
        },
      )
      return res.json()
    },
    select: (data: any) => {
      return data?.photos?.length ? data.photos[index].src.original : undefined
    },
  })
}
