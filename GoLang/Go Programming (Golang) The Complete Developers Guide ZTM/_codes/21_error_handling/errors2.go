package main

import (
	"errors"
	"fmt"
)

type Error interface {
	Error() string
}

type DivError struct {
	a, b int
}

type UserError struct {
	Msg string
}

func (u *UserError) Error() string {
	return fmt.Sprintf("User Error: %v", string(u.Msg))
}

func (d *DivError) Error() string {
	return fmt.Sprintf("Cannot divide by zero: %d / %d", d.a, d.b)
}

func div(a, b int) (int, error) {
	if b == 0 {
		return 0, &DivError{a, b}
	} else {
		return a / b, nil
	}
}

func main() {
	answer1, err := div(9, 0)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("The answer is: ", answer1)
	}

	if err != nil {
		var InputErrors = UserError{"Input Error"}
		// Is returns whether error is same as given type or not
		if errors.Is(err, &InputErrors) {
			fmt.Println("Input Error", err)
		} else {
			fmt.Println("Other Error", err)
		}
	}

	if err != nil {
		var thisError *UserError
		// As convert the error to what you want If this is able to convert then it will enter if else enter else
		if errors.As(err, &thisError) {
			fmt.Println("User Error", thisError)
		} else {
			fmt.Println("Other Error", err)
		}
	}
}
