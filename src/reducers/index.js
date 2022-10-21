import heroesListItem from "../components/heroesListItem/HeroesListItem";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case "HERO_DELETED":
            const newHeroList = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList,
                heroesLoadingStatus: 'idle'
            }
        case "HERO_CREATED":
            let newHero = [...state.heroes, ...action.payload]
            return {
                ...state,
                newHero
            }
        default: return state
    }
}

export default reducer;