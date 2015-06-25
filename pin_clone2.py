from flask import Flask,render_template, request
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Text, Integer, Column
from search import initiateSearch, getSearchResults, getFields
from flask.ext.triangle import Triangle
import json, sys

app = Flask(__name__, static_url_path='')
Triangle(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pin.db'
db = SQLAlchemy(app)


class Pin(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(Text, unique=False)
    image = Column(Text, unique=False)


db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Pin, methods=['GET', 'POST', 'DELETE', 'PUT'])


@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/search')
def search():
    return app.send_static_file("search_angular.html")\

@app.route('/firebase')
def firebase():
    return app.send_static_file("firebase.html")\

@app.route('/search2')
@app.route('/search2/<default>')
def search2b(default=''):
    ## Begin the Search Query
    subdomain="sample.loggly.com"
    searchFrom="-10m"
    searchTo="now"
    query="*"
    size="2"
    user="hector"
    password="hector"

    rsid= initiateSearch(subdomain,searchFrom,searchTo,query,size,user,password)
    results_JSON= getSearchResults(rsid, subdomain, user,password)
    facets_JSON= getFields(subdomain,searchFrom,searchTo,query, user, password)

    events_TXT= json.dumps(results_JSON["events"], sort_keys=True,indent=4, separators=(',', ': '))
    facets_num = len(facets_JSON['fields'])
    events_num =  str(results_JSON["total_events"])
    events_MB = sys.getsizeof(events_TXT)/1024


    return render_template('dashboard.html',sub=subdomain,query=query,size=size,searchFrom=searchFrom,
                             to=searchTo, results_JSON=results_JSON, facets_JSON=facets_JSON,
                           events_TXT=events_TXT,events_num=events_num,
                           default=default,facets_num=facets_num, events_MB=events_MB)\

@app.route('/search3')
@app.route('/search3/<default>')
def search3(default=''):
    ## Begin the Search Query
    subdomain="sample.loggly.com"
    searchFrom="-10m"
    searchTo="now"
    query="*"
    size="2"
    user="hector"
    password="hector"

    rsid= initiateSearch(subdomain,searchFrom,searchTo,query,size,user,password)
    results_JSON= getSearchResults(rsid, subdomain, user,password)
    facets_JSON= getFields(subdomain,searchFrom,searchTo,query, user, password)

    events_JSON = results_JSON["events"]
    events_TXT= json.dumps(events_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    facets_TXT= json.dumps(facets_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    results_TXT= json.dumps(results_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    facets_num = len(facets_JSON['fields'])
    events_num =  str(results_JSON["total_events"])
    sample_JSON = json.loads("{\"a\":7,\"abra\":\"hello\",\"cadabra\":28}")
    sample_TXT = json.dumps(sample_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    events_MB = sys.getsizeof(events_TXT)/1024

    print sys.getsizeof(events_TXT)



    return render_template('events_full.html',sub=subdomain,query=query,size=size,searchFrom=searchFrom,
                             to=searchTo, results_JSON=results_JSON, facets_JSON=facets_JSON,
                           events_TXT=events_TXT,facets_TXT=facets_TXT,events_num=events_num,
                           events_JSON=events_JSON, default=default, sample_JSON=sample_JSON,
                           sample_TXT=sample_TXT, facets_num=facets_num, events_MB=events_MB)

app.debug = True

if __name__ == '__main__':
    app.run()
