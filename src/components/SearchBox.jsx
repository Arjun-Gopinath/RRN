import React, { useState } from 'react';
import { Input, Button, Icon, Div } from 'atomize';

const SearchBox = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <Div d="flex" bg="secondary" align="center" p={{ x: "1rem", y: "0.5rem" }} rounded={{ br: "lg", bl: "lg" }}>
            <Input
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                w="100%"
                m={{ r: "0.5rem" }}
            />
            <Button
                onClick={handleSearch}
                bg="primary"
                hoverBg="black"
                rounded="md"
                p={{ r: "1rem", l: "0.5rem" }}
                suffix={<Icon name="Search" size="20px" color="white" m={{ l: "0.5rem" }} />}
            >
                Search
            </Button>
        </Div>
    );
};

export default SearchBox;