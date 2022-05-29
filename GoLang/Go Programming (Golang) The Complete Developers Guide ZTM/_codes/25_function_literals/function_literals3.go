package main

import (
	"fmt"
)

func calculatePrice(subTotal float64, discountFn func(subTotal float64) float64) float64 {
	return subTotal - (subTotal * discountFn(subTotal))
}

// Type Aliasing
type DiscountFunc func(subTotal float64) float64

func calculatePrice2(subTotal float64, discountFn DiscountFunc) float64 {
	return subTotal - (subTotal * discountFn(subTotal))
}

func main() {
	// Closures
	// We are using outside variable when we use it inside function we get copy of that variable
	discount := 0.1
	discountFn := func(subTotal float64) float64 {
		if subTotal > 100.0 {
			discount += 0.1
		}
		if subTotal > 0.3 {
			discount += 0.3
		}
		return discount
	}
	totalPrice := calculatePrice(20.0, discountFn)
	fmt.Println(totalPrice)
}
