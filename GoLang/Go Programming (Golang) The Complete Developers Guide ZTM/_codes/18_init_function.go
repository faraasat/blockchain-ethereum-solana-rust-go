package main

import (
	"fmt"
	"regexp"
)

var EmailExpr *regexp.Regexp

// init function runs before main
// allows creation and validation of program state before execution begins
// check network connection, database connection, cache expensive operations, etc
func init() {
	compiled, ok := regexp.Compile(`.+@.+\..+`) // Compiling regex is an expensive operation so we do it in init
	if ok != nil {
		panic("failed to compile regex")
	}
	EmailExpr = compiled
	fmt.Println("Regular expression compiled successfully")
}

func isEmailValid(addr string) bool {
	return EmailExpr.Match([]byte(addr))
}

func main() {
	fmt.Println(isEmailValid("invalid"))
	fmt.Println(isEmailValid("valid@example.com"))
	fmt.Println(isEmailValid("invalid@example"))
}
