import { Div, Text, Icon } from 'atomize'
import React from 'react'

const Header = () => {
    return (
        <Div bg="primary" d="flex" align="center" justify="center">
            <Text tag="h1" textSize="display1" textColor="texts">
                Picture Wall...
            </Text>
            <Icon name="Camera" color="texts" size="36px" m={{ l: "14px" }} />
        </Div>
    )
}

export default Header