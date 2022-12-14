import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import classNames from 'classnames';
import {activeFilterChanged, fetchFilters, selectAll} from "./filterSlice";
import Spinner from "../spinner/Spinner";
import store from "../../store";

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const {filterLoadingStatus, activeFilter} = useSelector(state => state.filters)
    const filters = selectAll(store.getState())
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    if (filterLoadingStatus === 'loading'){
        return <Spinner />
    }else if(filterLoadingStatus === 'error'){
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterMap = (arr) => {
        if (arr.length === 0){
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
            >{label}</button>
        })
    }
    const element = filterMap(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {element}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;