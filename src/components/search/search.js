import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geo_url, geo_options } from "../../api";

const Search = ({ onSearchChange }) => {
  
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${geo_url}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geo_options);
            const result = await response.json();
            return {
                options: result.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        } catch (error) {
            console.error(error);
        }

    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={500}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;