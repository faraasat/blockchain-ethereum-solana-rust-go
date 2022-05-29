package main

func main() {
	x := 3
	switch x {
	case 1:
		println("1")
	case 2:
		println("2")
	case 3:
		println("3")
	case 4:
		println("4")
	default:
		println("not matching!!")
	}

	// Case List
	switch x {
	case 1, 2, 3, 4, 5:
		println("less than 5")
	case 6, 7, 8:
		println("greater than 5 less than 9")
	default:
		println("not matching!!")
	}

	// fallthrough (it will avoid the default behavior and also execute the next case without checking even it has found the result)
	letter := 'i'
	switch letter {
	case ' ':
	case 'a', 'e', 'i', 'o', 'u':
		println("A vowel")
		fallthrough
	case 'A', 'E', 'I', 'O', 'U':
		println("vowels are great")
	default:
		println("something else")
	}

	// we can use comparison in cases
	switch age := 18; {
	case age == 0:
		println("New Born")
	case age >= 1 && age < 18:
		println("Non Voter")
	case age >= 18:
		println("Voter")
	default:
		println("Invalid Age")
	}
}
