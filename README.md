# password-generator

A web application that generates a password, given specific instructions from the user, such as the inclusion of uppercase, numbers and special characters.

The user also has control over the password length and "complexity".

Complexity is determined as follows:
- Simple: 70% chance of lowercase letters, 30% chance of other characters*
- Balanced: Equal chance of lowercase letters and other characters*
- Complex: 30% chance of lowercase letters, 70% chance of other characters*

* Other characters (uppercase, numbers, special characters) have an equal chance of being chosen, with respect to each other.
