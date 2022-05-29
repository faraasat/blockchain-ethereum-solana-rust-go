package main

import (
	"testing"
)

// Fail() - Marks the test as failed
// Errorf(string) - Fail and add a message
// FailNow() - Marks the test as failed, abort current test
// FatalIf(string) - Fail, abort, and add a message
// Logf() = Equivalent to printf, but only when test fails

// for testing we use keyword Test and then the name of function testing
func TestIsEmailValid(t *testing.T) {
	data := "email@example.com"
	if !IsEmailValid(data) {
		t.Errorf("IsEmailValid(%v)=false, want true", data)
	}
}

func TestIsEmailValidTable(t *testing.T) {
	table := []struct {
		email string
		want  bool
	}{
		{"email@example.com", true},
		{"missing@tld", false},
	}
	for _, data := range table {
		result := IsEmailValid(data.email)
		if result != data.want {
			t.Errorf("%v: %t, want: %t", data.email, result, data.want)
		}
	}
}
