import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroDeleted, fetchHeroes} from "./heroesSlice";
import { createSelector } from "reselect";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();
    
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all'){
                return heroes

            }else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);


    const deleteHerro = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => dispatch(heroDeleted(id)))
            .catch(error => console.log(error))
    }, [request])

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} deleteHerro={() => deleteHerro(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;