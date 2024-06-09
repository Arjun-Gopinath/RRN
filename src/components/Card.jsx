import { Div, Image, Tag } from 'atomize'
import React, { useEffect, useState } from 'react'

const Card = (props) => {
    const { photo } = props
    const [tags, setTags] = useState([]);
    useEffect(() => {
        setTags(photo.tags.split(','));
    }, []);
    return (
        <Div bg="secondary" align="left" border="3px solid" borderColor="primary" m="5px">
            <Image h={photo.previewHeight + "px"}
                w={photo.previewWidth + "px"} src={photo.previewURL} />
            <Div p="2px" d="flex" flexWrap="wrap" bg="secondary" h={"auto"} w={photo.previewWidth + "px"}>
                {tags.length > 0 && tags.map((tag) => <Tag key={tag} m={"3px"}>{tag}</Tag>)}
            </Div>
        </Div >
    )
}

export default Card