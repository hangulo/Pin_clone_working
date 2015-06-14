from flask import Flask,render_template, request
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Text, Integer, Column
from search import initiateSearch, getSearchResults
from flask.ext.triangle import Triangle

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
    return app.send_static_file("search.html")

@app.route('/search2')
def search2():
    ## Begin the Search Query
    subdomain="sample.loggly.com"
    searchFrom="-10m"
    searchTo="now"
    query="*"
    size="1"
    user="hector"
    password="hector"
    rsid= initiateSearch(subdomain,searchFrom,searchTo,query,size,user,password)
    results_JSON= getSearchResults(rsid, subdomain, user,password)
    return render_template('search_template.html',a=1, b=results_JSON)

app.debug = True

if __name__ == '__main__':
    app.run()
