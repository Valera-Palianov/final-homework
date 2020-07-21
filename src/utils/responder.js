import axios from "axios"

async function responder(lists) {
    const server = 'http://192.168.99.100:5555'
    const path = "/apiV1"
    const listPath = {
        books: "/book",
        authors: "/author",
        members: "/user"
    }

    const requests = []
    for(let key of lists) {
        if(listPath[key]) {
            const url = server+path+listPath[key]
            requests.push({
                key: key,
                url: url,
                request: axios.get(url)
            })
        } else {
            return {
                error: "What?",
                description: "Responder does not know such a request"
            }
        }
    }

    const result = {
        error: false,
        data: {}
    }

    for(let request of requests) {

        let response
        try {
            response = await request.request
        } catch (e) {
            response = e.response
        }

        let status
        try {
            status = response.status
        } catch (e) {
            status = 0
        }

        if(status === 200) {
            if(request.key === 'members') {
                result.data[request.key] = response.data.rows
            } else {
                result.data[request.key] = response.data
            }
            continue
        }

        if(status === 404) {
            return {
                error: "Incorrect URL",
                description: `Data not found at ${request.url}`
            }
        }

        if(isNaN(status)) {
            return {
                error: `The server said ${status}`,
                description: `We don't know what to do about it`
            }
        }

        return {
            error: "Network error",
            description: `${server} not responding`
        }
    }

    return result
}


export default responder