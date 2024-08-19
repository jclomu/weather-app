import { ChangeEvent, useState, FormEvent, Dispatch, SetStateAction } from "react";
import { countries } from "../../data/countries";
import style from './Form.module.css'
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";


type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
    setNotFound: Dispatch<SetStateAction<boolean>>
}

export default function Form({ fetchWeather, setNotFound }: FormProps, ) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }

        setAlert('')
        setNotFound(false)
        fetchWeather(search)
    }

    return (
        <form
            className={style.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>Todos los campos son obligatorios</Alert>}
            <div className={style.field}>
                <label htmlFor="city">City:</label>
                <input
                    id='city'
                    type="text"
                    name='city'
                    placeholder='City'
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={style.field}>
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    value={search.country}
                    name='country'
                    onChange={handleChange}
                >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>

            <input className={style.submit} type="submit" value='how is it?' />
        </form >
    )
}
