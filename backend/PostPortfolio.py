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
    portfolio['Approved'] = False
    portfolio['WorkSampleNames'] = []
    portfolio['WorkSampleLinks'] = []

    # retrieve files from request
    request_files = request.files.to_dict()


    # check if company name already exists
    query = client.query(kind="Portfolio")
    query.add_filter('CompanyName', '=', portfolio['CompanyName'])
    if len(list(query.fetch())) >= 1:
        return ("Company name is already in use", 500, headers)


    # retrieve storage bucket
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('creativebook-portfolio-files')

    # retrieve name of existing files
    blobs = storage_client.list_blobs('creativebook-portfolio-files')
    blob_names = [blob.name for blob in blobs]


    # process each file
    for request_file_key in request_files:

        # construct name of file to insert
        file = request_files[request_file_key]
        file_prefix = file.filename.split('.')[0] + '_' + portfolio['CompanyName']
        file_extension = file.filename.split('.')[1]
        file_name = file_prefix + '.' + file_extension

        # check if file name is taken and rename if it is
        taken = True
        while taken:
            if file_name in blob_names:
                file_prefix += '1'
                file_name = file_prefix + '.' + file_extension
            else:
                taken = False

        # upload file to file storage
        blob = bucket.blob(file_name)
        blob.upload_from_file(file)

        # add reference to files in portfolio
        if request_file_key == 'logo':
            portfolio['LogoUrl'] = 'https://storage.googleapis.com/creativebook-portfolio-files/' + file_name
        else:
            portfolio['WorkSampleNames'].append(request_file_key)
            portfolio['WorkSampleLinks'].append('https://storage.googleapis.com/creativebook-portfolio-files/' + file_name)
        

    # insert new Portfolio
    datastore_portfolio = datastore.Entity(key=client.key("Portfolio", portfolio['CompanyName']))
    datastore_portfolio.update(portfolio)
    client.put(datastore_portfolio)
    
    
    # return 200 code
    return ({'res': True}, 200, headers)
