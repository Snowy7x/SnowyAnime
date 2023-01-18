import axios from "axios";
const PageLimit = 24
const baseUrl = "http://31.187.75.164:3069/ar/v2/"

async function getLatest(page = 1) {
    return await axios({
        method: "GET",
        url: baseUrl + "latest",
        params: {
            _limit: PageLimit,
            _offset: PageLimit * (page - 1)
        }
    }).then(res => {
        return res.data.data
    }).catch(err => {
        return []
    })
}

async function getAnime(id = 0) {
    return await axios({
        method: "GET",
        url: baseUrl + "anime",
        params: {
            animeId: id
        }
    }).then(res => {
        return res.data.data
    }).catch(err => {
        return null
    })
}

async function getSearchResults(json = {}, page){
    json = {
        _limit: PageLimit + 1,
        _offset: PageLimit * (page - 1),
        ...json
    }
    return await axios({
        method: "GET",
        url: baseUrl + "search",
        params: {
            ...json
        }
    }).then(res => {
        return res.data.data
    }).catch(err => {
        return null
    })
}

async function getEpisodeLinks(animeId, episodeId) {
    return await axios({
        method: "POST",
        url: baseUrl + "episode",
        params: {
            animeId,
            episodeId
        }
    }).then(re => re.data)
        .catch(err => [])
}

async function getEpisodes(animeId) {
    return await axios({
        method: "POST",
        url: baseUrl + "episodes",
        params: {
            animeId
        }
    }).then(re => re.data)
        .catch(err => [])
}

async function getSchedule() {
    return await axios({
        method: "POST",
        url: baseUrl + "schedule",
    }).then(re => re.data)
        .catch(err => [])
}

export {getLatest, getAnime, getSearchResults, getEpisodeLinks, getEpisodes, getSchedule, PageLimit}