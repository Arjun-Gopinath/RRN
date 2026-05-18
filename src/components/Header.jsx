import { Div, Text, Icon } from 'atomize'
import React from 'react'

const Header = () => {
    return (
        <Div bg="primary" d="flex" align="center" justify="center" p={{ y: "0.5rem" }}>
            <Text tag="h1" textSize={{ xs: "title", sm: "heading", md: "display1" }} textColor="texts" m="0">
                Picture Wall...
            </Text>
            <Icon name="Camera" color="texts" size="28px" m={{ l: "10px" }} />
        </Div>
    )
}

export default Header
