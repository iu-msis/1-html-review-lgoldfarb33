const Books = {
    data() {
      return {
          books: [],
          bookForm: {},
          selectedBook: null
        
        }
    },
    computed: {},
    methods: {
        fetchBookData() {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postNewBook(evt) {  
            fetch('api/book/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
                this.fetchBookData();
              });
        }

    },
    created() {
        return this.fetchBookData();
     
    }
}
  
Vue.createApp(Books).mount('#bookApp');