import React from 'react'
import {Heading, ResponsiveValue} from '@chakra-ui/react'
interface IHeader{
    title:string,
    color:string,
    size?:string,
    textAlign?:ResponsiveValue<CanvasTextAlign>
}
export const Header: React.FC<IHeader> = (props) => {
    return (
        <Heading
        color={props.color}
        fontSize={['xl', '4xl', '6xl', '8xl']}
        textAlign={props.textAlign}
        >{props.title}</Heading>
    )
}