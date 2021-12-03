export const SEARCH = 'SEARCH'

export const searchActions = (keyword: string) => {
    return {type: SEARCH, keyword}
}