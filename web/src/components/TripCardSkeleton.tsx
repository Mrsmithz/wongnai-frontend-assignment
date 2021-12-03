import React from 'react'
import {Box, SimpleGrid, Flex, Skeleton, Stack} from '@chakra-ui/react'


export const TripCardSkeleton: React.FC = () => {
    return (
        <Box >
            <SimpleGrid columns={[1, 2]} spacingX={5}>
                <Box>
                    <Skeleton height='100%'
                        borderRadius='20'/>
                </Box>
                <Flex justifyContent='space-between' flex='1' flexDirection='column'>
                    <SimpleGrid columns={1}>
                        <Stack>
                            <Skeleton height={10}/>
                            <Skeleton height={10}/>
                            <Skeleton height={10}/>
                        </Stack>
                    </SimpleGrid>
                    <SimpleGrid columns={3} spacingX={[3, 5, 8]} paddingTop={[3, 5]}>
                        <Skeleton height={20} borderRadius='20'/>
                        <Skeleton height={20} borderRadius='20'/>
                        <Skeleton height={20} borderRadius='20'/>
                    </SimpleGrid>
                </Flex>
            </SimpleGrid>
        </Box>
    )
}