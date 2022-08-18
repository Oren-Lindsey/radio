<script>
    export let data
    export let errors
    let countries = data.countries
    import {onMount} from 'svelte'
    onMount(async () => {
        await createMap()
        document.getElementById('loader').classList.add('hidden')
        document.getElementById('map').classList.remove('hidden')
    })
    async function createMap() {
        if (data.selected !== 'All' && data.stations.length > 0) {
            var map = L.map('map').setView([data.stations[0].geo_lat, data.stations[0].geo_long], 4);
            L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                maxZoom: 20,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            }).addTo(map);
            for (var i = 0; i < data.stations.length; i++) {
                if (data.stations[i].lastcheckok == 1 && data.stations[i].ssl_error == 0 && data.stations[i].url_resolved != '') {
                    let marker = L.marker([data.stations[i].geo_lat, data.stations[i].geo_long])
                    marker.addTo(map)
                    if (![null,undefined,''].includes(data.stations[i].favicon)) {
                        marker.bindPopup(`<img class="grid place-items-center h-[20px] m-1" src="${data.stations[i].favicon}" alt="logo" onerror="this.parentElement.removeChild(this)" /><b>${data.stations[i].name}</b><br><a href="${data.stations[i].homepage}">Homepage</a><audio src="${data.stations[i].url_resolved}" autoplay>Feed</audio>`)
                    } else {
                        marker.bindPopup(`<b>${data.stations[i].name}</b><br><a href="${data.stations[i].homepage}">Homepage</a><audio src="${data.stations[i].url_resolved}" autoplay>Feed</audio>`)
                    }
                }
            }
        } else {
            var map = L.map('map').setView([0,0], 2);
            L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                maxZoom: 20,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            }).addTo(map);
            for (var i = 0; i < data.stations.length; i++) {
                if (data.stations[i].lastcheckok == 1 && data.stations[i].ssl_error == 0 && data.stations[i].url_resolved != '') {
                    let marker = L.marker([data.stations[i].geo_lat, data.stations[i].geo_long])
                    marker.addTo(map)
                    if (![null,undefined,''].includes(data.stations[i].favicon)) {
                        marker.bindPopup(`<img class="grid place-items-center h-[20px] m-1" src="${data.stations[i].favicon}" alt="logo" onerror="this.parentElement.removeChild(this)" /><b>${data.stations[i].name}</b><br><a href="${data.stations[i].homepage}">Homepage</a><audio src="${data.stations[i].url_resolved}" autoplay>Feed</audio>`)
                    } else {
                        marker.bindPopup(`<b>${data.stations[i].name}</b><br><a href="${data.stations[i].homepage}">Homepage</a><audio src="${data.stations[i].url_resolved}" autoplay>Feed</audio>`)
                    }
                }
            }
        }
    }
    function getExists(country) {
        if (['All',null,undefined,''].includes(country)) {
            return true
        } else {
            var exists = data.stations.filter(function (o) {
                return o.country === country
            }).length > 0;
            return exists;
        }
    }
</script>
<nav class="h-[8vh] absolute bottom-0 grid w-screen place-items-center z-[100] bg-gray-500 overflow-x-hidden">
    <form>
    <h1 class="text-white grid place-items-center mb-[-1px]">Country:</h1>
    <select name="country" class="bg-gray-600 text-white">
        {#each countries as country}
            {#if data.selected == country}
                <option value={country} selected>{country}</option>
            {:else}
                {#if ['All',null,undefined,''].includes(data.selected)}
                    {#if getExists(country)}
                        <option value={country}>{country}</option>
                    {:else}
                        <option value={country} disabled>{country}</option>
                    {/if}
                {:else}
                    <option value={country}>{country}</option>
                {/if}
            {/if}
        {/each}
    </select>
    <button type="submit" class="m-1 bg-gray-700 hover:bg-gray-400 text-white p-[0.3rem] rounded-full transition ease-in-out">Go</button>
    </form>
</nav>
{#if true !== [null,undefined,''].includes(errors)}
<p>{errors}</p>
{/if}
<div class="!overflow-y-hidden !overflow-x-hidden h-screen w-screen grid place-items-center bg-gray-800">
<b id="loader" class="text-white">Loading...</b>
</div>
<div class="h-[92vh] w-screen z-50 absolute top-0" id="map"></div>