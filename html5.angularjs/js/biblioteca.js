function BibliotecaController( $scope, $http ) {
    var inicializar = function() {
        $scope.livro = { titulo: '', autor: '' };

        var url = getUrl( '/livros' );
        
        $http.get( url ).success(function( data ) {
            $scope.livros = data;
        });
        
    };
    
    inicializar();
    
    $scope.salvar = function() {
        var url = getUrl( '/livros' );
        
        $http.post( url, $scope.livro ).success( function( data ) {
            inicializar();
        });
    };
    
    $scope.editar = function( livro ) {
        $scope.livro = livro;
    };
    
    $scope.excluir = function( livro ) {
        var url = getUrl( '/livros/' + livro._id );
        
        $http.delete( url ).success( function( data ){
            inicializar();
        });
    };
}

function getUrl( nome ) {
    var endereco = 'http://localhost:8080';
    
    return endereco + nome;
}