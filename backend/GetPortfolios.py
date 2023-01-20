from google.cloud import datastore

# Instantiate client
client = datastore.Client()

def get_portfolios(request):

    # retrieve request body
    request_json = request.get_json()

    ## Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        ## Allows GET requests from any origin with the Content-Type
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    ## Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    
    # retrieve Portfolios
    query = client.query(kind="Portfolio")

    # filter by approved depending on if is admin request
    if request_json['is_admin'] == True:
        if request_json['password'] == 'password123':
            query.add_filter('Approved', '=', False)
        else:
            return ({'res': False}, 200, headers)
    else:
        query.add_filter('Approved', '=', True)

    # return list
    return ({'res': list(query.fetch())}, 200, headers)
