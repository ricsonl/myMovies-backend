## MyMovies Backend

### Tecnologias utilizadas  
* TypeScript  
* NodeJS + Express  
* Knex  
    * Sqlite3 em ambiente de desenvolvimento  
    * PostgreSQL em ambiente de produção
* JWT

#### Para executar:
1. `npm install` para instalar as dependências
2. `npm run knex:mig:rb` para deletar o banco (caso esteja criado)
3. `npm run knex:mig` para criar o banco
4. `npm run dev` para iniciar o servidor
5.  utilizar um _REST API Client_ para testar as requisições  
  * **Cadastro de conta na plataforma:** _POST_ `localhost:3100/accounts`  
    * _BODY EXAMPLE_:
    ```
    {  
      "email": "test@gmail.com",
      "password": "123",
      "mainProfileName": "Test01", 
      "birthday": "2000-02-04"
    }
    ```
      
    * _RESPONSE EXAMPLE_ (code 201):
    ```
    {  
      "id": 2,  
      "email": "test@gmail.com"  
    }
    ```
  
  * **Login:** _POST_ `localhost:3100/login`
     * _BODY EXAMPLE_:
     ```
      {  
        "email": "test@gmail.com",
        "password": "123"   
      }
     ```

      * _RESPONSE EXAMPLE_ (code 200):
      ```
      {
        "id": 2, 
        "email": "test@gmail.com"  
      }
      ```

  * **Listar perfis de uma conta:** _GET_ `localhost:3100/profiles`
       * _HEADERS EXAMPLE_:  
       `logged_acc: 1`  (id da conta logada)

      * _RESPONSE EXAMPLE_ (code 200):
      ```
      [
         { 
          "id": 5,  
          "name": "Test01",  
          "main": 1,
          "birthday": "1999-05-06" 
         }, 
         {  
          "id": 23,  
          "name": "Test02",  
          "main": 0,
          "birthday": null 
         }
      ]
       ```
 * **Criar perfil em uma conta:** _POST_ `localhost:3100/profiles`
    * _HEADERS EXAMPLE_:  
       `logged_acc: 1`  (id da conta logada)  
       
    * _BODY EXAMPLE_:
    ```
       {  
         "name": "Test03" 
       }
    ```
      
    * _RESPONSE EXAMPLE_ (code 201):
    ```
       {  
         "id": 30, 
         "name": "Test03",  
         "main": false  
       }
    ```
     
* **Deletar perfil de uma conta:** _DELETE_ `localhost:3100/profiles/:targetId`
    * _HEADERS EXAMPLE_:  
       `logged_acc: 1`  (id da conta logada)  
      
    * _RESPONSE EXAMPLE_ (code 200):  
    ` `  
    
* **Exibir watchlist de um perfil:** _GET_ `localhost:3100/watchlist` 
    * _HEADERS EXAMPLE_:  
       `logged_prof: 23`  (id do perfil)

    * _RESPONSE EXAMPLE_ (code 200):
   ```
      [
         {  
          "id": 2,  
          "TMDB_id": 500,  
          "name": "Toy Story 2", 
          "synopsis": "Woody tenta salvar um brinquedo que acaba indo parar em um bazar de usados, mas termina por ser sequestrado por um colecionador que pretende vendê-lo a um museu japonês. Na casa do sequestrador, Woody descobre que, no passado, foi protagonista de um famoso seriado de TV e por isso é um brinquedo muito valioso. Ele conhece os demais integrantes de sua coleção e, enquanto isso, os demais brinquedos, liderados por Buzz Lightyear, partem em uma atrapalhada operação de resgate.", 
          "watched": 0  
         }, 
         {  
          "id": 40,  
          "TMDB_id": 102,  
          "name": "Toy Story", 
          "synopsis": "O aniversário do garoto Andy está chegando e seus brinquedos ficam nervosos, temendo que ele ganhe novos brinquedos que possam substituí-los. Liderados pelo caubói Woody, o brinquedo predileto de Andy, eles recebem Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Com ciúmes, Woody tenta ensiná-lo uma lição, mas Buzz cai pela janela. É o início da aventura do caubói, que precisa resgatar Buzz para limpar sua barra com os outros brinquedos.",  
          "watched": 1  
         }
      ]
   ```
       
 * **Adicionar filme à watchlist de um perfil:** _POST_ `localhost:3100/watchlist`  
    * _HEADERS EXAMPLE_:  
       `logged_prof: 150`  (id do perfil)  
       
    * _BODY EXAMPLE_:
    ```
      {  
         "TMDB_id": "505",  
      }  
    ```
    * _RESPONSE EXAMPLE_ (code 201):
    ```
      { 
         "id": 602,  
         "TMDB_id": "505", 
         "watched": false
      }
    ```
     
* **Remover filme da watchlist de um perfil:** _DELETE_ `localhost:3100/watchlist/:targetId`  
    * _HEADERS EXAMPLE_:  
       `logged_prof: 1`  (id do perfil)  
      
    * _RESPONSE EXAMPLE_ (code 200):  
    ` `  
    
