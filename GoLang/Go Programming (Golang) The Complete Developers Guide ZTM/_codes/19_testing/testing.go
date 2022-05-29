package main

import (
	"regexp"
)

// Go makes no distinction between integration and unit testing and same method is used for both
// Unit test - test individual functions
// Integration testing - test modules or functions working together
// test share the same name as the file being tested. e.g. imp.go imp_test.go

func IsEmailValid(addr string) bool {
	re, ok := regexp.Compile(`.+@.+\..+`)
	if ok != nil {
		panic("failed to compile regex")
	} else {
		return re.Match([]byte(addr))
	}
}
