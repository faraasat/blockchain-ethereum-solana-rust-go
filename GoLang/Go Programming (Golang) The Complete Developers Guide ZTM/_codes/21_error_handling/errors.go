package main

import "errors"

// Go has no exceptions so no try catch
// Errors are returned as the last return value from a function and it encodes failures as a part of the function signature

func divide(lhs, rhs int) (int, error) {
	if rhs == 0 {
		return 0, errors.New("cannot divide by zero")
	} else {
		return rhs / lhs, nil
	}
}
