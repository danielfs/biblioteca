import json
import bottle
from bottle import route, run, request, response
from pymongo import Connection
from bson.objectid import ObjectId
from bson.json_util import dumps

connection = Connection( 'localhost', 27017 )
db = connection.biblioteca

# http://paulscott.co.za/blog/cors-in-python-bottle-framework/
# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, DELETE'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
 
        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)
 
    return _enable_cors

@route( '/livros', method = [ 'OPTIONS', 'POST' ] )
@enable_cors
def salvar():
    dados_requisicao = request.body.readline()
    livro = json.loads( dados_requisicao )
    
    if livro.has_key( '_id' ):
        livro[ '_id' ] = ObjectId( livro[ '_id' ] )
    
    db[ 'livros' ].save( livro )
    
    return 0

@route( '/livros/:id', method = [ 'OPTIONS', 'DELETE' ] )
@enable_cors
def excluir( id ):
    id = ObjectId( id )
    db[ 'livros' ].remove({ '_id': id })
    
    return 0

def buscar_livro( id ):
    id = ObjectId( id )
    entity = db[ 'livros' ].find_one( { '_id': id } )
    
    return entity

@route( '/livros', method = 'GET' )
@enable_cors
def listar():
    livros = db[ 'livros' ].find()
    
    resultado = []
    
    for l in livros:
        resultado.append( { '_id': str( l[ '_id' ] ), 'titulo': l[ 'titulo' ], 'autor': l[ 'autor' ] } )
    
    response.content_type = 'application/json'
    return dumps( resultado )

@route( '/', method = 'GET' )
def saudacao():
    return 'Funcionou?'

run( host = 'localhost', port = 8080 )