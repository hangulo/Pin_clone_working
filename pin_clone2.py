from flask import Flask,render_template, request
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Text, Integer, Column
from search import initiateSearch, getSearchResults, getFields
from flask.ext.triangle import Triangle
import json

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
    return app.send_static_file("search.html")\

@app.route('/search2')
@app.route('/search2/<default>')
def search2b(default=''):
    ## Begin the Search Query
    subdomain="sample.loggly.com"
    searchFrom="-10m"
    searchTo="now"
    query="*"
    size="3"
    user="hector"
    password="hector"

    rsid= initiateSearch(subdomain,searchFrom,searchTo,query,size,user,password)
    results_JSON= getSearchResults(rsid, subdomain, user,password)
    facets_JSON= getFields(subdomain,searchFrom,searchTo,query, user, password)

    events_JSON = results_JSON["events"]
    events_TXT= json.dumps(events_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    facets_TXT= json.dumps(facets_JSON, sort_keys=True,indent=4, separators=(',', ': '))
    events_num =  str(results_JSON["total_events"])
    sample_JSON = json.loads("{\"a\":7,\"abra\":\"hello\",\"cadabra\":28}")
    sample_TXT = json.dumps(sample_JSON, sort_keys=True,indent=4, separators=(',', ': '))


    return render_template('search_template.html',sub=subdomain,query=query,size=size,searchFrom=searchFrom,
                             to=searchTo, results_JSON=results_JSON, facets_JSON=facets_JSON,
                           events_TXT=events_TXT,facets_TXT=facets_TXT,events_num=events_num,
                           events_JSON=events_JSON, default=default, sample_JSON=sample_JSON,
                           sample_TXT=sample_TXT)

app.debug = True

if __name__ == '__main__':
    app.run()
