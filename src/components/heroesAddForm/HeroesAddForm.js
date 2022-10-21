
import {heroCreated} from "../../actions";
import {useHttp} from '../../hooks/http.hook';
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {useState} from "react";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescribe, setHeroDescribe] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const {filters} = useSelector(state => state)

    const filterOptions = (arr) => {
        if (arr.length === 0){
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        const arrayWithoutAll = arr.filter(item => item.name !== 'all')
        return arrayWithoutAll.map(({name, label}) => {
            return <option
                key={name}
                value={name}
            >{label}</option>
        })
    }
    const onSubmit = (e) => {


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
    
    
    
    const dispatch = useDispatch();
    const {request} = useHttp();
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
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;