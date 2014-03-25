function BibliotecaController( $scope, $window, $http ) {
    var inicializar = function() {
        $scope.livro = { titulo: '', autor: '' };
//        $scope.livros = [
//            { _id: '1', titulo: 'Memórias de um sargento de milícias', autor: 'Manuel Antônio de Almeida' },
//            { _id: '2', titulo: 'Iracema', autor: 'José de Alencar' },
//            { _id: '3', titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
//            { _id: '4', titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis' }
//        ];

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