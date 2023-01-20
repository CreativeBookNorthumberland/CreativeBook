from google.cloud import datastore

# Instantiate client
client = datastore.Client()

def approve_portfolio(request):
    
    # set CORS headers for the preflight request
    if request.method == 'OPTIONS':

        # allows GET requests from any origin with the Content-Type
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # retrieve request body
    request_json = request.get_json()

    # check password
    if request_json['password'] != 'password123':
      return ({'res': False}, 200, headers)

    # update portfolio
    portfolio = request_json['portfolio']
    portfolio['Approved'] = True
    datastore_portfolio = datastore.Entity(key=client.key("Portfolio", portfolio['CompanyName']))
    datastore_portfolio.update(portfolio)
    client.put(datastore_portfolio)

    # return 200 code
    return ({'res': True}, 200, headers)

