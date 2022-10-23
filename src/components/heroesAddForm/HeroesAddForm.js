import { heroCreated} from "../heroesList/heroesSlice";
import {useHttp} from '../../hooks/http.hook';
import {useDispatch, useSelector} from "react-redux";
import {fetchFilters, selectAll} from "../heroesFilters/filterSlice";
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useState} from "react";
import store from "../../store";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescribe, setHeroDescribe] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();
    const filters = selectAll(store.getState())
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])
    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const newHero = {
          id: uuidv4(),
          name: heroName,
          describe: heroDescribe,
          element: heroElement
        }

        request('http://localhost:3001/heroes', "POST", JSON.stringify(newHero))
            .then(() => dispatch(heroCreated(newHero)))
            .catch((err) => console.log(err))

        setHeroName('')
        setHeroDescribe('')
        setHeroElement('')
    }
    
    
    

    const options = renderFilters(filters, filtersLoadingStatus)
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    value={heroName}
                    type="text" 
                    name="name"
                    onChange={(e) => setHeroName(e.target.value)}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={heroDescribe}
                    onChange={(e) => setHeroDescribe(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    name="element">
                    <option value="">Я владею элементом...</option>
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;