package main

import "fmt"

// F prints are used for reading data streams
// S prints are used to create new strings

// Verbs for printf
// %v => default
// %t => "true" or "false"
// %c => Character
// %X => Hex
// %U => Unicode format
// %e => Scientifi Notation

// Escape Sequences
// \\ => Backslash
// \' => Single Quote
// \" => Double Quote
// \n => Newline
// \u or \U => Unicode (2 and 4 bytes)
// \x => Raw Bytes (as hex digits)

func surround(msg string, left, rigth rune) string {
	return fmt.Sprintf("%c%v%c", left, msg, rigth)
}

func main() {
	surrounded := surround("this message", '(', ')')
	fmt.Println(surrounded)
}
