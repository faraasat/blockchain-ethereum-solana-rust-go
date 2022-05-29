package display

import "fmt"

func Display(msg string) {
	// capital letter in function means it is going to be exported with small will be not available outside
	fmt.Println(msg)
}
