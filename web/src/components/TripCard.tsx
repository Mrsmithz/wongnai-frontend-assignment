import React, {useState, useEffect} from 'react'
import {Text, Box, Image, SimpleGrid, Flex, Heading, Link} from '@chakra-ui/react'
import {Trip} from '../model/Trip'
import { v4 as uuidv4} from 'uuid'
import { useDispatch } from 'react-redux'
import { searchActions } from '../redux/actions/searchActions'
interface ITripCard{
    trip:Trip
}

export const TripCard: React.FC<ITripCard> = (props) => {
    const [image, setImage] = useState('')
    const actionsDispatch = useDispatch()
    // on tag click dispatch action to redux
    const setSearchByTag = (tag: string) => {
        actionsDispatch(searchActions(tag))
    }
    useEffect(() => {
        setImage(props.trip.photos[0])
    }, [])
    return(
        <Box>
            <SimpleGrid columns={[1, 2]} spacingX={5}>
                <Box>
                    <Image
                        src={image}
                        height='100%'
                        borderRadius='20'
                        />
                </Box>
                <Flex justifyContent='space-between' flex='1' flexDirection='column'>
                    <SimpleGrid columns={1}>
                        <Box paddingTop={[3, 0]}>
                            <Link href={props.trip.url} isExternal>
                                <Heading as='h2' fontSize={['lg', 'xl', '2xl', '4xl']} noOfLines={2}>{props.trip.title}</Heading>
                            </Link>
                        </Box>
                        <Box>
                            <Text fontSize={['xs', 'md', 'lg', 'xl']} noOfLines={3}>{props.trip.description}</Text>
                            <Link href={props.trip.url} isExternal color='blue' fontSize={['xs', 'md', 'lg', 'xl']}>อ่านต่อ</Link>
                        </Box>
                        <Flex flexDirection='row' flexWrap='wrap'>
                            <Text fontSize={['xs', 'sm', 'md', 'lg']} marginRight={3}>หมวด</Text>
                            {props.trip.tags.map((tag, index) => {
                                if (index === props.trip.tags.length - 1){
                                    return (
                                        <React.Fragment key={uuidv4()}>
                                            <Text fontSize={['xs', 'sm', 'md', 'lg']} paddingX={1}>และ</Text>
                                            <Link fontSize={['xs', 'sm', 'md', 'lg']} paddingX={1}>
                                                <Text as='u' onClick={() => setSearchByTag(tag)}>{tag}</Text>
                                            </Link>
                                        </React.Fragment>
                                    )
                                }
                                return(
                                    <Link fontSize={['xs', 'sm', 'md', 'lg']} paddingX={1} key={uuidv4()}>
                                        <Text as='u' onClick={() => setSearchByTag(tag)}>{tag}</Text>
                                    </Link>
                                )
                            })}
                        </Flex>
                    </SimpleGrid>
                    <SimpleGrid columns={3} spacingX={[3, 5, 8]} paddingTop={[3, 2]}>
                        {props.trip.photos.map(photo => {
                            if (photo === image) return
                            return (
                                <Image
                                    key={uuidv4()}
                                    src={photo}
                                    height='100%'
                                    borderRadius='20'
                                />
                            )
                        })}
                    </SimpleGrid>
                </Flex>
            </SimpleGrid>
        </Box>
    )
}