import requests, json

def initiateSearch(accountFqdn,searchFrom,searchTo,query,size,user, password):

    search_url = ("https://" + accountFqdn + "/apiv2/search?q=" + query + "&from=" +
                  str(searchFrom) + "&until=" + str(searchTo) + "&order=asc&size="+str(size))

    print "Search URL: " + search_url

    r = requests.get(search_url, auth=(str(user), str(password)))

    try:
        rsid = r.json()['rsid']['id']
        #print "rsid: " + str(rsid)

    except ValueError:
        print("Error obtaining data")
        return -1

    return rsid

def getSearchResults(rsid, accountFqdn,user, password):
    #search_url = ("https://" + accountFqdn + "/apiv2/events?columns=syslog.priority&format=json&rsid="+ rsid)
    search_url = ("https://" + accountFqdn + "/apiv2/events?rsid="+ rsid)
    r = requests.get(search_url, auth=(str(user), str(password)))

    print "#######  " + search_url
    #print r.json()
    return r.json()
    #return json.dumps(r.json(), sort_keys=True,indent=4, separators=(',', ': '))

def getFields(accountFqdn, searchFrom, searchTo, query,user,password):
    search_url = ("https://" + accountFqdn + "/apiv2/fields?q=" + query + "&from=" +
                  str(searchFrom) + "&until=" + str(searchTo) + "&facet_size=2000")

    r = requests.get(search_url, auth=(str(user), str(password)))
    return r.json()

#print "RSID is: "+ initiateSearch()
print "### search.py executed #####"
#getSearchResults(initiateSearch())