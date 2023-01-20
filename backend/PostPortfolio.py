import json
from google.cloud import datastore
from google.cloud import storage

# Instantiate client
client = datastore.Client()

def post_portfolio(request):

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

    # retrieve portfolio form from request
    request_form = request.form.to_dict()
    portfolio_string = request_form['portfolio']
    portfolio = json.loads(portfolio_string)
    print(portfolio)

    # retrieve logo from request and generate file name
    request_files = request.files.to_dict()
    logo_file = request_files['logo.png']
    logo_file_extension = logo_file.name.split('.')[1]
    logo_file_prefix = 'logo' + portfolio['CompanyName']
    logo_file_name = logo_file_prefix + '.' + logo_file_extension

    # retrieve storage bucket
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('creative-portfolio-files')

    # check if file name is taken and rename if it is
    taken = True
    blobs = storage_client.list_blobs('creative-portfolio-files')
    blob_names = [blob.name for blob in blobs]
    while taken:
        if logo_file_name in blob_names:
            logo_file_prefix += '1'
            logo_file_name = logo_file_prefix + '.' + logo_file_extension
        else:
            taken = False

    # upload file to storage
    blob = bucket.blob(logo_file_name)
    blob.upload_from_file(logo_file)


    # update portfolio data
    portfolio['Approved'] = False
    portfolio['LogoUrl'] = 'https://storage.googleapis.com/creative-portfolio-files/' + logo_file_name

    # insert new Portfolio
    datastore_portfolio = datastore.Entity(key=client.key("Portfolio", portfolio['CompanyName']))
    datastore_portfolio.update(portfolio)
    client.put(datastore_portfolio)
    
    # return 200 code
    return ({'res': True}, 200, headers)
