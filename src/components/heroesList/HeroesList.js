import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from "reselect";

const HeroesList = () => {
    
    const filteredHeroesSelctor = createSelector(
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
    // const filteredHeroes = useSelector(state => {
    //     if (state.activeFilter === 'all'){
    //         return state.heroes
    //     }else {
    //         return state.heroes.filter(item => item.element === state.activeFilter)
    //     }
    // })
    const filteredHeroes = useSelector(filteredHeroesSelctor)
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const deleteHerro = useCallback((id) => {
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => dispatch(heroDeleted(id)))
            .catch(error => console.log(error))
    }, [request])

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

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