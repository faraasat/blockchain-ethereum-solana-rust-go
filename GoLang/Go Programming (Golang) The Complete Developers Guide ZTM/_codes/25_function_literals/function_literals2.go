package main

import (
	"fmt"
	"strings"
)

// as a function parameters
func customMessage(fn func(m string), msg string) {
	msg = strings.ToUpper(msg)
	fn(msg)
}

func surround() func(msg string) {
	return func(msg string) {
		fmt.Printf("%.*s\n", len(msg), "-------------")
		fmt.Println(msg)
		fmt.Printf("%.*s\n", len(msg), "-------------")
	}
}

func main() {
	customMessage(surround(), "hello")
}
