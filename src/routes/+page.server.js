import * as RadioBrowser from 'radio-browser'
import * as worldcountries from 'world-countries'
import { error } from '@sveltejs/kit';
export async function load(req) {
    console.log(RadioBrowser.default)
    let countries = getCountries()
    countries.unshift('All')
    let country = req.url.searchParams.get('country')
    let filter
    if (![null,undefined,'All'].includes(country)) {
        filter = {
            limit: 1000000000000,
            by: 'countryexact',
            searchterm: country
        }
    } else {
        filter = {
            limit: 1000000000000
        }
    }
    const data = await RadioBrowser.getStations(filter)
    let stations = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].geo_lat && data[i].geo_long && ![null,undefined,''].includes(data[i].url_resolved)) {
            stations.push(data[i])
        }
    }
    if (stations.length < 1) throw error(404, 'No stations found')
    return {
        stations: stations,
        countries: countries,
        selected: country,
    }
}
function getCountries() {
    let names = []
    for (let i = 0; i < worldcountries.length; i++) {
        names.push(worldcountries[i].name.common)
    }
    return names
}