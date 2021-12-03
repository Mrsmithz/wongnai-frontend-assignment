import React, {useState, useEffect} from 'react'
import {Box, Input, Text} from '@chakra-ui/react'
import {Header} from '../components/Header'
import { TripCard } from '../components/TripCard'
import { TripCardSkeleton } from '../components/TripCardSkeleton'
import axios from 'axios'
import useSWR from 'swr'
import { Trip } from '../model/Trip'
import { useSelector, useDispatch} from 'react-redux'
import { searchActions } from '../redux/actions/searchActions'
const useTrips = (keyword?: string) => {
    // SWR for caching and revalidate data
    const axiosFetcher = (url:string, keyword: string) => {
        if (keyword !== '' && keyword !== null){
            return axios.get(`${url}?keyword=${keyword}`).then(result => result.data)
        }
        else{
            return axios.get(url).then(result => result.data)
        }
    }
    const {data, error} = useSWR([`http://localhost:8081/api/v1/trips`, keyword], axiosFetcher)
    return {
        data,
        isLoading: !error && !data,
        error
    }
}
const loadingSkeleton = () => {
    // if data is loading we render skeleton first
    return (
        <React.Fragment>
            <Box padding={5} >
            <TripCardSkeleton/>
        </Box>
        <Box padding={5} >
            <TripCardSkeleton/>
        </Box>
        </React.Fragment>
    )
}
interface RootState {
    searchReducers: any
}

export const MainLayout: React.FC = () => {
    const [keyword, setKeyword] = useState('')
    const search = useSelector((state: RootState) => state.searchReducers.search)
    const {data, isLoading, error} = useTrips(search)
    const actionDispatch = useDispatch()
    useEffect(() => {
        const url = new URL(window.location.href)

        // if not query params set it first
        if (!url.search.includes('keyword')){
            url.searchParams.append('keyword', search)
        }
        else{
            url.searchParams.set('keyword', search)
        }
        // push url with query to history
        if (search !== '' && search !== null){
            window.history.pushState('', '', url.toString())
        }

        // check if search is in initialstate and clear query params
        if (search == '' && search !== null){
            url.search = ''
            window.history.pushState('', '', url.toString())
        }
    }, [search])


    useEffect(() => {

        // on first render check if we have keyword query
        const url = new URL(window.location.href)
        const search = url.search.match(/(?<=\?keyword=).+/)
        if (search?.[0] != null){
            actionDispatch(searchActions(search[0]))
        }
    }, [])
    return (
        <Box alignContent='center' justifyItems='center' paddingX={['5%', '10%', '15%', '20%']} paddingY={['5%']}>
            <Header title="เที่ยวไหนดี" color="#577BC1" textAlign="center"/>
            <Box paddingX={['5%', '10%', '15%', '20%']} marginBottom={[1, 3, 5]}>
                <Input marginTop={[3, 5, 10]} variant='flushed' borderBottomWidth={1.5} placeholder='หาที่เที่ยวแล้วไปกัน...'
                textAlign='center' fontSize={['sm', 'md', 'lg', '2xl']}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => {
                    // on key enter we dispatch action to redux store
                    if (e.code === 'Enter' || e.code === 'NumpadEnter'){
                        actionDispatch(searchActions(keyword))
                    }
                }}/>
            </Box>
            {isLoading && loadingSkeleton()}
            {data && data.map((trip:Trip) => {
                return (
                    <Box padding={5} key={trip.eid}>
                        <TripCard trip={trip}/>
                    </Box>
                )
            })}
            {error && (
                <Box>
                    <Text fontSize={['lg', 'xl', '2xl', '4xl']} textAlign='center'>ไม่พบข้อมูลที่คุณค้นหา โปรดลองใหม่อีกครั้ง</Text>
                </Box>
            )}
        </Box>
    )
}