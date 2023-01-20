import axios from 'axios'

const baseUrl = 'https://europe-west2-blackbook-370420.cloudfunctions.net/'

function get(endpoint) {
    return axios.get(baseUrl + endpoint)
}

function post(endpoint, data) {
    return axios.post(baseUrl + endpoint, data)
}

export default {
    
    getAllPortfolios: (is_admin=false, password='') => {return post('GetPortfolios', {'is_admin': is_admin, 'password': password})},
    postPortfolio: (portfolio) => {return post('PostPortfolio', portfolio, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    approvePortfolio: (portfolio, password) => {return post('ApprovePortfolio', {'portfolio': portfolio, 'password': password})}

}