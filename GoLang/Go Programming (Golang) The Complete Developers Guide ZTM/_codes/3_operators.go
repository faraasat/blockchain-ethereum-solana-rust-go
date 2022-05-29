package main

func main() {
	// Arithmetic Operators (always return a number)
	var total = 3 + 3
	total += 3
	total = total + 1
	total++
	total--

	// Relational Operator (always return a bool)
	a := 5
	b := 6

	// Logic Operators (always return a bool)
	authZ := false
	authN := true

	println(total, a < b, a == b, authN && authZ, !authZ)
}
