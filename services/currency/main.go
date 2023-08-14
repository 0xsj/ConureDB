package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	// Create a new router instance
	r := mux.NewRouter()

	// Define a route handler for the root path ("/")
	r.HandleFunc("/currency", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "currency service!")
	})

	// Specify the port to listen on
	port := "8080"

	// Start the HTTP server
	fmt.Printf("Server is listening on port %s...\n", port)
	http.ListenAndServe(":"+port, r)
}
