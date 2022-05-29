package main

func main() {
	userName := "farasat"
	usingDebitCard, usingCreditCard := false, true

	if userName != "farasat" {
		println("User is not farasat")
	} else if userName == "farasat" {
		println("User is farasat")
	}

	if usingDebitCard && usingCreditCard {
	}

	if temperature("freezer") > 0 {
	}

	// Segment Initialization (Creating an using var in function at same time)
	if i := 5; i < 10 {
	}

	// Early Return (Saves time)
	token, err := getSession("alice")
	if err != "" {
		return
	}

	println(token)
}

func getSession(name string) (uint, string) {
	if name == "alice" {
		return 15, ""
	} else {
		return 0, "Error"
	}
}

func temperature(val string) int {
	if val == "freezer" {
		return 5
	} else if val == "heater" {
		return 45
	} else {
		return -10
	}
}
